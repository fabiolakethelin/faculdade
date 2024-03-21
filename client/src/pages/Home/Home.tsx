import React, { useEffect, useState } from "react"
import './Home.scss'
import { Link, useLocation, useNavigate } from "react-router-dom"
import {IoMdSearch} from 'react-icons/io';
import axios from "axios";

const Home = () => {

    const [posts, setPosts] = useState<any>([])
    const [category, setCategory] = useState<any>([])
    const [title, setTitle] = useState("Página Inicial")
    
    const location = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1]

            if (!token) {
                navigate('/login')
            }

            const postResponse = await axios.get('http://localhost:3001/api/post', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true
            })

            const categoriesResponse = await axios.get('http://localhost:3001/api/category', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true
            })

            const params = new URLSearchParams(location.search)
            const categoria = params.get('category') ?? "Página Inicial"
            setTitle(`${categoria}`)
            setCategory(categoriesResponse.data)

            if (categoria !== 'Página Inicial') {
                postResponse.data = postResponse.data.filter(x => x.categories.includes(categoria))
            }

            setPosts(postResponse.data)
          } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login')
            } else {
                console.error(error)
            }
          }
        }
    
        fetchPosts()
      }, [location.search])

    return (
        <div className="home">
            <h1>{title}</h1>
            <div className="container">
                <div className="posts">
                    {posts.map((post) => 
                        <div className="detail">
                            <Link to={`post/${post.Id}`}>
                                <div className="content">
                                    <h2>{post.title}</h2>
                                    <p>{post.description.substring(0, 350) + '...'}</p>
                                </div>
                                <div className="info">
                                    <div className="category">
                                        {post.categories.split(',').map((category) => 
                                            <Link to={`/?category=${category}`} className="category">
                                                <span>{category}</span>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="author">
                                        <span>Autor: {post.author}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="filter">
                    <div className="search-input">
                        <input type="text" placeholder="Buscar por palavra chave"></input>
                        <IoMdSearch/>
                    </div>
                    <ul>
                        <h3>Categorias</h3>
                        {category.map((categoria, index) => (
                            <li key={index}>
                                <Link to={`/?category=${categoria.name}`}>{categoria.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Home