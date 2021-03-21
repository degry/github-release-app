const rollup = require('rollup')
import ts from "@wessberg/rollup-plugin-ts";
const path = require('path')

import { nodeResolve } from '@rollup/plugin-node-resolve'

import { Package } from '../shared/types'

import generateTSConfig from '../generate-tsconfig'

const createConfig = (name: string, pckg: Package) => {
  const { root, source, dist } = pckg.libraries[name]
  return {
    input: path.join(root, source, 'index.ts'),
    external: [
      ...Object.keys(pckg.dependencies),
      ...Object.keys(pckg.peerDependencies),
      ...Object.keys(pckg.libraries)
    ],
    output: {
      dir: path.join(root, dist),
      format: 'cjs'
    },
    plugins: [
      // @ts-ignore
      ts(generateTSConfig(pckg.libraries).compilerOptions),
      nodeResolve()
    ]
  }
}

const runConfig = async ({ input, external, output, plugins }) => {
  const bundle = await rollup.rollup({ input, external, plugins })
  await bundle.write({ output })
  await bundle.close()
}

const buildLibraries = async (pckg: Package) => {
  for (const name of Object.keys(pckg.libraries)) {
    await runConfig(createConfig(name, pckg))
  }
}

export default buildLibraries
