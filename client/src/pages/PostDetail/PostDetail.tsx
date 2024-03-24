import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import './PostDetail.scss'
import { MdDelete } from "react-icons/md"
import { MdModeEdit } from "react-icons/md"
import axios from "axios"
import { decodeToken, formatDate, getToken } from "../../utils/Global.ts"
import Comment from "../../components/Comment/Comment.tsx"

const PostDetail = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [post, setPost] = useState<any>({})
    const [posts, setPosts] = useState<any>([])
    const [isVisible, setIsVisible] = useState(false)
    
    const token = getToken()

    if (!token) {
        navigate('/login')
    }

    useEffect(() => {
        const fetchPost = async () => {
          try {

            const response = await axios.get(`http://localhost:3001/api/post`, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true
            })

            let post = response.data.filter(x => x.Id === Number(id))[0]
            
            let posts = response.data.filter(x => {
                if (x.Id === Number(id)) {
                    return false
                }

                return x.categories.split(',').map(cat => {
                    return post.categories.includes(cat)
                })
            })

            setPost(post)
            setPosts(posts)

            const decodedToken = decodeToken(token as string)
            
            if (post.userId === decodedToken.Id) {
                setIsVisible(true)
            }
            else {
                setIsVisible(false)
            }

          } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login')
            } else {
                console.error(error)
            }
          }
        }
    
        fetchPost()
    }, [id])

    const handleDeletePost = async () => {

        try {
            await axios.delete(`http://localhost:3001/api/post/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            navigate('/')
        } 
        catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login')
            } else {
                console.error(error)
            }
        }
    }

    return (
        <div className="detail-container">
            <div className="content">
                <div className="title">
                    <h1>{post.title}</h1>
                    <div className={isVisible ? "menu" : "menu-hidden"}>
                        <Link to={`/editor?post=${post.Id}`}>
                            <MdModeEdit />
                        </Link>
                        <MdDelete onClick={handleDeletePost}/>
                    </div>
                </div>
                <div className="author">
                    <span>Criado por {post.author}</span>
                    <span>Postado em {post.created_at && formatDate(post.created_at)}</span>
                </div>
                <div className="description">
                    <div dangerouslySetInnerHTML={{ __html: post && post.description }} />
                </div>
               <div className="categories">
                {post.categories && post.categories.split(',').map((category) =>
                    <Link to={`/?category=${category}`} className="category" >
                        <span>{category}</span>
                    </Link>
                )}
               </div>
            </div>
            <div className="recomendation">
                <h3>Recomendações</h3>
                <div className="posts">
                    {posts.slice(0, 4).map((post) =>
                        <Link to={`/post/${post.Id}`} className="detail-card">
                            <h4>{post.title}</h4>
                            <p dangerouslySetInnerHTML={{ __html: post && post.description.substring(0, 250) + '...' }} />
                        </Link>
                    )}
                </div>
            </div>
            <Comment key={id} postId={id} />
        </div>
    )
}

export default PostDetail