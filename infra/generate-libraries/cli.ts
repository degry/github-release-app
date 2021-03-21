import readPackage from '../shared/read-package';
import generateLibraries from './index';

const pckg = readPackage()

generateLibraries(pckg)
  .then(() => console.log('"package.json" was generated.'))
