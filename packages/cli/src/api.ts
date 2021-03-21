import { ReleaseApi } from '@degry/release-manager-api'

import config from './config'

const api = new ReleaseApi({ token: process.env.GITHUB_TOKEN, owner: config.owner })

export default api
