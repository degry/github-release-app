import readPackage from '../shared/read-package';
import clearLibraries from './index';

const pckg = readPackage()

clearLibraries(pckg.libraries)

console.log('Libraries were cleared.')
