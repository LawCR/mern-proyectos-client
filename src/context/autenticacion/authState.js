
import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import { CERRAR_SESION, EXISTE_USUARIO, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types'
import authContext from './authContext'
import authReducer from './authReducer'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Accion para registrar usuario 
    const registrarUsuario = async(datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            //console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario
            usuarioAutenticado()
        } catch (error) {
            // console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Retorna la data del usuario autenticado
    const usuarioAutenticado = async() => {
        const token = localStorage.getItem('token')
        // Establecemos el token en el header
        if (token) {
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const existeUsuario = () => {
        const token = localStorage.getItem('token')
        try {
            if (token) {
                dispatch({
                    type: EXISTE_USUARIO
                })
            }
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async(datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos)

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            // Obtener el usuario
            usuarioAutenticado()
        } catch (error) {
            // console.log(error.response);
            // console.log(error.response.data.errores[0].msg);
            const alerta = {
                msg: error.response.data.msg ? error.response.data.msg : error.response.data.errores[0].msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión de usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                loading: state.loading,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion,
                existeUsuario
            }}
        >
            {props.children}
        </authContext.Provider>
    )

}

export default AuthState