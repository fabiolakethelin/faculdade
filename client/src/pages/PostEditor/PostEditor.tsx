import React, { useEffect, useState } from "react"
import './PostEditor.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { decodeToken, getToken, getUser } from "../../utils/Global.ts"

const PostEditor = () => {

    const navigate = useNavigate()

    const params = new URLSearchParams(window.location.search)
    const id = params.get('post')

    const [post, setPost] = useState<any>({})
    const [category, setCategory] = useState<any>([])
    const [loading, setLoading] = useState(false);

    const token = getToken()

    const perfil = getUser()

    if (!token) {
      navigate('/login')
    }

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const postResponse = await axios.get(`http://localhost:3001/api/post`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true
          })

          const categoryResponse = await axios.get(`http://localhost:3001/api/category`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true
          })

          if (id)
          {
            const post = postResponse.data.find(x => x.Id === Number(id))
            setPost(post)
            post.categories = ""
          }

          const category = categoryResponse.data.filter(x => x.name !== 'Página Inicial')
          
          setCategory(category)
        }
        catch (error) {
          if (error.response && error.response.status === 401) {
            navigate('/login')
          } else {
            console.error(error)
          }
        }
      }
  
      fetchPost()
  }, [id, navigate])

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target

    if (name === 'categories') {
        let updatedCategories = post.categories ?? ''

        if (checked && !updatedCategories.includes(value)) {
            updatedCategories += (updatedCategories ? ', ' : '') + value
        } else if (!checked) {
            updatedCategories = updatedCategories.split(', ').filter(category => category !== value).join(', ')
        }

        setPost(prevState => ({
            ...prevState,
            categories: updatedCategories
        }));
    } else {
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
  }

  const handleQuillChange = (value) => {
    setPost(prevState => ({
        ...prevState,
        description: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)

      if (id) {
        await axios.put(`http://localhost:3001/api/post/${id}`, post, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        })
  
        setTimeout(() => {
          navigate(`/post/${id}`)
        }, 1000)
      }
      else {
        const newPost = {
          ...post,
          created_at: new Date(),
          userId: decodeToken(token as string).Id,
          author: perfil ? decodeURIComponent(perfil[1]) : ''
        }

        const response = await axios.post(`http://localhost:3001/api/post`, newPost, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        })

        setTimeout(() => {
          navigate(`/post/${response.data.Id}`)
        }, 1000)
      }
    } 
    catch (error) {
      console.log(error)
    }
    finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  if (loading) {

    return (
      <div className="loading">
        <div className="loader"></div>
      </div>
    )
}

    return (
        <div className="editor-container">
            <div className="content">
                <input required type="text" name="title" placeholder="Título" value={post && post.title} onChange={handleInputChange}/>
                <ReactQuill theme="snow" value={post && post.description} onChange={handleQuillChange} className="editor" />
            </div>
            <div className="menu">
                <div className="categories">
                    <h3>Selecione ao menos uma categoria</h3>
                    {category && category.map((category) => (
                      <div className="category-input">
                        <input required type="checkbox" id={category.Id} name='categories' value={category.name} onChange={handleInputChange}/>
                        <label htmlFor={category.name}>{category.name}</label>
                      </div>
                    ))}
                </div>
                <button onClick={handleSubmit}>Publicar</button>
            </div>
        </div>
    )
}

export default PostEditor