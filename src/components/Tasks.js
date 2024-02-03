import React from 'react'
import Task from './Task'

function Tasks({tasks, onDel, onToggle}) {
  return (
    <div>
      {tasks.map((task)=> (
        <Task key={task.id} task={task} onDel={onDel} onToggle={onToggle}/>
        ))}
    </div>
  )
}

export default Tasks
