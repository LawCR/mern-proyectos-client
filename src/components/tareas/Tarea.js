import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import 'animate.css';
const Tarea = ({tarea}) => {

    // Extraer proyecto del state inicial del context
    const {proyecto} = useContext(proyectoContext)

    // Extraer proyecto del state inicial del context
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = useContext(tareaContext)

    // Extraer el proyecto actual
    const [proyectoActual] = proyecto

    // Función que se ejecuta cuando se preciona el boton Eliminar Tarea
    const tareaEliminar = (id) => {
        eliminarTarea(id, proyectoActual._id) 
        // Recargar todas las tareas
        obtenerTareas(proyectoActual.id)
    }

    // Función que modifica el estado de la tarea
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false
        } else{
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea)
    }

    return (
        <li className="tarea sombra animate__animated animate__fadeIn">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado
                    ?
                        (
                            <button 
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                            <button 
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea) }
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    )
}

export default Tarea
