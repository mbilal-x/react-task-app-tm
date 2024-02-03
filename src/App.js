import './App.css';
import Header from './components/Header';
import Tasks from './/components/Tasks';
import AddTask from './/components/AddTask';
import { useEffect, useState } from 'react';



function App() {

  const [showAddTask , setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // getting the data into state 
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      console.log(tasksFromServer)
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [] )
  
  // fetching tasks sss
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }
  
// add task funtionality
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST", 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)

    })
     const data = await res.json()
    setTasks([...tasks, data])
  }

// delete task functionality
const delTask = async (id) => {
  console.log("id =", id)
  // deleting without server 
  setTasks(tasks.filter((task => task.id !== id )))
  // deleting with server
  await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
}

// reminder task toggle
  const onToggle = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder:!taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task)=> 
        task.id === id ? {...task, reminder: data.reminder} : task
      ))
  }

  return (
    <div className="App container">
      <Header title="Task Tracker" onAdd={()=> setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask} />}
      <Tasks tasks={tasks} onDel={delTask} onToggle={onToggle}/>
      

      {/* _______________________________
      header component
        Appheading Addbutton
      addTask component
        form 
          inputs 
            title
            dat and time
            reminderCheckbox
          saveTaskButton
      Tasks component
        div of task
          heading
          time
          deleteIcon
      footer component 
        copyrights 
        about route
      */}
    </div>
  );
}

export default App;
