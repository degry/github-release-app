const rollup = require('rollup')
const typescript = require('@rollup/plugin-typescript')
const path = require('path')

import { Libraries } from '../shared/types'

const createConfig = ({ root, source, dist }) => ({
  input: path.join(root, source, 'index.ts'),
  output: {
    dir: path.join(root, dist),
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
})

const runConfig = async ({ input, output, plugins }) => {
  const bundle = await rollup.rollup({ input, plugins })
  await bundle.write({ output })
  await bundle.close()
}

const buildLibraries = async (libraries: Libraries) => {
  for (const lib of Object.values(libraries)) {
    await runConfig(createConfig(lib))
  }
}

export default buildLibraries
