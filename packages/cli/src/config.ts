import { config as dotenv } from 'dotenv';

import path from 'path'
import fs from 'fs'

dotenv()

const configFile = path.resolve(__dirname, '../config.json')

if (!fs.existsSync(configFile)) {
  throw new Error('Create "config.json" file. See "config.json.example".')
}

const config = require(configFile)

export default config
