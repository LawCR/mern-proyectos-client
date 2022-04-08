import React, { useContext, useEffect, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    // Extraer proyecto del state inicial del context
    const {proyecto} = useContext(proyectoContext)

    // Extraer proyecto del state inicial del context
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = useContext(tareaContext)

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
             setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    })

    // Destructuramos tarea
    const {nombre} = tarea

    // Si no hay proyecto seleccionado 
    if (!proyecto) return null

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto

    // Leer los valores del formulario
    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // Función al dar submit al formulario
    const onSubmit = (e) => {
        e.preventDefault()

        // validar
        if (nombre.trim() === '') {
            validarTarea()
            return
        }

        // Revisar si es edición o nueva tarea
        if (tareaseleccionada === null) {
            // tarea nueva - agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id
            agregarTarea(tarea)
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea)

            // Elimina la tarea seleccionada del state
            limpiarTarea()
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        // reiniciar el form
        setTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form onSubmit={onSubmit} >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value= { tareaseleccionada ? 'Editar Tarea' : "Agregar Tarea" }
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTarea
