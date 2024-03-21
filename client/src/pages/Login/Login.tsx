import React, { useState } from "react"
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.elements.email.value,
            password: event.target.elements.password.value
        }

        try {
            await axios.post('http://localhost:3001/api/user/login', data, { withCredentials: true })

            navigate('/')
        } 
        catch (error) {
            if (error.response) {
                if (error.response.data.message == "email must be an email") {
                    error.response.data.message = "Digite um email válido!"
                }
                setErrorMessage(error.response.data.message)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 2000)
            }
        }
    }
    
    return (
        <div className="login-container">
            <p>Seja bem-vindo ao nosso universo de inspiração e conhecimento! Aqui, cada clique é uma jornada através de histórias cativantes, ideias revolucionárias e experiências enriquecedoras. Entre para desbravar um mundo de pensamentos, opiniões e descobertas, onde cada página é uma porta aberta para novas possibilidade</p>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <h1>Login para Acessar</h1>
                <input required type="email" name="email" placeholder="Email" />
                <input required type="password" name="password" placeholder="Senha"/>
                <button>Entrar</button>
                <span>Você não tem uma conta? <Link to={'/register'}>Crie Agora!</Link></span>
            </form>
        </div>
    )
}

export default Login