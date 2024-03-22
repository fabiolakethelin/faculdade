import React from "react"
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import './NavBar.scss'
import { Perfil } from "../Perfil/Perfil.tsx"

export const NavBar = () => {

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to='/'>
          <img src={logo} alt="Logo"/>
        </Link>
      </div>
      <div className="menu">
        <Link to={'/'}>Inicio</Link>
        <Link to={'/editor'}>Criar post</Link>
        {<Perfil />}
      </div>
    </nav>
  )
}

export default NavBar