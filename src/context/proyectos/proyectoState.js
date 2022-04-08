import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, PROYECTO_ERROR, VALIDAR_FORMULARIO } from '../../types'
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'



const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }
     
    
    // Dispatch para ejecitar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones(acciones) para el CRUD del reducer
    // Accion para mostrar el formulario
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Accion para obtener los proyectos
    const obtenerProyectos = async() => {
        try {

            const resultado = await clienteAxios.get('/api/proyectos')
            

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Accion para agregar nuevo proyecto
    const agregarProyecto = async(proyecto) => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            // Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
        
    }

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }

    // Selecciona el Proyecto que el usuario dio click
    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Elimina el proyecto
    const eliminarProyecto = async(proyectoId) => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
                
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState