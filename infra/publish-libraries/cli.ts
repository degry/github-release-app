import readPackage from '../shared/read-package';
import publishLibraries from './index';

const pckg = readPackage()

const [version] = process.argv.slice(2)

// publishLibraries(version, pckg)
//   .then(() => console.log('"package.json" was generated.'))
