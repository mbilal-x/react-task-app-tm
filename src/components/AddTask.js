import React, { useState } from 'react'

function AddTask({ onAdd }) {

  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

    if(!text) {
      alert('Please add a text')
      return
    }

    // random id for non server object
    // const id = Math.floor(Math.random() * 10000) + 1

    onAdd({ text, time, reminder})

    setText('')
    setTime('')
    setReminder(false)
  }

  return (
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Task</label>
          <input type="text" value={text} placeholder='Add Task' onChange={(e)=>(setText(e.target.value))}/>
        </div>
        <div className='form-control'>
          <label>Day & Time</label>
          <input type="text" value={time} placeholder='Add Day & Time' onChange={(e)=> setTime(e.target.value)}/>
        </div>
        <div className='form-control form-control-check'>
          <label>Reminder</label>
          <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input type="submit" value="Save Task" className='btn btn-block'/>
      </form>
  )
}

export default AddTask
