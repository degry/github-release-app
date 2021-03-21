import api from './api'

api.getReleasePull('utils', 'release-c-march-1').then((res) => console.log(res))
