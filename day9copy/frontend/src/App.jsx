import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setnotes] = useState([])

  function fetchnote() {
    axios.get('http://localhost:2000/api/notes')
      .then((res) => {
        setnotes(res.data.notes) // IMPORTANT
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchnote()
  }, [])
function handleSubmit(e){
 e.preventDefault();
   const {title , discription }= e.target.elements
   axios.post('http://localhost:2000/api/notes' , {
    title :title.value ,
    discription : discription.value
   }).then((res)=>{
    console.log(res.body);
    fetchnote()
   })

}
function handleDelete(id) {
  axios.delete(`http://localhost:2000/api/notes/${id}`)
  .then(()=>{
fetchnote()
  })
  .catch(err =>{
    console.log(err)
  })
}
  return (
    <>
      <div className='main'>
        <form className='note-create-form' onSubmit={handleSubmit}>
          <input name='title' type='text' placeholder='Enter the title' />
          <input name='discription' type='text' placeholder='Enter the description' />
          <button>Create form</button>
        </form>

        <div className='notes'>
          {notes.map(note => (
            <div className='note' key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.discription}</p>
              <button onClick={() => handleDelete(note._id)}>Delete Note</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
