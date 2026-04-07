# Validation Scripts

This directory contains scripts for validating and maintaining the GIS Knowledge Map content.

## Node Validation Script

The `validate-nodes.js` script validates all YAML node files against the schema and reports errors and warnings.

### Quick Start

```bash
# Basic validation
npm run validate

# Verbose output (shows all warnings)
npm run validate:verbose
```

### What It Checks

The validation script checks for:

#### ✅ Required Fields
- `id` - Unique identifier
- `title` - Display name
- `type` - Must be one of 13 valid types
- `summary` - Brief description

#### ✅ Field Types
- `type` - Must be valid enum value
- `difficulty` - Must be beginner/intermediate/advanced
- `importance` - Must be nice-to-know/useful/important/critical
- `aliases` - Must be an array

#### ✅ Structure
- **Style object**: `icon` and `color` must be inside `style:` object
- **Resources array**: Must be array format, not nested object
- **Relationships object**: Must be object with arrays, not array of objects

#### ✅ Resource Validation
- Each resource must have `title`, `url`, and `type`
- Resource `type` must be: reference, tutorial, documentation, video, or tool
- URLs must be valid format

#### ✅ Relationship Validation
- All referenced node IDs must exist
- Relationship types must be valid
- Values must be arrays

#### ✅ Parent Node Consistency
- `parentNode` should match the expected parent for the `type`
- Warns if mismatch detected

#### ⚠️ Warnings
- Summary length > 200 characters
- Multi-line summaries
- Invalid hex color format
- Invalid URLs
- Unknown relationship types
- References to non-existent nodes

### Output

The script provides colored, formatted output:

```
🔍 GIS Knowledge Map - Node Validation

📂 Found 104 YAML files

📁 Nodes by Category:
   ✓ core-concepts                  13 nodes
   ✓ data-formats                    9 nodes
   ...

============================================================
  VALIDATION RESULTS
============================================================

📊 Statistics:
   Total files:     104
   Group nodes:     13
   Content nodes:   91
   ✓ Valid:         104
   ✗ Invalid:       0
   ⚠ Warnings:      5

✅ ALL NODES VALID!
   (5 warnings - run with --verbose to see them)
============================================================
```

### Exit Codes

- `0` - All validations passed
- `1` - One or more validation errors

Use in CI/CD:
```bash
npm run validate || exit 1
```

### Verbose Mode

Use `--verbose` or `-v` to see all warnings and detailed validation info:

```bash
npm run validate:verbose
```

This will show:
- Each file being validated (✓ checkmark)
- All warning messages with file names
- Field names where issues were found

### Common Errors and Fixes

#### Error: "Missing required fields"
```yaml
# ❌ Missing summary
id: node-id
title: Title
type: core-concepts

# ✅ Fixed
id: node-id
title: Title
type: core-concepts
summary: Brief description.
```

#### Error: "icon/color should be inside style object"
```yaml
# ❌ Wrong
icon: "map"
color: "#FF0000"

# ✅ Correct
style:
  icon: "map"
  color: "#FF0000"
```

#### Error: "resources must be an array"
```yaml
# ❌ Wrong
resources:
  documentation:
    - title: "Docs"

# ✅ Correct
resources:
  - title: "Docs"
    url: "https://..."
    type: documentation
```

#### Error: "Invalid resource type"
```yaml
# ❌ Wrong
resources:
  - type: article  # Invalid!

# ✅ Correct
resources:
  - type: tutorial  # Valid enum value
```

#### Warning: "References non-existent node"
```yaml
# ❌ Wrong
relationships:
  related:
    - fake-node-id  # Doesn't exist

# ✅ Correct
relationships:
  related:
    - geojson  # Real node ID
```

### Integration with Development Workflow

#### Pre-commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
npm run validate
```

#### CI/CD Pipeline
Add to your CI config:
```yaml
- name: Validate nodes
  run: npm run validate
```

#### VS Code Task
Add to `.vscode/tasks.json`:
```json
{
  "label": "Validate Nodes",
  "type": "npm",
  "script": "validate",
  "problemMatcher": []
}
```

### Extending the Script

The validation script is located at `scripts/validate-nodes.js` and can be extended to add:

- Custom validation rules
- Auto-fix capabilities (planned with `--fix` flag)
- Different output formats (JSON, XML, etc.)
- Integration with other tools

### Statistics

The script provides statistics about your knowledge map:

- Total number of files
- Group nodes vs content nodes
- Valid vs invalid nodes
- Number of warnings
- Nodes per category

### Related Documentation

- `/content/NODE_TEMPLATE.yaml` - Template for creating nodes
- `/CONTRIBUTING.md` - Contribution guidelines
- `/SCHEMA_REFERENCE.md` - Schema documentation
- `/QUICK_REFERENCE.md` - Quick lookup guide

### Troubleshooting

**Script doesn't run:**
```bash
# Make sure dependencies are installed
npm install

# Verify Node.js version (16+ required)
node --version
```

**Permission denied:**
```bash
chmod +x scripts/validate-nodes.js
```

**Import errors:**
Make sure `"type": "module"` is in package.json

### Future Enhancements

Planned features:
- [ ] `--fix` mode to auto-correct common errors
- [ ] `--format json` for machine-readable output
- [ ] Duplicate ID detection
- [ ] Orphaned node detection (no relationships)
- [ ] Circular dependency detection
- [ ] Schema version validation
