import React, { useState  , useEffect} from 'react'
import axios from 'axios';
const App = () => {
  const [notes , setnotes ] = useState([])

  function fetchnotes() {
      axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
   setnotes(res.data.notes)
  })
  }
  useEffect(() => {
fetchnotes() 
  }, [])
 function handlesubmit(e) {
    e.preventDefault();
    const {title , discription }= e.target.elements
 axios.post('http://localhost:3000/api/notes' , {
  title : title.value , 
  discription : discription.value
  })
  .then(res =>{
    console.log(res.data)
    fetchnotes();
  })
  }
function handledelete(noteId) {
  axios
    .delete(`http://localhost:3000/api/notes/${noteId}`)
    .then(() => {
      fetchnotes(); // refresh notes after delete
    })
    .catch(err => {
      console.log(err);
    });
}

  return (
  <>
 <form className = "note-create-form" onSubmit = {handlesubmit}>
  <input name='title'type="text" placeholder ="Enter Title "/>
  <input name='discription'  type="text"  placeholder= "Enter Discription"/>
  <button>Create notes</button>
 </form>
 
 
  <div className="notes">
    {
      notes.map((note , id ) =>{
        return     <div className="note" key ={id}>
    <h1>{note.title}</h1>
    <p>{note.discription}</p>
<button onClick={() => handledelete(note._id)}>Delete</button>
</div>
      })
    }

  </div>
  </>
  )
}

export default App