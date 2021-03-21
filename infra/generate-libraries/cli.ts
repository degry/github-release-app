import readPackage from '../shared/read-package';
import generateLibraries from './index';

const pckg = readPackage()

const version: string = process.argv.slice(2).shift()

generateLibraries(pckg, { version })
  .then(() => console.log('"package.json" was generated.'))
