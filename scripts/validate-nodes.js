#!/usr/bin/env node

/**
 * Node Validation Script for GIS Knowledge Map
 *
 * This script validates all YAML node files against the schema
 * and reports any errors or inconsistencies.
 *
 * Usage:
 *   npm run validate
 *   npm run validate -- --verbose
 *   npm run validate -- --fix
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import schemas
const schemasPath = path.join(__dirname, '../src/lib/schemas.ts')
const schemasContent = fs.readFileSync(schemasPath, 'utf8')

// Configuration
const NODES_DIR = path.join(__dirname, '../content/gis/nodes')
const VALID_TYPES = [
  'core-concepts',
  'spatial-reference-systems',
  'data-models',
  'data-formats',
  'processing-tools',
  'analysis-libraries',
  'gis-servers-services',
  'tile-delivery-systems',
  'web-mapping-libraries',
  'desktop-gis-applications',
  'spatial-databases',
  'cloud-gis-platforms',
  'remote-sensing',
]

const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced']
const VALID_IMPORTANCES = ['nice-to-know', 'useful', 'important', 'critical']
const VALID_RESOURCE_TYPES = ['reference', 'tutorial', 'documentation', 'video', 'tool']

const TYPE_PARENT_MAP = {
  'core-concepts': 'core-concepts-group',
  'spatial-reference-systems': 'spatial-reference-systems-group',
  'data-models': 'data-models-group',
  'data-formats': 'data-formats-group',
  'processing-tools': 'processing-tools-group',
  'analysis-libraries': 'analysis-libraries-group',
  'gis-servers-services': 'gis-servers-services-group',
  'tile-delivery-systems': 'tile-delivery-systems-group',
  'web-mapping-libraries': 'web-mapping-libraries-group',
  'desktop-gis-applications': 'desktop-gis-applications-group',
  'spatial-databases': 'spatial-databases-group',
  'cloud-gis-platforms': 'cloud-gis-platforms-group',
  'remote-sensing': 'remote-sensing-group',
}

// Parse command line arguments
const args = process.argv.slice(2)
const verbose = args.includes('--verbose') || args.includes('-v')
const fixMode = args.includes('--fix')

// Statistics
const stats = {
  total: 0,
  valid: 0,
  invalid: 0,
  warnings: 0,
  groups: 0,
  content: 0,
}

const errors = []
const warnings = []
const allNodeIds = new Set()

// Helper functions
function error(file, message, field = null) {
  errors.push({ file, message, field })
  stats.invalid++
}

function warn(file, message, field = null) {
  warnings.push({ file, message, field })
  stats.warnings++
}

function success(file) {
  stats.valid++
  if (verbose) {
    console.log(chalk.green('✓'), chalk.gray(file))
  }
}

function validateRequiredFields(data, filename) {
  const required = ['id', 'title', 'type', 'summary']
  const missing = required.filter(field => !data[field])

  if (missing.length > 0) {
    error(filename, `Missing required fields: ${missing.join(', ')}`, missing[0])
    return false
  }
  return true
}

function validateType(data, filename) {
  if (!VALID_TYPES.includes(data.type)) {
    error(filename, `Invalid type: "${data.type}". Must be one of: ${VALID_TYPES.join(', ')}`, 'type')
    return false
  }
  return true
}

function validateParentNode(data, filename) {
  if (data.parentNode && !data.isGroup) {
    const expectedParent = TYPE_PARENT_MAP[data.type]
    if (data.parentNode !== expectedParent) {
      warn(filename, `parentNode "${data.parentNode}" doesn't match expected "${expectedParent}" for type "${data.type}"`, 'parentNode')
    }
  }
  return true
}

function validateDifficulty(data, filename) {
  if (data.difficulty && !VALID_DIFFICULTIES.includes(data.difficulty)) {
    error(filename, `Invalid difficulty: "${data.difficulty}". Must be one of: ${VALID_DIFFICULTIES.join(', ')}`, 'difficulty')
    return false
  }
  return true
}

function validateImportance(data, filename) {
  if (data.importance && !VALID_IMPORTANCES.includes(data.importance)) {
    error(filename, `Invalid importance: "${data.importance}". Must be one of: ${VALID_IMPORTANCES.join(', ')}`, 'importance')
    return false
  }
  return true
}

function validateStyle(data, filename) {
  // Check if icon/color are at top level (common mistake)
  if (data.icon || data.color) {
    error(filename, 'icon/color should be inside style object, not at top level', 'style')
    return false
  }

  if (data.style) {
    if (typeof data.style !== 'object') {
      error(filename, 'style must be an object', 'style')
      return false
    }

    if (data.style.color && !/^#[0-9A-Fa-f]{6}$/.test(data.style.color)) {
      warn(filename, `Invalid hex color: "${data.style.color}". Should be format #RRGGBB`, 'style.color')
    }
  }
  return true
}

function validateResources(data, filename) {
  if (data.resources) {
    // Check if resources is an object instead of array (common mistake)
    if (!Array.isArray(data.resources)) {
      error(filename, 'resources must be an array, not an object', 'resources')
      return false
    }

    data.resources.forEach((resource, index) => {
      if (!resource.title || !resource.url || !resource.type) {
        error(filename, `Resource[${index}] missing required fields (title, url, type)`, `resources[${index}]`)
        return false
      }

      if (!VALID_RESOURCE_TYPES.includes(resource.type)) {
        error(filename, `Resource[${index}] has invalid type: "${resource.type}". Must be one of: ${VALID_RESOURCE_TYPES.join(', ')}`, `resources[${index}].type`)
        return false
      }

      // Basic URL validation
      try {
        new URL(resource.url)
      } catch (e) {
        warn(filename, `Resource[${index}] has invalid URL: "${resource.url}"`, `resources[${index}].url`)
      }
    })
  }
  return true
}

function validateRelationships(data, filename) {
  if (data.relationships) {
    // Check if relationships is an array instead of object (common mistake)
    if (Array.isArray(data.relationships)) {
      error(filename, 'relationships must be an object with arrays, not an array of objects', 'relationships')
      return false
    }

    const validRelTypes = ['prerequisites', 'related', 'enables', 'partOf', 'usedBy', 'basedOn', 'comparedWith']

    Object.keys(data.relationships).forEach(relType => {
      if (!validRelTypes.includes(relType)) {
        warn(filename, `Unknown relationship type: "${relType}"`, `relationships.${relType}`)
      }

      const rels = data.relationships[relType]
      if (!Array.isArray(rels)) {
        error(filename, `relationships.${relType} must be an array`, `relationships.${relType}`)
      }
    })
  }
  return true
}

function validateSummary(data, filename) {
  if (data.summary) {
    if (data.summary.length > 200) {
      warn(filename, `Summary is too long (${data.summary.length} chars). Keep it under 200 characters.`, 'summary')
    }

    if (data.summary.includes('\n')) {
      warn(filename, 'Summary should be a single line, not multi-line', 'summary')
    }
  }
  return true
}

function validateAliases(data, filename) {
  if (data.aliases !== undefined && !Array.isArray(data.aliases)) {
    error(filename, 'aliases must be an array', 'aliases')
    return false
  }
  return true
}

// Main validation function
function validateNode(filename) {
  const filepath = path.join(NODES_DIR, filename)
  const content = fs.readFileSync(filepath, 'utf8')

  let data
  try {
    data = yaml.load(content)
  } catch (e) {
    error(filename, `YAML parse error: ${e.message}`)
    return false
  }

  stats.total++

  // Track node IDs
  if (data.id) {
    allNodeIds.add(data.id)
  }

  // Track groups vs content nodes
  if (data.isGroup) {
    stats.groups++
  } else {
    stats.content++
  }

  // Run all validations
  let isValid = true
  isValid = validateRequiredFields(data, filename) && isValid
  isValid = validateType(data, filename) && isValid
  isValid = validateParentNode(data, filename) && isValid
  isValid = validateDifficulty(data, filename) && isValid
  isValid = validateImportance(data, filename) && isValid
  isValid = validateStyle(data, filename) && isValid
  isValid = validateResources(data, filename) && isValid
  isValid = validateRelationships(data, filename) && isValid
  isValid = validateSummary(data, filename) && isValid
  isValid = validateAliases(data, filename) && isValid

  if (isValid && errors.filter(e => e.file === filename).length === 0) {
    success(filename)
  }

  return data
}

// Validate relationship references
function validateRelationshipReferences() {
  console.log(chalk.blue('\n📊 Validating relationship references...\n'))

  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith('.yaml'))

  files.forEach(filename => {
    const filepath = path.join(NODES_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const data = yaml.load(content)

    if (data.relationships) {
      Object.entries(data.relationships).forEach(([relType, nodeIds]) => {
        if (Array.isArray(nodeIds)) {
          nodeIds.forEach(nodeId => {
            if (!allNodeIds.has(nodeId)) {
              warn(filename, `References non-existent node "${nodeId}" in ${relType}`, `relationships.${relType}`)
            }
          })
        }
      })
    }
  })
}

// Print results
function printResults() {
  console.log(chalk.blue('\n' + '='.repeat(60)))
  console.log(chalk.blue('  VALIDATION RESULTS'))
  console.log(chalk.blue('='.repeat(60) + '\n'))

  // Statistics
  console.log(chalk.bold('📊 Statistics:'))
  console.log(chalk.gray(`   Total files:     ${stats.total}`))
  console.log(chalk.gray(`   Group nodes:     ${stats.groups}`))
  console.log(chalk.gray(`   Content nodes:   ${stats.content}`))
  console.log(chalk.green(`   ✓ Valid:         ${stats.valid}`))
  console.log(chalk.red(`   ✗ Invalid:       ${stats.invalid}`))
  console.log(chalk.yellow(`   ⚠ Warnings:      ${stats.warnings}`))

  // Errors
  if (errors.length > 0) {
    console.log(chalk.red('\n❌ ERRORS:'))
    errors.forEach(({ file, message, field }) => {
      console.log(chalk.red(`   ${file}`))
      console.log(chalk.gray(`      ${message}`))
      if (field) {
        console.log(chalk.gray(`      Field: ${field}`))
      }
    })
  }

  // Warnings
  if (warnings.length > 0 && verbose) {
    console.log(chalk.yellow('\n⚠️  WARNINGS:'))
    warnings.forEach(({ file, message, field }) => {
      console.log(chalk.yellow(`   ${file}`))
      console.log(chalk.gray(`      ${message}`))
      if (field) {
        console.log(chalk.gray(`      Field: ${field}`))
      }
    })
  }

  // Summary
  console.log(chalk.blue('\n' + '='.repeat(60)))
  if (errors.length === 0) {
    console.log(chalk.green.bold('✅ ALL NODES VALID!'))
    if (warnings.length > 0) {
      console.log(chalk.yellow(`   (${warnings.length} warnings - run with --verbose to see them)`))
    }
  } else {
    console.log(chalk.red.bold(`❌ VALIDATION FAILED: ${errors.length} errors`))
    if (warnings.length > 0) {
      console.log(chalk.yellow(`   (${warnings.length} warnings)`))
    }
  }
  console.log(chalk.blue('='.repeat(60) + '\n'))
}

// Print node count by category
function printCategoryStats() {
  console.log(chalk.blue('\n📁 Nodes by Category:\n'))

  const categoryCounts = {}
  VALID_TYPES.forEach(type => {
    categoryCounts[type] = 0
  })

  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith('.yaml'))

  files.forEach(filename => {
    const filepath = path.join(NODES_DIR, filename)
    const content = fs.readFileSync(filepath, 'utf8')
    const data = yaml.load(content)

    if (data.type && !data.isGroup) {
      categoryCounts[data.type] = (categoryCounts[data.type] || 0) + 1
    }
  })

  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      const icon = count > 0 ? chalk.green('✓') : chalk.red('✗')
      const countStr = count.toString().padStart(2, ' ')
      console.log(`   ${icon} ${chalk.gray(type.padEnd(30, ' '))} ${chalk.bold(countStr)} nodes`)
    })
}

// Main execution
async function main() {
  console.log(chalk.blue.bold('\n🔍 GIS Knowledge Map - Node Validation\n'))

  if (fixMode) {
    console.log(chalk.yellow('⚠️  Fix mode is not yet implemented\n'))
  }

  // Get all YAML files
  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith('.yaml'))

  console.log(chalk.blue(`📂 Found ${files.length} YAML files in ${NODES_DIR}\n`))

  if (verbose) {
    console.log(chalk.blue('Validating nodes...\n'))
  }

  // Validate each file
  files.forEach(validateNode)

  // Validate relationship references
  validateRelationshipReferences()

  // Print category statistics
  printCategoryStats()

  // Print results
  printResults()

  // Exit with appropriate code
  process.exit(errors.length > 0 ? 1 : 0)
}

main()
