/// <reference types="vite/client" />

// YAML module declarations
declare module '*.yaml' {
  const content: any
  export default content
}
