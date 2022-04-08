import clienteAxios from "./axios";

// Si existe un token lo establece como header por defecto
const tokenAuth = token => {
    if (token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token']
    }
}

export default tokenAuth