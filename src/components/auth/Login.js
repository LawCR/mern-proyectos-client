import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/autenticacion/authContext'

const Login = () => {

    let navigate = useNavigate()

    // Extraer valroes del context alerta
    const {alerta, mostrarAlerta} = useContext(alertaContext)

    // Extraer valores del context auth
    const { mensaje, autenticado, iniciarSesion, existeUsuario } = useContext(authContext)
    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        existeUsuario()
        
        if (autenticado) {
            navigate("/proyectos");
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, navigate])


    // state para iniciar sesion
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    const {email, password} = usuario
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario inicia sesion
    const onSubmit = e => {
        e.preventDefault()

        //Validar que no haya campos vacios
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        // Pasarlo al action
        iniciarSesion({email, password})
    }

    return (
        <div className="form-usuario">
            {
                alerta 
                ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) 
                : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input  
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input  
                            type="password"
                            id="password"
                            name="password"
                            placeholder="***"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta" >
                    Obtener Cuenta
                </Link> 
            </div>
        </div>
    )
}

export default Login
