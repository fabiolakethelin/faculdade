import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Perfil.scss'

export const Perfil = () => {
  
  const navigate = useNavigate()

    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1]

    const perfil = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='))
      ?.split('=')

  const logout = async () => {

    await axios.post('http://localhost:3001/api/user/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })

    navigate('/login')
  }

    const perfilDecodificado = perfil ? decodeURIComponent(perfil[1]) : ''

    return (
        <div className="perfil">
            <span>{perfilDecodificado}</span>
            <div className="list-container">
                <ul className="list">
                    <li onClick={logout}>Sair</li>
                </ul>
            </div>
      </div>
    )
}

export default Perfil