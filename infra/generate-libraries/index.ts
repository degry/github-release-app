import path from 'path'
import fs from 'fs-extra'
import _ from 'lodash'
import micromatch from 'micromatch'

import { Package } from '../shared/types';

const analyzeDist = (fullPath, extensions) => {
  const files = fs.readdirSync(fullPath)
  return files
    .filter(file => micromatch.isMatch(file, extensions))
    .flatMap(file => {
      const content = fs.readFileSync(path.join(fullPath, file)).toString()
      const matches = Array.from(content.matchAll(/import\s.*from\s['"]([@\w/-]+)['"]/g))
      return matches.map(m => m[1]).filter(Boolean)
    })
}

const generateLibraries = async (pckg: Package, options: { version: string }) => {
  for (const [name, lib] of Object.entries(pckg.libraries)) {
    const sourcePath = path.join(lib.root, lib.source)

    const deps = analyzeDist(sourcePath, ['*.js']).reduce((result, dep) => {
      if (pckg.dependencies[dep]) {
        _.set(result, `dependencies.${dep}`, pckg.dependencies[dep])
      }
      if (pckg.peerDependencies[dep]) {
        _.set(result, `peerDependencies.${dep}`, pckg.peerDependencies[dep])
      }
      if (pckg.devDependencies[dep]) {
        _.set(result, `devDependencies.${dep}`, pckg.devDependencies[dep])
      }
      if (pckg.libraries[dep]) {
        _.set(result, `dependencies.${dep}`, options.version)
      }
      return result
    }, {})

    const libPackage: Package = {
      name,
      version: options.version,
      main: lib.dist,
      ...deps
    }

    const pckgJsonPath = path.join(lib.root, 'package.json')

    await fs.writeJson(pckgJsonPath, libPackage, { spaces: 2 })
  }
}

export default generateLibraries
