import rimraf from 'rimraf'
import path from 'path'

import { Libraries } from '../shared/types'

const clearLibraries = (libraries: Libraries) => {
  for (const { root, dist } of Object.values(libraries)) {
    rimraf(path.join(root, 'package.json'), () => console.log(`${root}: removed "package.json" files.`))
    rimraf(path.join(root, dist), () => console.log(`${root}: removed "dist" dirs.`))
  }
}

export default clearLibraries
