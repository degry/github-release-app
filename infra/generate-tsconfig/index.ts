import path from 'path'
import _ from 'lodash'

import { Libraries } from '../shared/types';

const baseCompilerOptions = {
  baseUrl: '.',
  target: 'es2020',
  esModuleInterop: true,
  declaration: true,
  moduleResolution: 'Node',
};

const generateTSConfig = (libraries: Libraries) => {
  const paths = Object
    .entries(libraries)
    .reduce((result, [name, lib]) => {
      const indexFile = path.join(lib.root, lib.source, 'index.ts')
      return _.set(result, name, [indexFile])
    }, {});

  return {
    compilerOptions: {
      ...baseCompilerOptions, paths
    }
  }
};

export default generateTSConfig;
