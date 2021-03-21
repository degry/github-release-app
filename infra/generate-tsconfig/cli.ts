import readPackage from '../shared/read-package'
import generateTSConfig from './index'

const pckg = readPackage()

generateTSConfig(pckg.libraries)
  .then(() => console.log('"tsconfig.json" was generated.'))
