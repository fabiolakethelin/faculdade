import React from "react"
import logo from '../../assets/logo.jpg'
import './Footer.scss'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="footer-container">
            <img src={logo} alt="Logo"/>
            <p>Made by <span>Fabíola Kethelin</span></p>
            <div className="links">
                <Link to={'/about'}>Sobre o blog</Link>
                <Link to={'/contact'}>Contato</Link>
            </div>
        </footer>
    )
}

export default Footer