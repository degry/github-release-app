import readPackage from '../shared/read-package';
import publishLibraries from './index';

publishLibraries(readPackage())
  .then(() => console.log('Publish was finished.'))
