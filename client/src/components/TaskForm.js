import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const [loading, setLoading] = useState(false)

  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (editing) {
      const response = await fetch(`http://localhost:5000/task/${params.id}`, {
        method: "PUT",
        headers:{
          "Content-Type":  "application/json",
        },
        body: JSON.stringify(task)
      })
      const data = await response.json()
    }else{
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {"Content-Type" : "application/json"}
      }) 
  
      const data = await res.json()
    }

    setLoading(false)
    navigate('/')    
  }

  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const loadTask = async(id) => {
    const response = await fetch (`http://localhost:5000/task/${id}`)
    const data = await response.json()
    setTask({title: data.title, description: data.description})    
    setEditing(true)
  }

  useEffect(() => {
    if (params.id) {
     loadTask(params.id)
    }
  }, [params.id])

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" >
      <Grid item xs={3} >
        <Card
          sx={{ mt: 5 }}
          style={{
            background: '#1e272e',
            padding: '1rem'
          }}
        >
          <Typography variant='5' textAlign='center' color='white' >
            {editing ? "Edit Task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit} >
              <TextField 
                variant='filled'
                label="Write your title"
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                name='title'
                value={task.title}
                onChange={handleChange}
                InputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
              />

              <TextField 
                variant='filled'
                label='Write your description'
                multiline
                rows={4}
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                name='description'
                value={task.description}
                onChange={handleChange}
                InputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
              />
              <Button 
                variant='contained' 
                type="submit"
                disabled={!task.title || !task.description}
                >
                {loading ? (
                  <CircularProgress  color='inherit' size={24} />
                ): ("Save")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
