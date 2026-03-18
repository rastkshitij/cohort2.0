import React  ,  {useState , useRef}from 'react'
import "../styles/createpost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router-dom'
const Createpost = () => {
  const [caption, setcaption] = useState("")
  const postImageFieldRef =  useRef(null)
  const {loading , handlecreatepost} =  usePost()

  const navigate =  useNavigate()

 async function handlesubmit (e){
    e.preventDefault()
    const file = postImageFieldRef.current.files[ 0 ]
    await handlecreatepost(file , caption)
    navigate('/')
  }
if(loading){
  return (
    <main>
      <h1>Creating post...</h1>
    </main>
  )
}

  return (
   <main className='create-post-page'>
    <div className="form-conatiner">
      <h1>Create Post</h1>
      <form onSubmit={handlesubmit}>
        <label className='post-image-label' htmlFor='postImage'>Select Image</label>
        <input ref={postImageFieldRef} hidden type="file" name='postImage'  id="postImage" />
        <input  value={caption}
        onChange={(e)=>{
          setcaption(e.target.value)
        }}
        type='text'  name='caption' id='caption'placeholder='Enter Caption' />
        <button className='button primary-button' >Create Post Button</button>
      </form>
    </div>

   </main>
  )
}

export default Createpost