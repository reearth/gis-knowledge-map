import { z } from 'zod'

// Position schema for node positioning
export const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
})

// Style schema for visual customization
export const styleSchema = z.object({
  color: z.string().optional(),
  icon: z.string().optional(),
})

// Resource schema for external links
export const resourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.enum(['reference', 'tutorial', 'documentation', 'video', 'tool']),
})

// Relationships schema
export const relationshipsSchema = z.object({
  prerequisites: z.array(z.string()).optional().default([]),
  related: z.array(z.string()).optional().default([]),
  enables: z.array(z.string()).optional().default([]),
  partOf: z.array(z.string()).optional().default([]),
  usedBy: z.array(z.string()).optional().default([]),
  basedOn: z.array(z.string()).optional().default([]),
  comparedWith: z.array(z.string()).optional().default([]),
}).optional().default(() => ({
  prerequisites: [],
  related: [],
  enables: [],
  partOf: [],
  usedBy: [],
  basedOn: [],
  comparedWith: [],
}))

// Node schema - represents a knowledge concept/entity
export const nodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  aliases: z.array(z.string()).optional().default([]),

  // Core metadata
  type: z.enum([
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
    'remote-sensing'
  ]),
  category: z.string().optional(), // Deprecated: now merged with type
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  importance: z.enum(['nice-to-know', 'useful', 'important', 'critical']).optional(),

  // Hierarchy support for parent/child nodes
  isGroup: z.boolean().optional().default(false),
  parentNode: z.string().optional(),

  // Content
  summary: z.string(),
  description: z.string().optional(),

  // Visual
  position: positionSchema.optional(),
  style: styleSchema.optional(),

  // Relationships
  relationships: relationshipsSchema,

  // Additional metadata
  tags: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),

  // Role relevance (0-1 scale)
  roleRelevance: z.record(z.string(), z.number().min(0).max(1)).optional(),

  // Resources
  resources: z.array(resourceSchema).optional().default([]),

  // Contribution metadata
  contributors: z.array(z.string()).optional().default([]),
  lastUpdated: z.string().optional(),
})

// Node type definition
export const nodeTypeSchema = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string(),
  icon: z.string(),
})

// Relationship type definition
export const relationshipTypeSchema = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string(),
  style: z.enum(['solid', 'dashed', 'dotted']),
})

// Category definition
export const categorySchema = z.object({
  id: z.string(),
  label: z.string(),
  color: z.string(),
})

// Role definition
export const roleSchema = z.object({
  id: z.string(),
  label: z.string(),
})

// Domain configuration schema
export const domainConfigSchema = z.object({
  domain: z.string(),
  displayName: z.string(),
  version: z.string(),

  // Domain metadata
  description: z.string(),
  icon: z.string(),
  color: z.string(),

  // Define available types in this domain
  nodeTypes: z.array(nodeTypeSchema),

  // Define relationship types
  relationshipTypes: z.array(relationshipTypeSchema),

  // Categories/domains
  categories: z.array(categorySchema),

  // Roles for filtering
  roles: z.array(roleSchema),
})

// Infer TypeScript types from Zod schemas
export type Position = z.infer<typeof positionSchema>
export type Style = z.infer<typeof styleSchema>
export type Resource = z.infer<typeof resourceSchema>
export type Relationships = z.infer<typeof relationshipsSchema>
export type Node = z.infer<typeof nodeSchema>
export type NodeType = z.infer<typeof nodeTypeSchema>
export type RelationshipType = z.infer<typeof relationshipTypeSchema>
export type Category = z.infer<typeof categorySchema>
export type Role = z.infer<typeof roleSchema>
export type DomainConfig = z.infer<typeof domainConfigSchema>
