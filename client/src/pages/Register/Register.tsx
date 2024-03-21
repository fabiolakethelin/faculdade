import React, { useState } from "react"
import './Register.scss'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

const Register = () => {
    
    const [errorMessage, setErrorMessage] = useState(null)
    const [sucessMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            name: event.target.elements.name.value,
            email: event.target.elements.email.value,
            password: event.target.elements.password.value
        }

        try {
            await axios.post('http://localhost:3001/api/user', data)

            setSuccessMessage("Perfil criado! Você será redirecionado para tela de login.")

            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } 
        catch (error) {
            if (error.response) {
                if (error.response.data.message == "email must be an email") {
                    error.response.data.message = "Digite um email válido!"
                }
                setErrorMessage(error.response.data.message)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
            }
        }
    }

    return (
        <div className="login-container">
            <p> Inscreva-se agora, e dê o primeiro passo em direção a uma jornada de descoberta e realização. Estamos ansiosos para recebê-lo em nosso círculo de pensadores e sonhadores. Vamos começar essa jornada juntos!</p>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {sucessMessage && <div className="success-message">{sucessMessage}</div>}

            <form onSubmit={handleSubmit}>
                <h1>Cadastre em nosso sistema</h1>
                <input required type="text" name="name" placeholder="Nome" />
                <input required type="email" name="email" placeholder="Email" />
                <input required type="password" name="password" placeholder="Senha"/>
                <button type="submit">Registar</button>
                <span>Você já tem uma conta? <Link to={'/login'}>Entre agora!</Link></span>
            </form>
        </div>
    )
}

export default Register