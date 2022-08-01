import {
  HTTP
} from '../utils/http.js'

var app = getApp()

const getFictionType = (type, index = 1) => {
  const url = app.globalData.bookBaseUrl + `fiction/search/fictionType/${type}/${index}`
  return HTTP(url)
}

const fictionChapter = (id) => {
  const url = app.globalData.bookBaseUrl + `/fictionChapter/search/${id}`
  return HTTP(url)
}
const searchTitle = (e, index = 1, op = 'title') => {
  const url = app.globalData.bookBaseUrl + `/fiction/search/${op}/${e}/${index}`
  return HTTP(url)
}

const fictionContent = (chapterId) => {
  const url = app.globalData.bookBaseUrl + `/fictionContent/search/${chapterId}`
  return HTTP(url)
}


export {
  getFictionType,
  fictionChapter,
  fictionContent,
  searchTitle
}