import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import authContext from '../../context/autenticacion/authContext'

const RutaPrivada = ({children}) => {
    const { autenticado, loading, usuarioAutenticado} = useContext(authContext)
    useEffect(() => {
        usuarioAutenticado()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // return (
    //     <Route path={path}   render={ (props) => !autenticado 
    //             ? ( <Navigate to="/" replace /> ) 
    //             : ( <Component {...props} /> ) 
    //         } 
    //         {...props}
    //     />
    // )
    
    return !autenticado && !loading ? <Navigate to="/" replace />  : children
}

export default RutaPrivada
