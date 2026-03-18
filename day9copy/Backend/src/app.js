const express = require('express')
const app = express()
const noteModel = require('./models/notes.model')
const cors = require('cors')

app.use(cors())
app.use(express.json())

// CREATE
app.post('/api/notes', async (req, res) => {
  try {
    const { title, discription } = req.body

    const note = await noteModel.create({
      title,
      discription
    })

    res.status(201).json({
      message: "Note created successfully",
      note
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

// READ
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await noteModel.find()
    res.status(200).json({
      message: "Notes fetched successfully",
      notes
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// UPDATE
app.patch('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { discription } = req.body

    await noteModel.findByIdAndUpdate(id, { discription })

    res.status(200).json({
      message: "Note updated successfully"
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
      message: "Note deleted successfully"
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = app
