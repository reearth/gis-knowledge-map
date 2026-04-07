# GIS Knowledge Map

An interactive knowledge graph visualization of Geographic Information Systems concepts, tools, and technologies.

## 🗺️ Overview

The GIS Knowledge Map is a comprehensive, interactive visualization that helps users explore and understand the GIS ecosystem. It organizes 91+ nodes across 13 categories, showing relationships between concepts, tools, data formats, and technologies.

## 📊 Categories

The knowledge map covers 13 major categories:

- **Core Concepts** (13 nodes) - Fundamental GIS concepts
- **Spatial Reference Systems** (8 nodes) - CRS, projections, datums
- **Data Models** (8 nodes) - Geometry types and data structures
- **Data Formats** (9 nodes) - File formats (GeoJSON, Shapefile, etc.)
- **Processing Tools** (6 nodes) - CLI tools (GDAL, OGR, etc.)
- **Analysis Libraries** (5 nodes) - Code libraries (Turf, Shapely, etc.)
- **GIS Servers & Services** (8 nodes) - Map servers and OGC services
- **Tile & Delivery Systems** (7 nodes) - Tiling systems and CDN
- **Web Mapping Libraries** (6 nodes) - JavaScript mapping frameworks
- **Desktop GIS Applications** (3 nodes) - Desktop software
- **Spatial Databases** (4 nodes) - Database extensions
- **Cloud GIS Platforms** (6 nodes) - SaaS platforms
- **Remote Sensing** (8 nodes) - Imagery and analysis

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Validate all nodes
npm run validate

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Live Demo

Visit the live demo at: `https://<your-username>.github.io/gis-knowledge-map/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

## 🛠️ Development

### Running Locally

```bash
# Development mode with hot reload
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Validating Nodes

Before committing changes, validate all node files:

```bash
# Quick validation
npm run validate

# Detailed output with all warnings
npm run validate:verbose
```

The validation script checks:
- Required fields
- Valid enum values
- Proper YAML structure
- Resource types
- Relationship references
- And more...

See [scripts/README.md](scripts/README.md) for details.

## 📝 Contributing

We welcome contributions! Please read our guides before creating or editing nodes:

### Documentation

1. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Fast lookup and checklists (start here!)
2. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Complete contribution guide
3. **[NODE_TEMPLATE.yaml](content/NODE_TEMPLATE.yaml)** - Official node template
4. **[SCHEMA_REFERENCE.md](SCHEMA_REFERENCE.md)** - Technical schema documentation

### Creating a New Node

1. Copy `/content/NODE_TEMPLATE.yaml`
2. Fill in all required fields
3. Save to `/content/gis/nodes/your-node.yaml`
4. Register in `/src/lib/content-loader.ts`
5. Run `npm run validate` to check for errors
6. Test with `npm run dev`

### Required Fields

Every node must have:
- `id` - Unique identifier (kebab-case)
- `title` - Display name
- `type` - One of 13 valid categories
- `summary` - One-sentence description
- `lastUpdated` - ISO date (YYYY-MM-DD)

### Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|---------|------|
| Put `icon`/`color` at top level | Put them inside `style:` object |
| Use `resources:` as object | Use `resources:` as array |
| Use invalid resource types | Use: reference, tutorial, documentation, video, tool |
| Reference non-existent nodes | Only reference actual node IDs |

See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for complete checklist.

## 🏗️ Architecture

### Tech Stack

- **React 18** + **TypeScript** - UI framework
- **Vite** - Build tool and dev server
- **React Flow** - Graph visualization
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Zod** - Runtime validation
- **Zustand** - State management

### Content Management

- **YAML files** - All content stored in `/content/gis/nodes/`
- **Schema validation** - Validated at build time via Zod
- **Type safety** - Full TypeScript types generated from schema
- **Static loading** - Content imported at build time

### File Structure

```
gis-knowledge-map/
├── content/
│   ├── gis/
│   │   ├── config.yaml           # Domain configuration
│   │   └── nodes/                # All node YAML files (104)
│   └── NODE_TEMPLATE.yaml        # Template for new nodes
├── src/
│   ├── components/
│   │   ├── canvas/               # React Flow components
│   │   ├── features/             # Feature components
│   │   └── ui/                   # UI components
│   ├── lib/
│   │   ├── schemas.ts            # Zod validation schemas
│   │   ├── content-loader.ts     # YAML content loader
│   │   └── graph-builder.ts      # Graph construction
│   └── types/                    # TypeScript types
├── scripts/
│   └── validate-nodes.js         # Validation script
└── docs/                         # Documentation files
```

## 🧪 Testing

```bash
# Validate all nodes
npm run validate

# Run linter
npm run lint

# Type check
npm run build
```

## 📖 Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick lookup guide
- [SCHEMA_REFERENCE.md](SCHEMA_REFERENCE.md) - Schema documentation
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Documentation overview
- [scripts/README.md](scripts/README.md) - Validation script guide

## 📊 Statistics

- **Total Nodes**: 104 (13 groups + 91 content)
- **Categories**: 13
- **Relationships**: 200+
- **Resources**: 150+

## 🎯 Validation

All nodes are validated against a strict schema to ensure:

✅ Required fields present
✅ Valid enum values
✅ Proper YAML structure
✅ Valid resource types
✅ Existing relationship references
✅ Consistent parent-child mapping

Run `npm run validate` before committing!

## 🔧 Troubleshooting

### Validation Errors

If you see validation errors:

1. Run `npm run validate:verbose` to see details
2. Check [CONTRIBUTING.md](CONTRIBUTING.md) for common errors
3. Compare your node to [NODE_TEMPLATE.yaml](content/NODE_TEMPLATE.yaml)
4. Verify all required fields are present

### Nodes Not Appearing

If your node doesn't appear in the graph:

1. Check browser console for errors (F12)
2. Verify node is registered in `/src/lib/content-loader.ts`
3. Run `npm run validate` to check for errors
4. Ensure `type` matches one of 13 valid categories
5. Verify `parentNode` matches the expected group

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Type check
npm run build
```

## 🤝 Contributing Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Add/edit** nodes using the template
4. **Validate** with `npm run validate`
5. **Test** locally with `npm run dev`
6. **Commit** with descriptive message
7. **Push** to your fork
8. **Create** a pull request

## 📜 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with modern web technologies and the GIS community's collective knowledge.

## 📞 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: Check `/DOCUMENTATION_INDEX.md` for all guides
- **Validation**: Run `npm run validate` to check your work

---

**Happy mapping!** 🗺️
