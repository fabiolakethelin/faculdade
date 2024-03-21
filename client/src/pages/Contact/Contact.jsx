import React, { useState } from "react"
import emailjs from "@emailjs/browser"
import './Contact.scss'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import EmailMessage from "../../components/EmailMessage/EmailMessage.tsx"

const Contact = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const templateParams = {
            from_name: name,
            message: message,
            email: email
        }

        const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]

        if (!token) {
        navigate('/login')
        }

        try {
            emailjs.send("service_76hwctq", "template_7cble4o", templateParams, "XnQMRyfMBxrwWWJb6")
            .then((resp) => {
                setName('')
                setEmail('')
                setMessage('')
            })

            await axios.post(`http://localhost:3001/api/email`, {name, email, message}, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            })

            setShowMessage(true)

        }catch (error) {
           console.log(error)
        }
    }

    return (
        <div className="form_container">
            <h2>CONTATO</h2>
            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  placeholder="Digite seu nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <textarea
                  placeholder="Menssagem"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  required
                />
                <button>Enviar</button>
                {showMessage && <EmailMessage message="Email enviado com sucesso!" />}
            </form>
        </div>
    )
}

export default Contact