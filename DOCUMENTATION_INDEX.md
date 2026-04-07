# Documentation Index

This document provides an overview of all available documentation for the GIS Knowledge Map project.

## 📚 Documentation Files

### For Contributors

1. **[NODE_TEMPLATE.yaml](/content/NODE_TEMPLATE.yaml)** - Official node template
   - Copy this file as your starting point
   - Contains complete example with all fields
   - Includes inline comments and explanations
   - Shows common mistakes to avoid

2. **[CONTRIBUTING.md](/CONTRIBUTING.md)** - Contribution guidelines
   - Step-by-step guide for creating nodes
   - Field requirements and validations
   - Common errors and how to fix them
   - Best practices for content quality
   - Testing instructions

3. **[QUICK_REFERENCE.md](/QUICK_REFERENCE.md)** - Quick reference cheatsheet
   - Fast lookup for common tasks
   - Checklists for node creation
   - Type reference table
   - Quick fixes for common errors

4. **[SCHEMA_REFERENCE.md](/SCHEMA_REFERENCE.md)** - Technical schema documentation
   - Complete TypeScript type definitions
   - Detailed field specifications
   - Validation rules and constraints
   - Zod schema documentation
   - Testing and debugging guide

## 🎯 Quick Start

**New to contributing?** Follow this path:

1. Read **[QUICK_REFERENCE.md](/QUICK_REFERENCE.md)** first (5 min)
2. Copy **[NODE_TEMPLATE.yaml](/content/NODE_TEMPLATE.yaml)**
3. Refer to **[CONTRIBUTING.md](/CONTRIBUTING.md)** for details
4. Check **[SCHEMA_REFERENCE.md](/SCHEMA_REFERENCE.md)** when debugging

## 📖 Documentation by Task

### Creating a New Node

1. **Start**: Copy `/content/NODE_TEMPLATE.yaml`
2. **Reference**: Check similar nodes in `/content/gis/nodes/`
3. **Validate**: See "Testing" section in CONTRIBUTING.md
4. **Register**: Follow "Registering New Nodes" in CONTRIBUTING.md

### Fixing Validation Errors

1. **Identify**: Check browser console for error message
2. **Lookup**: Find error type in CONTRIBUTING.md "Common Validation Errors"
3. **Fix**: Apply the correction shown
4. **Verify**: Reload and check console again

### Understanding the Schema

1. **Overview**: Read SCHEMA_REFERENCE.md introduction
2. **Details**: Check specific field documentation
3. **Examples**: Look at existing valid nodes
4. **Test**: Use validation testing methods

## 🗂️ Node Structure Summary

```yaml
id: node-id                          # Required: unique identifier
title: Node Title                    # Required: display name
aliases: []                          # Optional: alternative names
type: category-name                  # Required: one of 13 types
parentNode: category-group           # Optional: parent group
difficulty: beginner                 # Optional: learning level
importance: critical                 # Optional: significance
summary: Brief description.          # Required: one sentence
description: |                       # Optional: detailed explanation
  Multi-line detailed content.
style:                               # Optional: visual styling
  color: "#HEX"                      # Hex color code
  icon: "icon-name"                  # Lucide icon name
relationships:                       # Optional: connections
  related: [node-ids]
tags: [keywords]                     # Optional: categorization
keywords: [search-terms]             # Optional: search
roleRelevance:                       # Optional: role scoring
  role-name: 0.8
resources:                           # Optional: external links
  - title: "Name"
    url: "https://..."
    type: documentation
lastUpdated: "2026-04-07"           # Optional: ISO date
```

## 🎨 Valid Type Values (13 Categories)

| Type | Purpose | Color | Icon Examples |
|------|---------|-------|---------------|
| `core-concepts` | Fundamental GIS concepts | `#64748B` | lightbulb, layers |
| `spatial-reference-systems` | CRS, projections | `#10B981` | compass, globe |
| `data-models` | Geometry types | `#8B5CF6` | shapes, hexagon |
| `data-formats` | File formats | `#EC4899` | file-code, file |
| `processing-tools` | CLI tools | `#14B8A6` | wrench, tool |
| `analysis-libraries` | Code libraries | `#06B6D4` | library, code |
| `gis-servers-services` | Servers & OGC | `#F97316` | server, network |
| `tile-delivery-systems` | Tiling & CDN | `#F59E0B` | grid-3x3, zap |
| `web-mapping-libraries` | JS mapping libs | `#FB923C` | globe, map-pin |
| `desktop-gis-applications` | Desktop software | `#3B82F6` | monitor, laptop |
| `spatial-databases` | Database extensions | `#A855F7` | database, server |
| `cloud-gis-platforms` | SaaS platforms | `#C084FC` | cloud, cloud-upload |
| `remote-sensing` | Imagery & analysis | `#0EA5E9` | satellite, scan |

## ✅ Validation Checklist

Before submitting your node:

- [ ] All required fields present
- [ ] Type is one of 13 valid values
- [ ] Parent node matches type
- [ ] Style object (not top-level fields)
- [ ] Resources as array (not nested object)
- [ ] Resource types are valid enum values
- [ ] All relationship IDs reference existing nodes
- [ ] Summary is one sentence
- [ ] No validation errors in console
- [ ] Node appears in correct category

## 🔍 Finding Information

| Need to... | Check... |
|------------|----------|
| Find valid type values | QUICK_REFERENCE.md table |
| Understand a field | SCHEMA_REFERENCE.md field specs |
| Fix a validation error | CONTRIBUTING.md error section |
| See a complete example | NODE_TEMPLATE.yaml |
| Know allowed icon names | [Lucide Icons](https://lucide.dev/icons/) |
| Check enum values | SCHEMA_REFERENCE.md enum section |

## 🐛 Debugging Workflow

1. **See error in console**: Note the exact error message
2. **Find error type**: Search CONTRIBUTING.md for error text
3. **Read explanation**: Understand what's wrong
4. **Apply fix**: Make the correction shown
5. **Test**: Reload browser and check console
6. **Verify**: Confirm node appears correctly

## 📊 Current Statistics

- **Total nodes**: 104 (13 groups + 91 content)
- **Categories**: 13
- **Node types**: 13
- **Resource types**: 5
- **Difficulty levels**: 3
- **Importance levels**: 4

### Nodes per Category

| Category | Count |
|----------|-------|
| Core Concepts | 13 |
| Spatial Reference Systems | 8 |
| Data Models | 8 |
| Data Formats | 9 |
| Processing Tools | 6 |
| Analysis Libraries | 5 |
| GIS Servers & Services | 8 |
| Tile & Delivery Systems | 7 |
| Web Mapping Libraries | 6 |
| Desktop GIS Applications | 3 |
| Spatial Databases | 4 |
| Cloud GIS Platforms | 6 |
| Remote Sensing | 8 |

## 🔗 External Resources

- [Zod Documentation](https://zod.dev/) - Schema validation
- [Lucide Icons](https://lucide.dev/icons/) - Icon library
- [YAML Syntax](https://yaml.org/spec/1.2.2/) - YAML specification
- [React Flow](https://reactflow.dev/) - Graph visualization library

## 💡 Tips for Success

1. **Start simple**: Begin with NODE_TEMPLATE.yaml
2. **Copy examples**: Look at existing valid nodes
3. **Test early**: Check validation after each change
4. **Be consistent**: Follow established patterns
5. **Read errors**: Console messages tell you exactly what's wrong

## 📝 File Locations

```
gis-knowledge-map/
├── CONTRIBUTING.md              # Contribution guide
├── QUICK_REFERENCE.md           # Quick lookup
├── SCHEMA_REFERENCE.md          # Technical schema docs
├── DOCUMENTATION_INDEX.md       # This file
├── content/
│   ├── NODE_TEMPLATE.yaml       # Official template
│   └── gis/
│       ├── config.yaml          # Domain configuration
│       └── nodes/               # All node YAML files
│           ├── *-group.yaml     # Category groups (13)
│           └── *.yaml           # Content nodes (91)
└── src/
    ├── lib/
    │   ├── schemas.ts           # Zod validation schemas
    │   └── content-loader.ts    # Node registration
    └── types/                   # TypeScript type definitions
```

## 🎓 Learning Path

### Beginner
1. Read QUICK_REFERENCE.md
2. Copy NODE_TEMPLATE.yaml
3. Create your first node
4. Test locally

### Intermediate
1. Read CONTRIBUTING.md thoroughly
2. Understand relationships
3. Add multiple nodes
4. Handle validation errors

### Advanced
1. Study SCHEMA_REFERENCE.md
2. Contribute to schema
3. Help others debug
4. Improve documentation

---

**Questions?** Check these docs first, then create an issue if you're still stuck!
