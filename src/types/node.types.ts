// Re-export types from schemas for convenience
export type {
  Node,
  Position,
  Style,
  Resource,
  Relationships,
  NodeType,
  RelationshipType,
  Category,
  Role,
  DomainConfig,
} from '../lib/schemas'

// Node difficulty levels
export type NodeDifficulty = 'beginner' | 'intermediate' | 'advanced'

// Node importance levels
export type NodeImportance = 'nice-to-know' | 'useful' | 'important' | 'critical'

// Node types
export type NodeTypeId = 'concept' | 'tool' | 'standard' | 'format' | 'workflow' | 'role' | 'domain'

// Resource types
export type ResourceType = 'reference' | 'tutorial' | 'documentation' | 'video' | 'tool'

// Relationship style
export type RelationshipStyle = 'solid' | 'dashed' | 'dotted'
