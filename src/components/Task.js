import React from 'react'
import { FaTimes } from "react-icons/fa";


function Task({ task , onDel, onToggle}) {
    return (
        <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={()=> onToggle(task.id)}>
            <h3>{task.text}
                <FaTimes style={{
                    color: 'red',
                    cursor: 'pointer'
                }} onClick={()=> onDel(task.id)}/>
            </h3>
            <p>{task.time}</p>
        </div>
    )
}

export default Task
