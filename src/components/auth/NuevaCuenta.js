import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import alertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/autenticacion/authContext'

const NuevaCuenta = () => {

    let navigate = useNavigate()

    // Extraer valroes del context alerta
    const {alerta, mostrarAlerta} = useContext(alertaContext)

    // Extraer valores del context auth
    const { mensaje, autenticado, registrarUsuario } = useContext(authContext)

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
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
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const {nombre, email, password, confirmar} = usuario
    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario inicia sesion
    const onSubmit = e => {
        e.preventDefault()

        // Validar que no haya campos vacios
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios','alerta-error')
            return
        }
        // Password minimo de 6 caracteres
        if (password.length < 6 ) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres','alerta-error')
            return
        }
        // Los 2 password son iguales
        if (password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales','alerta-error')
            return
        }
        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return (
        <div className="form-usuario">
            {
                alerta 
                ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) 
                : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input  
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input  
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repetir tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta" >
                    Volver a Iniciar Sesión
                </Link> 
            </div>
        </div>
    )
}

export default NuevaCuenta
