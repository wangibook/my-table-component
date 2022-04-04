import axios from 'axios'

export function getList(params) {
  return axios.post('http://localhost:8080/api-dev/table/list',params)
}