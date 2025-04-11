import { Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TaskList() {

  const [tasks, setTask] = useState([])

  const navigate = useNavigate()

  const loadTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    setTask(data);
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/task/${id}` , {
      method: 'DELETE'
    } )

    setTask( tasks.filter(task => task.id !== id))
  }

  useEffect( () => {
    loadTasks()
  }, [])

  return (
    <>
      <h1>Task List</h1>
      {tasks.map((task) => (
        <Card style={{ marginBottom: ".7rem", background: '#1e272e' }}  key={task.id}>
          <CardContent style={{
            display: "flex",
            justifyContent: "space-between"
          }} >
            
            <div style={{color: "white"}} >
              <Typography> {task.title} </Typography>
              <Typography> {task.description} </Typography>
            </div>

            <div>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => navigate(`/task/${task.id}/edit`)}
            >
              Edit
            </Button>

            <Button
              variant='contained'
              color='warning'
              style={{ marginLeft: ".5rem"}}
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
