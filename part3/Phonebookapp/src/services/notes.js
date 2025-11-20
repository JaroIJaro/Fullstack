import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'


const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(res => res.data)
}

const update = (id, newPerson) => {
  return axios.patch(`${baseUrl}/${id}`, newPerson).then(res => res.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
