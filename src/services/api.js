import axios from 'axios'

const api = axios.create({
    baseURL: "https://backend-avicultura.herokuapp.com/",
})
export default api;