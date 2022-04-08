import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {


    // Obteniedo el statea del formulario del context
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = useContext(proyectoContext)

    // State para Proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    })


    // Extraer nombre de proyecto
    const {nombre} = proyecto

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault()

        // Validar el proyecto
        if (nombre === '') {
            mostrarError()
            return
        }
        // Agregar al state
        agregarProyecto(proyecto)
        // Reiniciar el form
        setProyecto({
            nombre: ''
        })
    }
    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario()
    }
    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickFormulario }
            >
                Nuevo Proyecto
            </button>

            {
                formulario 
                ? 
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar Proyecto"
                        />
                    </form>
                )
                : null
            }
            {
                errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null
            }
        </>
    )
}

export default NuevoProyecto
