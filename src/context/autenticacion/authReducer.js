import { CERRAR_SESION, EXISTE_USUARIO, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types";



// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) { 
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                loading: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                loading: false
            }

        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                loading: false
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: null,
                loading: false
            }

        case EXISTE_USUARIO:
            return{
                ...state,
                autenticado: true
            }
        
        default:
            return state;
    }
}