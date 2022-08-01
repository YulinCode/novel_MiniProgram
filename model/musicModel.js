import { HTTP } from '../utils/http.js'

var app = getApp()

const getNewmusic = () => {
  const url = app.globalData.musicBaseUrl
  return HTTP(url)
}

export { getNewmusic }
