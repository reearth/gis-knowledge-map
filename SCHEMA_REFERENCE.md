# Schema Reference - GIS Knowledge Map

This document provides the technical schema definition for node YAML files in the GIS Knowledge Map.

## Schema Definition

The node schema is defined using [Zod](https://zod.dev/) in `/src/lib/schemas.ts`. All nodes must conform to this schema to be loaded.

## TypeScript Type

```typescript
interface Node {
  // Identity
  id: string
  title: string
  aliases?: string[]

  // Classification
  type: NodeType
  parentNode?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  importance?: 'nice-to-know' | 'useful' | 'important' | 'critical'

  // Content
  summary: string
  description?: string

  // Visual
  style?: {
    color?: string
    icon?: string
  }

  // Graph
  relationships?: {
    prerequisites?: string[]
    related?: string[]
    enables?: string[]
    partOf?: string[]
    usedBy?: string[]
    basedOn?: string[]
    comparedWith?: string[]
  }

  // Metadata
  tags?: string[]
  keywords?: string[]
  roleRelevance?: Record<string, number>
  resources?: Resource[]
  contributors?: string[]
  lastUpdated?: string
}

interface Resource {
  title: string
  url: string  // must be valid URL
  type: 'reference' | 'tutorial' | 'documentation' | 'video' | 'tool'
}

type NodeType =
  | 'core-concepts'
  | 'spatial-reference-systems'
  | 'data-models'
  | 'data-formats'
  | 'processing-tools'
  | 'analysis-libraries'
  | 'gis-servers-services'
  | 'tile-delivery-systems'
  | 'web-mapping-libraries'
  | 'desktop-gis-applications'
  | 'spatial-databases'
  | 'cloud-gis-platforms'
  | 'remote-sensing'
```

## Field Specifications

### Required Fields

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `id` | string | Unique identifier | kebab-case, no spaces |
| `title` | string | Display name | Max 100 chars recommended |
| `type` | enum | Node category | Must be one of 13 types |
| `summary` | string | Brief description | 1 sentence, ~150 chars |

### Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `aliases` | string[] | `[]` | Alternative names |
| `parentNode` | string | - | Group this belongs to |
| `difficulty` | enum | - | Learning difficulty |
| `importance` | enum | - | Relative importance |
| `description` | string | - | Detailed explanation |
| `style` | object | - | Visual styling |
| `relationships` | object | `{}` | Graph connections |
| `tags` | string[] | `[]` | Keyword tags |
| `keywords` | string[] | `[]` | Search terms |
| `roleRelevance` | object | `{}` | Role scores (0-1) |
| `resources` | Resource[] | `[]` | External links |
| `contributors` | string[] | `[]` | Contributor names |
| `lastUpdated` | string | - | ISO date (YYYY-MM-DD) |

## Enum Values

### type (NodeType)

Must be exactly one of these 13 values:

```yaml
type: core-concepts                  # Fundamental GIS concepts
type: spatial-reference-systems      # CRS, projections, datums
type: data-models                    # Geometry types, data structures
type: data-formats                   # File formats (GeoJSON, Shapefile, etc.)
type: processing-tools               # CLI tools (GDAL, OGR, etc.)
type: analysis-libraries             # Code libraries (Turf, Shapely, etc.)
type: gis-servers-services           # Servers and OGC services
type: tile-delivery-systems          # Tiling and CDN
type: web-mapping-libraries          # JavaScript mapping libs
type: desktop-gis-applications       # Desktop software (QGIS, ArcGIS Pro)
type: spatial-databases              # Database extensions (PostGIS, etc.)
type: cloud-gis-platforms            # SaaS platforms (Felt, Carto, etc.)
type: remote-sensing                 # Imagery and analysis
```

### difficulty

```yaml
difficulty: beginner        # Entry-level, no prerequisites
difficulty: intermediate    # Some GIS knowledge required
difficulty: advanced        # Expert-level, complex concepts
```

### importance

```yaml
importance: nice-to-know    # Optional, specialized knowledge
importance: useful          # Helpful but not essential
importance: important       # Valuable for most users
importance: critical        # Fundamental, must-know
```

### Resource type

```yaml
type: reference         # API docs, specifications, standards
type: tutorial          # Step-by-step guides
type: documentation     # Official docs, manuals
type: video             # Video content
type: tool              # Interactive tools, editors
```

## Type-Parent Node Mapping

Each type has a corresponding parent node group:

| Type | Parent Node | Color Code |
|------|-------------|------------|
| `core-concepts` | `core-concepts-group` | `#64748B` |
| `spatial-reference-systems` | `spatial-reference-systems-group` | `#10B981` |
| `data-models` | `data-models-group` | `#8B5CF6` |
| `data-formats` | `data-formats-group` | `#EC4899` |
| `processing-tools` | `processing-tools-group` | `#14B8A6` |
| `analysis-libraries` | `analysis-libraries-group` | `#06B6D4` |
| `gis-servers-services` | `gis-servers-services-group` | `#F97316` |
| `tile-delivery-systems` | `tile-delivery-systems-group` | `#F59E0B` |
| `web-mapping-libraries` | `web-mapping-libraries-group` | `#FB923C` |
| `desktop-gis-applications` | `desktop-gis-applications-group` | `#3B82F6` |
| `spatial-databases` | `spatial-databases-group` | `#A855F7` |
| `cloud-gis-platforms` | `cloud-gis-platforms-group` | `#C084FC` |
| `remote-sensing` | `remote-sensing-group` | `#0EA5E9` |

## Relationships Object

The `relationships` field defines connections between nodes in the knowledge graph.

### Structure

```yaml
relationships:
  prerequisites: [string[]]    # Nodes that must be learned first
  related: [string[]]          # Similar or related concepts
  enables: [string[]]          # Nodes this unlocks/enables
  partOf: [string[]]           # Larger concepts this belongs to
  usedBy: [string[]]           # Tools/tech that use this
  basedOn: [string[]]          # Foundational technologies
  comparedWith: [string[]]     # Alternative/competing options
```

### Validation Rules

1. All relationship values must be arrays of strings
2. Each string must be a valid node ID
3. Referenced nodes must exist in the content loader
4. Empty arrays are valid: `prerequisites: []`
5. Omitting a relationship type is valid (defaults to `[]`)

### Relationship Semantics

| Type | Meaning | Example |
|------|---------|---------|
| `prerequisites` | A → B means "Learn A before B" | `wgs84` → `web-mercator` |
| `related` | Similar concepts, alternatives | `shapefile` ↔ `geojson` |
| `enables` | A enables B's functionality | `gdal` → `rasterio` |
| `partOf` | A is part of larger concept B | `point` → `vector-data` |
| `usedBy` | A is used by tool/tech B | `geojson` → `leaflet` |
| `basedOn` | A is built on top of B | `geopandas` → `shapely` |
| `comparedWith` | Alternatives to compare | `qgis` ↔ `arcgis-pro` |

## Style Object

### Structure

```yaml
style:
  color: string    # Hex color code
  icon: string     # Lucide icon name
```

### Color Format

- Must be a valid hex color: `#RRGGBB`
- Use type colors for consistency (see table above)
- Example: `#EC4899`, `#10B981`

### Icon Format

- Use [Lucide icon names](https://lucide.dev/icons/)
- **DO NOT** include "Icon" suffix
- Examples: `map`, `globe`, `file-code`, `database`

## Resources Array

### Structure

```yaml
resources:
  - title: string
    url: string       # Must be valid URL
    type: enum        # One of 5 types
```

### Validation Rules

1. **MUST** be an array, not an object
2. Each resource **MUST** have all 3 fields
3. `url` **MUST** be a valid URL (validated by Zod)
4. `type` **MUST** be one of the 5 valid enum values

### Invalid Formats

```yaml
# ❌ WRONG - Nested object structure
resources:
  documentation:
    - title: "Docs"
      url: "..."

# ❌ WRONG - Invalid type
resources:
  - title: "Article"
    url: "..."
    type: article    # Not a valid enum value!

# ✅ CORRECT
resources:
  - title: "Official Docs"
    url: "https://example.com"
    type: documentation
```

## Role Relevance

Maps user roles to relevance scores (0.0 to 1.0).

### Structure

```yaml
roleRelevance:
  role-name: 0.8    # number between 0.0 and 1.0
```

### Predefined Roles

- `gis-analyst`
- `gis-developer`
- `cartographer`
- `data-engineer`
- `remote-sensing-specialist`

### Score Guidelines

| Score | Meaning |
|-------|---------|
| 0.0 - 0.3 | Rarely used by this role |
| 0.4 - 0.6 | Occasionally useful |
| 0.7 - 0.8 | Frequently used |
| 0.9 - 1.0 | Essential for this role |

## Validation Process

Nodes are validated in `/src/lib/content-loader.ts`:

```typescript
function validateNode(data: unknown, nodeId: string) {
  try {
    const node = nodeSchema.parse(data)  // Zod validation
    return { node }
  } catch (error) {
    return { error: `Validation error in node ${nodeId}: ${error}` }
  }
}
```

### Validation Errors

Common validation errors and their causes:

| Error | Cause | Fix |
|-------|-------|-----|
| "Required field missing" | Missing required field | Add the field |
| "Invalid enum value" | Wrong type/difficulty/importance | Use valid enum value |
| "Expected array, received object" | Wrong data structure | Convert to array |
| "Invalid URL" | Malformed resource URL | Fix URL format |
| "References non-existent node" | Bad relationship ID | Remove or fix node ID |

## YAML Format Notes

### Multi-line Strings

Use `|` for multi-paragraph descriptions:

```yaml
description: |
  First paragraph with detailed explanation.

  Second paragraph with more details.
```

### Arrays

Two syntaxes are valid:

```yaml
# Inline
tags: [tag1, tag2, tag3]

# Multi-line
tags:
  - tag1
  - tag2
  - tag3
```

### Objects

```yaml
# Nested structure
style:
  color: "#FF0000"
  icon: "map"

relationships:
  related:
    - node1
    - node2
```

### Comments

```yaml
# This is a comment
id: node-id  # Inline comment
```

## Content Loader Registration

After creating a node YAML file, register it in `/src/lib/content-loader.ts`:

### 1. Add Import

```typescript
// At top of file, in appropriate section
import myNodeRaw from '../../content/gis/nodes/my-node.yaml'
```

### 2. Add to nodeFiles Array

```typescript
const nodeFiles = [
  // ... group nodes ...

  // In appropriate category section:
  { id: 'my-node', data: myNodeRaw },
]
```

### 3. Maintain Order

Keep nodes organized by category:
1. Group nodes
2. Core Concepts
3. Spatial Reference Systems
4. Data Models
5. Data Formats
6. Processing Tools
7. Analysis Libraries
8. GIS Servers & Services
9. Tile & Delivery Systems
10. Web Mapping Libraries
11. Desktop GIS Applications
12. Spatial Databases
13. Cloud GIS Platforms
14. Remote Sensing

## Testing Validation

### Command Line

Check for errors when starting dev server:

```bash
npm run dev
```

Look for "Validation error" messages in terminal or browser console.

### Browser Console

1. Open DevTools (F12 or Cmd+Option+I)
2. Check Console tab for errors
3. Look for:
   - `Validation error in node xyz`
   - `Node xyz references non-existent node`

### Manual Validation

Create a test script:

```typescript
import { nodeSchema } from './src/lib/schemas'

const testData = { /* your node data */ }

try {
  nodeSchema.parse(testData)
  console.log('✅ Valid')
} catch (error) {
  console.error('❌ Invalid:', error)
}
```

## See Also

- `/content/NODE_TEMPLATE.yaml` - Official node template
- `/CONTRIBUTING.md` - Contribution guidelines
- `/src/lib/schemas.ts` - Zod schema definitions
- [Zod Documentation](https://zod.dev/) - Schema validation library
- [Lucide Icons](https://lucide.dev/icons/) - Available icons
