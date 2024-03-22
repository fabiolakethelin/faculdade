import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Comment.scss'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { decodeToken, formatDate, getToken, getUser } from '../../utils/Global.ts'


const Comment = ({postId}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<any[]>([])
  const [hoveredRating, setHoveredRating] = useState(0)

  const navigate = useNavigate()

  const token = getToken()

  const perfil = getUser()

  if (!token) {
    navigate('/login')
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {

        const comments = await axios.get(`http://localhost:3001/api/comment/getByPostId/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true
        })
        
        setComments(comments.data)
      }
      catch (error) {
        console.error(error)
      }
    }

    fetchPost()
  }, [])

  const handleRatingChange = (newRating) => {
    setRating(newRating)
    setHoveredRating(0)
  }

  const handleMouseOver = (hoveredStar) => setHoveredRating(hoveredStar)

  const handleMouseLeave = () => setHoveredRating(0)

  const handleCommentChange = (value) => setComment(value)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const params = {
        description: comment.replace(/<p>/g, '').replace(/<\/p>/g, '\n'),
        created_at: new Date(),
        star_rating: rating,
        userId: decodeToken(token as string).Id,
        author: perfil ? decodeURIComponent(perfil[1]) : '',
        postId: postId,
      }

      await axios.post(`http://localhost:3001/api/comment/`, params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      })

      window.location.reload()
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="comment-container">
      <h4>Deixe seu comentário!</h4>
      <div>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={(star <= (hoveredRating || rating) ? 'filled' : 'empty')}
              onClick={() => handleRatingChange(star)}
              onMouseOver={() => handleMouseOver(star)}
              onMouseLeave={handleMouseLeave}
            >
              &#9733;
            </span>
          ))}
        </div>
        <div>
          <ReactQuill theme="snow" value={comment} onChange={handleCommentChange} className="react-quill" />
        </div>
        <button onClick={handleSubmit}>Enviar</button>
      </div>
      <div className='users-comment'>
        {comments && comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="info">
              <div className='author'>
                <span>{comment.author}</span>
                <div className="star">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span className={index < comment.star_rating ? 'star filled' : 'star'}>&#9733;</span>
                  ))}
                </div>
              </div>
              <span className="timestamp">{formatDate(comment.created_at)}</span>
            </div>
            <div className="description">{comment.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comment