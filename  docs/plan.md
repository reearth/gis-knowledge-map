## Plan: Domain-Agnostic, Extensible Knowledge Map Platform

**TL;DR:**
Design the data model, file structure, and codebase to be industry-neutral. All domain specifics (like GIS) live in content files, not in code or schemas. This enables easy reuse for any knowledge domain.

---

**Steps**

1. **Generic Data Model**
   - Define node and relationship schemas using neutral terms (e.g., “concept”, “entity”, “relationship”, “type”).
   - Allow custom types/tags in content (e.g., “tool”, “standard”, “process”, “role”).
   - Avoid hardcoding GIS-specific logic or fields in the app.

2. **Content Separation**
   - Store all domain-specific content (nodes, relationships, tags, categories) in static files.
   - Organize content in folders by domain (e.g., /content/gis/, /content/finance/).

3. **Configurable Taxonomies**
   - Allow each domain to define its own types, categories, and relationship types via config files (e.g., types.yaml, relationships.yaml).
   - Support custom metadata fields via schema extension.

4. **Flexible UI**
   - UI reads available types, categories, and relationships from content/config, not from hardcoded lists.
   - Branding, color schemes, and terminology are configurable per domain.

5. **Contribution Guidelines**
   - Document how to add a new domain (create a new folder, config, and content files).
   - Provide templates and schema validation for contributors.

---

**Relevant files**
- content/gis/nodes/ — GIS nodes
- content/gis/relationships/ — GIS relationships
- content/finance/nodes/ — Finance nodes (example)
- content/finance/relationships/ — Finance relationships (example)
- content/gis/types.yaml — GIS-specific types/tags
- content/finance/types.yaml — Finance-specific types/tags
- schemas/node.schema.json — Generic node schema
- schemas/relationship.schema.json — Generic relationship schema
- config/domain-config.yaml — Domain-level settings

---

**Verification**
1. Add a new domain (e.g., “finance”) and confirm the app loads and displays it without code changes.
2. Validate that all types, relationships, and metadata are read from content/config, not hardcoded.
3. Test switching between domains in the UI.

---

**Decisions**
- All domain logic/content is externalized; the app is a generic knowledge map engine.
- GIS is the initial content set, but not special in the codebase.

---

**Further Considerations**
1. Should the UI support multi-domain browsing or just one domain at a time? (Recommend: one at a time for simplicity.)
2. Consider internationalization for terminology/config.
3. Plan for domain-specific extensions (e.g., custom visualizations) via plugins or config.
