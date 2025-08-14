import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PostForm.css'
const PostForm = () => {

  const API = import.meta.env.VITE_API_URL

  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const fetchPosts = async () => {
    try {

      const res = await axios.get(`${API}/api/posts`)
      const data = Array.isArray(res.data) ? res.data : res.data.posts ?? []
      // console.log(data)
      setPosts(data)
    } catch (error) {
      console.log(error, "불러오기 실패")
    }

  }


  useEffect(() => {
    fetchPosts()

  }, [])
  return (
    <div className='post-wrap'>
      <h2>Posts</h2>
      <div className="post-controls">
        <input type="text" placeholder='제목을 입력하세요' />
        <textarea placeholder='내용을 입력하세요' rows={3}></textarea>
        <div className="post-buttons">
          <button className="btn">등록</button>
          <button className="btn">새로고침</button>
        </div>
      </div>
      <ul className='post-list'>
        {posts.map((post) => (
          <li key={post._id}>
            <h4>
              {post.title}
            </h4>
            <p>
              {post.content}
            </p>
            <button className="update btn">수정</button>
            <button className="delete btn">수정</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostForm