import React, { useEffect } from 'react'
import './EmailMessage.scss'
import { useNavigate } from "react-router-dom"

const EmailMessage = ({ message, onClose }) => {
    const navigate = useNavigate()

    setTimeout(() => {
        navigate(`/`)
      }, 1000)

  return (
    <div className="message-container">
      <div className="message-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default EmailMessage
