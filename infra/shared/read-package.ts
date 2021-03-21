import fs from 'fs-extra'
import path from 'path'
import _ from 'lodash'

import { Package } from './types';

const cwd = process.cwd()
const packageJsonFile = path.join(cwd, 'package.json')

const readPackage = (file = packageJsonFile): Package => {
  const pckg = fs.readJsonSync(file)
  return _.merge({
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
    libraries: {}
  }, pckg)
}

export default readPackage
