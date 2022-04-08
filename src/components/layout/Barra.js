import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autenticacion/authContext'

const Barra = () => {
    const {usuario, usuarioAutenticado, cerrarSesion} = useContext(authContext)
    
    useEffect(() => {
        usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header className="app-header">
            {
                usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>  : null
            }
            
            <div className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar Sesión
                </button>
            </div>
        </header>
    )
}

export default Barra
