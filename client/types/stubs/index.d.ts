// Images
declare module '*.png' {
  const value: string
  export default value
}
declare module '*.jpg' {
  const value: string
  export default value
}
declare module '*.jpeg' {
  const value: string
  export default value
}
declare module 'assets/images/*.svg' {
  const value: string
  export default value
}
// For svg-sprite-loader in webpack
declare module 'assets/images/sprite/*.svg' {
  const sprite: {
    id: string
  }
  export default sprite
}

// Fonts
declare module '*.woff' {
  const value: string
  export default value
}
declare module '*.woff2' {
  const value: string
  export default value
}
declare module '*.otf' {
  const value: string
  export default value
}

// JSS
declare interface JSSClasses {
  [classname: string]: string
}
