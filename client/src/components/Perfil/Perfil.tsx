import React from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Perfil.scss'
import { getToken, getUser } from '../../utils/Global.ts'

export const Perfil = () => {
  
  const navigate = useNavigate()

  const token = getToken()

  const perfil = getUser()

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