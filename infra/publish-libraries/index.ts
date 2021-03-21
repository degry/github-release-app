import delay from 'delay';
import _ from 'lodash'

import buildLibraries from '../build-libraries'
import clearLibraries from '../clear-libraries';
import generateLibraries from '../generate-libraries'
import generateTSConfig from '../generate-tsconfig'
import exec from '../shared/exec'

import { Libraries, Package } from '../shared/types'

const runPublish = async (libraries: Libraries) => {
  for (const { root } of Object.values(libraries)) {
    await exec(`cd ${root} && npm publish`)
  }
}

const publishLibraries = async (pckg: Package) => {
  const libraries = _.pickBy(pckg.libraries, l => !l.private)
  try {
    await generateTSConfig(libraries)
    await buildLibraries(pckg)
    await generateLibraries(pckg)
    await runPublish(libraries)
  } finally {
    await delay(2000)
    await clearLibraries(libraries)
  }
}

export default publishLibraries
