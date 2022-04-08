import axios from "axios";

// Cliente axios donde dejamos creado la base url con el link de la api base
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

export default clienteAxios