# Quick Reference - Node Creation Checklist

Use this as a quick checklist when creating or fixing nodes.

## ✅ Pre-Flight Checklist

Before creating a node, answer these:

- [ ] Have I chosen the correct **type** from the 13 categories?
- [ ] Do I know the correct **parent node** for this type?
- [ ] Have I checked that node **IDs** I'm referencing actually exist?
- [ ] Have I reviewed similar existing nodes for consistency?

## 📝 Required Fields Checklist

Every node MUST have:

- [ ] `id` (kebab-case, unique)
- [ ] `title` (human-readable)
- [ ] `aliases: []` (array, can be empty)
- [ ] `type` (one of 13 types)
- [ ] `summary` (one sentence)
- [ ] `lastUpdated` (YYYY-MM-DD format)

## 🎨 Style Object Checklist

- [ ] `style:` is an object (not top-level fields)
- [ ] Contains `color:` with hex code
- [ ] Contains `icon:` with Lucide icon name
- [ ] Color matches the type color from table

## 🔗 Relationships Checklist

If adding relationships:

- [ ] Uses object-with-arrays format (not array-of-objects)
- [ ] All referenced node IDs actually exist
- [ ] Relationship types are valid (prerequisites, related, enables, etc.)
- [ ] Relationships are bidirectional where appropriate

## 📚 Resources Checklist

If adding resources:

- [ ] `resources:` is an **array**, not an object
- [ ] Each resource has `title`, `url`, and `type`
- [ ] Resource `type` is one of: reference, tutorial, documentation, video, tool
- [ ] URLs are valid and accessible

## 🧪 Testing Checklist

After creating/editing:

- [ ] Run `npm run dev`
- [ ] Open browser console (F12)
- [ ] Check for validation errors
- [ ] Verify node appears in correct category
- [ ] Test search functionality
- [ ] Check relationships display correctly

## 🚫 Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|---------|------|
| `icon: "map"` (top-level) | `style:`<br>&nbsp;&nbsp;`icon: "map"` |
| `resources:`<br>&nbsp;&nbsp;`documentation:` | `resources:`<br>&nbsp;&nbsp;`- title:...` |
| `type: article` | `type: tutorial` |
| `type: data-format` | `type: data-formats` |
| Reference `fake-node` | Only reference existing nodes |

## 📋 Type Quick Reference

| Type | Parent | Color |
|------|--------|-------|
| core-concepts | core-concepts-group | #64748B |
| spatial-reference-systems | spatial-reference-systems-group | #10B981 |
| data-models | data-models-group | #8B5CF6 |
| data-formats | data-formats-group | #EC4899 |
| processing-tools | processing-tools-group | #14B8A6 |
| analysis-libraries | analysis-libraries-group | #06B6D4 |
| gis-servers-services | gis-servers-services-group | #F97316 |
| tile-delivery-systems | tile-delivery-systems-group | #F59E0B |
| web-mapping-libraries | web-mapping-libraries-group | #FB923C |
| desktop-gis-applications | desktop-gis-applications-group | #3B82F6 |
| spatial-databases | spatial-databases-group | #A855F7 |
| cloud-gis-platforms | cloud-gis-platforms-group | #C084FC |
| remote-sensing | remote-sensing-group | #0EA5E9 |

## 🔧 Quick Fixes

### Fix: Invalid resource type
```yaml
# Change this:
type: article
# To this:
type: tutorial
```

### Fix: Resources as object
```yaml
# Change this:
resources:
  documentation:
    - title: "Docs"
      url: "..."

# To this:
resources:
  - title: "Docs"
    url: "..."
    type: documentation
```

### Fix: Style at wrong level
```yaml
# Change this:
color: "#FF0000"
icon: "map"

# To this:
style:
  color: "#FF0000"
  icon: "map"
```

### Fix: Missing summary
```yaml
# Add before description:
summary: Brief one-sentence description.
description: |
  Longer details...
```

## 📞 Get Help

1. Check `/content/NODE_TEMPLATE.yaml`
2. Read `/CONTRIBUTING.md`
3. Review `/SCHEMA_REFERENCE.md`
4. Look at existing valid nodes in `/content/gis/nodes/`
5. Check browser console for specific error messages
