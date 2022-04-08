import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, LIMPIAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from '../../types'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'

const TareaState = (props) => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    // Crear las funciones (acciones) 

    // Obtener las tareas de un proyecto
    const obtenerTareas = async(proyecto) => {
        try {
            if (!proyecto) {
                return
            }
            const resultado = await clienteAxios.get('/api/tareas', { params: {proyecto} })
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async(tarea) => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Valida y muestra un error en caso que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por su id
    const eliminarTarea = async(id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Edita una tarea o cambia el estado
    const actualizarTarea = async(tarea) => {
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Extrae una tarea para edición
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    

    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }


    

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >   
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState