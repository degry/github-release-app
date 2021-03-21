import buildLibraries from './index'
import readPackage from '../shared/read-package'

const pckg = readPackage()

buildLibraries(pckg)
  .then(() => console.log('Builds are ready.'))
