import fs from 'fs-extra';
import readPackage from '../shared/read-package'
import generateTSConfig from './index'

const pckg = readPackage()

fs.writeJson('./tsconfig.json', generateTSConfig(pckg.libraries), { spaces: 2 })
  .then(() => console.log('"tsconfig.json" was generated.'))
