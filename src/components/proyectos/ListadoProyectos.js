import React, { useContext, useEffect } from 'react'
import alertaContext from '../../context/alertas/alertaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'

const ListadoProyectos = () => {

    // Extraer los state proyectos del context
    const {mensaje, proyectos, obtenerProyectos} = useContext(proyectoContext)
    const {alerta, mostrarAlerta} = useContext(alertaContext)
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje])

    // Revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    
    
    return (
        <ul className="listado-proyectos">
            {
                alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null
            }
            {
                proyectos.map(proyecto => (
                    <Proyecto 
                        key={proyecto._id}
                        proyecto={proyecto}
                    />
                ))
            }
        </ul>
    )
}

export default ListadoProyectos
