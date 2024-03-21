import React from "react"
import logo from '../../assets/logo.jpg'
import './About.scss'

export const About = () => {
  return (
    <div className='about-container'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>

        <h2>Sobre a Plataforma</h2>
        <p>
            Nosso objetivo é oferecer conteúdo relevante e envolvente que não apenas informe, mas também inspire e motive nossos leitores a viverem suas melhores vidas. Acreditamos no poder da educação contínua e na busca pelo crescimento pessoal, e esperamos que nosso blog possa ser uma fonte de aprendizado e inspiração para você.
        </p>
        <p>
            Somos apaixonados por compartilhar conhecimento, inspirar e conectar pessoas através do poder da escrita. Neste espaço virtual, buscamos criar uma comunidade vibrante e acolhedora, onde todos são bem-vindos para explorar uma variedade de tópicos interessantes, desde estilo de vida saudável até tecnologia, cultura e muito mais.
        </p>
        <p>
            Além de oferecer conteúdo de qualidade, também nos comprometemos em criar uma comunidade inclusiva e respeitosa, onde todas as opiniões são valorizadas e todos se sintam bem-vindos a participar da conversa. Estamos aqui para compartilhar experiências, aprender uns com os outros e construir conexões significativas que nos ajudem a crescer como indivíduos e como comunidade.
        </p>
    </div>
  )
}

export default About