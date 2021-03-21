import path from 'path'
import _ from 'lodash'
import fs from 'fs-extra'

import { Libraries } from '../shared/types';

const baseConfig = {
  baseUrl: '.',
  target: 'es2020',
  esModuleInterop: true,
  moduleResolution: 'Node',
};

const generateTSConfig = async (libraries: Libraries) => {
  const paths = Object
    .entries(libraries)
    .reduce((result, [name, lib]) => {
      const indexFile = path.join(lib.root, lib.source, 'index.ts')
      return _.set(result, name, indexFile)
    }, {});

  await fs.writeJson('./tsconfig.json', { ...baseConfig, paths }, { spaces: 2 })
};

export default generateTSConfig;
