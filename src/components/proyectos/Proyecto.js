import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import 'animate.css';
const Proyecto = ({proyecto}) => {

    // Obteniedo el state de proyecto del context
    const { proyectoActual } = useContext(proyectoContext)

    // Obteniedo la funcion del context
    const { obtenerTareas, limpiarTarea } = useContext(tareaContext)
   
    // Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id) //Fijar un proyecto actual
        obtenerTareas(id) //Filtrar las tareas cuando se de click
        limpiarTarea()
    }

    return (
        <li className="animate__animated animate__fadeIn">
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id) }
            >
                {proyecto.nombre}
            </button>
        </li>
    )
}

export default Proyecto
