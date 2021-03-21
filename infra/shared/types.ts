export type Library = {
  root: string
  dist: string
  source: string,
  private: boolean
}

export type Libraries = { [key: string]: Library }

export type Package = {
  name: string
  version: string
  main?: string
  types?: string
  dependencies?: { [key: string]: string }
  peerDependencies?: { [key: string]: string }
  devDependencies?: { [key: string]: string }
  libraries?: Libraries,
  files?: string[],
  author?: string,
  license?: string,
}
