import { HTTP } from '../utils/http.js'

var app = getApp()

const getNewmovie = () => {
  const url = app.globalData.movieBaseUrl + '/tabs/selected'
  return HTTP(url)
}
const getHotmovie = () => {
  const url = app.globalData.movieBaseUrl + '/discovery/hot'
  return HTTP(url)
}

export { getNewmovie ,getHotmovie}
