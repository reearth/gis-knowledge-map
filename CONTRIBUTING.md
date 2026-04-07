# Contributing to GIS Knowledge Map

Thank you for contributing to the GIS Knowledge Map! This guide will help you create and edit nodes correctly.

## Quick Start

1. **Use the template**: Copy `/content/NODE_TEMPLATE.yaml` as your starting point
2. **Follow the schema**: All fields must match the exact structure defined
3. **Test locally**: Run `npm run dev` and check the browser console for validation errors
4. **Validate**: Ensure your node appears in the graph with no console errors

## Node Structure Overview

Every node MUST have this structure:

```yaml
id: node-id
title: Node Title
aliases: []
type: one-of-13-types
parentNode: matching-group
difficulty: beginner|intermediate|advanced
importance: nice-to-know|useful|important|critical
summary: One sentence description.
description: |
  Detailed multi-paragraph description.
style:
  color: "#HEX"
  icon: "lucide-icon-name"
relationships:
  prerequisite: [node-ids]
  related: [node-ids]
tags: [keywords]
keywords: [searchterms]
roleRelevance:
  role-name: 0.0-1.0
resources:
  - title: "Name"
    url: "https://..."
    type: reference|tutorial|documentation|video|tool
lastUpdated: "YYYY-MM-DD"
```

## Valid Type Values (13 Categories)

Your `type` field MUST be one of these exact values:

| Type | Parent Node | Color |
|------|-------------|-------|
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

## Field Requirements

### Required Fields

These fields MUST be present in every node:

- ✅ `id` - Unique identifier (kebab-case)
- ✅ `title` - Human-readable name
- ✅ `aliases` - Array (can be empty `[]`)
- ✅ `type` - One of 13 valid types
- ✅ `parentNode` - Corresponding group name
- ✅ `difficulty` - `beginner`, `intermediate`, or `advanced`
- ✅ `importance` - `nice-to-know`, `useful`, `important`, or `critical`
- ✅ `summary` - Concise one-sentence description
- ✅ `description` - Detailed explanation (can be multi-line with `|`)
- ✅ `style` - Object containing `color` and `icon`
- ✅ `lastUpdated` - ISO date format `YYYY-MM-DD`

### Optional But Recommended Fields

- `relationships` - Connections to other nodes
- `tags` - Array of keyword tags
- `keywords` - Array of search terms
- `roleRelevance` - Relevance scores for different user roles
- `resources` - External links and references

## Style Object Structure

**CRITICAL**: `icon` and `color` must be nested inside `style`:

```yaml
# ❌ WRONG - Don't do this
icon: "map"
color: "#FF0000"
style:
  something: else

# ✅ CORRECT - Do this
style:
  color: "#FF0000"
  icon: "map"
```

### Available Icons

Use [Lucide icon names](https://lucide.dev/icons/) without the `Icon` suffix:

- `map`, `globe`, `compass`, `layers`
- `file-code`, `database`, `server`, `cloud`
- `wrench`, `tool`, `settings`
- `circle`, `triangle`, `square`, `hexagon`
- etc.

## Resources Array Format

**CRITICAL**: Resources must be a flat array, not a nested object:

```yaml
# ❌ WRONG - Don't use nested structure
resources:
  documentation:
    - title: "Docs"
      url: "https://..."
  tutorials:
    - title: "Tutorial"
      url: "https://..."

# ✅ CORRECT - Use flat array
resources:
  - title: "Official Documentation"
    url: "https://example.com/docs"
    type: documentation
  - title: "Getting Started Tutorial"
    url: "https://example.com/tutorial"
    type: tutorial
```

### Valid Resource Types

The `type` field in resources MUST be one of:

- `reference` - API docs, specifications, standards
- `tutorial` - Step-by-step guides, how-tos
- `documentation` - Official documentation, manuals
- `video` - Video tutorials, lectures
- `tool` - Interactive tools, sandboxes, editors

**DO NOT USE**: "article", "guide", "example", "repository", "paper", "standard"

## Relationships Structure

Relationships connect nodes in the knowledge graph. Use these relationship types:

```yaml
relationships:
  prerequisites:           # Must learn these first
    - node-id-1
    - node-id-2
  related:                # Similar/related concepts
    - node-id-3
  enables:                # Unlocks these capabilities
    - node-id-4
  usedBy:                 # Tools that use this
    - node-id-5
  partOf:                 # Larger concept this belongs to
    - node-id-6
  basedOn:                # Foundation technologies
    - node-id-7
```

**IMPORTANT**: Only reference nodes that actually exist! Check `/content/gis/nodes/` to verify node IDs.

## Common Validation Errors

### Error: "Invalid resource type"

```yaml
# ❌ Wrong
resources:
  - title: "Article"
    url: "..."
    type: article        # Invalid!

# ✅ Correct
resources:
  - title: "Article"
    url: "..."
    type: tutorial       # Valid type
```

### Error: "Expected array, received object"

```yaml
# ❌ Wrong - resources is object
resources:
  documentation:
    - title: "Doc"

# ✅ Correct - resources is array
resources:
  - title: "Doc"
    type: documentation
```

### Error: "Missing required field: summary"

```yaml
# ❌ Wrong - no summary
title: Example
description: Details...

# ✅ Correct - has summary
title: Example
summary: Brief description.
description: Details...
```

### Error: "References non-existent node"

```yaml
# ❌ Wrong - made-up node ID
relationships:
  related:
    - fake-node-that-doesnt-exist

# ✅ Correct - real node ID
relationships:
  related:
    - geojson  # This node exists
```

## Testing Your Changes

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12 or Cmd+Option+I)

3. **Look for errors**:
   - Red errors = validation failed
   - "Validation error in node xyz" = schema problem
   - "Node xyz references non-existent node" = bad relationship

4. **Fix and reload**: Make corrections and refresh browser

## File Naming Convention

- Use kebab-case: `my-node-name.yaml`
- Match the node `id` field: if `id: web-mercator`, file should be `web-mercator.yaml`
- Place in `/content/gis/nodes/` directory

## Registering New Nodes

After creating a node YAML file, you must register it in the content loader:

1. Open `/src/lib/content-loader.ts`

2. Add import at the top:
   ```typescript
   import myNodeRaw from '../../content/gis/nodes/my-node.yaml'
   ```

3. Add to `nodeFiles` array in the correct category section:
   ```typescript
   { id: 'my-node', data: myNodeRaw },
   ```

## Best Practices

### Content Quality

- ✅ **Be accurate**: Verify facts with official documentation
- ✅ **Be concise**: Summary = 1 sentence, description = 2-4 paragraphs
- ✅ **Be specific**: Include version numbers, technical details
- ✅ **Be current**: Use recent resources and update dates

### Relationships

- ✅ **Be selective**: Don't connect everything to everything
- ✅ **Be logical**: Prerequisites should actually be needed first
- ✅ **Be accurate**: Verify relationships make sense
- ✅ **Be complete**: Add relationships from both sides when appropriate

### Resources

- ✅ **Link to official sources**: Prefer primary documentation
- ✅ **Include variety**: Mix docs, tutorials, and tools
- ✅ **Check links**: Ensure URLs work and are stable
- ✅ **Avoid paywalls**: Use freely accessible resources

## Example: Complete Node

Here's a complete, valid node example:

```yaml
id: geojson
title: GeoJSON
aliases: [GeoJSON Format, JSON GIS]

type: data-formats
parentNode: data-formats-group
difficulty: beginner
importance: critical

summary: A JSON-based format for encoding geographic data structures.
description: |
  GeoJSON is an open standard format designed for representing simple geographical
  features, along with their non-spatial attributes. It is based on JSON and is
  widely used in web mapping applications.

  It supports geometry types including Point, LineString, Polygon, MultiPoint,
  MultiLineString, MultiPolygon, and GeometryCollection. Each feature can have
  properties (attributes) associated with it.

style:
  color: "#EC4899"
  icon: "file-code"

relationships:
  related:
    - shapefile
    - kml
    - mvt
  usedBy:
    - leaflet
    - mapbox-gl
    - openlayers

tags: [format, vector, json, web]
keywords: [JSON, feature, geometry, properties, RFC7946]

roleRelevance:
  gis-analyst: 0.8
  gis-developer: 1.0
  cartographer: 0.6
  data-engineer: 0.9

resources:
  - title: "GeoJSON Specification (RFC 7946)"
    url: "https://geojson.org"
    type: reference
  - title: "GeoJSON.io - Interactive Editor"
    url: "https://geojson.io"
    type: tool

lastUpdated: "2026-04-07"
```

## Getting Help

- Check `/content/NODE_TEMPLATE.yaml` for the official template
- Look at existing nodes in `/content/gis/nodes/` for examples
- Review `/src/lib/schemas.ts` for the Zod validation schema
- Open browser console to see validation errors

## Questions?

If you encounter issues:

1. Check this guide first
2. Look at the template and existing examples
3. Test locally and read validation errors
4. Create an issue with the specific error message

Happy contributing! 🗺️
