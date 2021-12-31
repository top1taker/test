import {axiosClient} from './axiosClient'

export const blogApi = {
  getAll: (params = {}) => {
    return axiosClient.get('/blogs', {params})
  },
  update: (data) => {
    const url = `/blogs/${data.id}`
    return axiosClient.put(url, data)
  },
  getById: (id) => {
    const url = `/blogs/${id}`
    return axiosClient.get(url)
  },
  add: (data) => {
    const url = '/blogs'
    return axiosClient.post(url, data)
  },
}
