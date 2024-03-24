import React, { useEffect, useState } from "react"
import './Home.scss'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IoMdSearch } from 'react-icons/io'
import axios from "axios"
import { getToken } from '../../utils/Global.ts'

const Home = () => {
    const [posts, setPosts] = useState<any[]>([])
    const [category, setCategory] = useState<any[]>([])
    const [title, setTitle] = useState("Página Inicial")
    const [searchTerm, setSearchTerm] = useState('')
    
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = getToken()

                if (!token) {
                    navigate('/login')
                    return
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

                let filteredPosts = postResponse.data
                if (categoria !== 'Página Inicial') {
                    filteredPosts = filteredPosts.filter(x => x.categories.includes(categoria))
                }
                if (searchTerm) {
                    filteredPosts = filteredPosts.filter(post =>
                        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                }

                setPosts(filteredPosts)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login')
                } else {
                    console.error(error)
                }
            }
        }

        fetchPosts()
    }, [location.search, searchTerm, navigate])

    const handleSearchChange = (e) => setSearchTerm(e.target.value)

    return (
        <div className="home">
            <h1>{title}</h1>
            <div className="container">
                <div className="posts">
                    {posts.map((post) => 
                        <div className="detail" key={post.id}>
                            <Link to={`post/${post.Id}`}>
                                <div className="content">
                                    <h2>{post.title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: post && post.description.substring(0, 350) + '...' }} />
                                </div>
                                <div className="info">
                                    <div className="category">
                                        {post.categories.split(',').map((category) => 
                                            <Link to={`/?category=${category}`} className="category" key={category}>
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
                        <input type="text" placeholder="Buscar por palavra chave" value={searchTerm} onChange={handleSearchChange} />
                        <IoMdSearch />
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
