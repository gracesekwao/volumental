import axios from 'axios'

export const updateSizes = (sizes) => ({
  type: 'UPDATE_SIZES',
  payload: { sizes }
})

export const getFetchError = e => {
  if (e.response) {
    console.log(e.response.status)
    if (e.response.status === 400) {
      return `Your browser sent a request that this server could not understand`
    }
  } else if (e.request) {
    return `Couldn't connect with the server`
  } else {
    console.log('Error', e.message)
    return `There was an internal error`
  }
}

export const fetchSizes = (nextPage) => {
  const url = `https://homeexercise.volumental.com/sizingsample${nextPage ? '?page=' + nextPage : ''}`
  const auth = { username: 'admin', password: 'ToPsEcReT' }
  return axios({ url, auth }).then(({ data }) => (data))
}
