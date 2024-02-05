import './App.css';
import Header from './components/Header';
import Tasks from './/components/Tasks';
import AddTask from './/components/AddTask';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer';
import About from './components/About';



function App() {

  const [showAddTask , setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // getting the data into state 
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      // console.log(tasksFromServer)
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
    <Router>
      <div className="App container">
      <Header title="Task Tracker" onAdd={()=> setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      
      <Routes>
        
      <Route path='/'
      exact
      element={(
        <>
        {showAddTask && <AddTask onAdd={addTask} />}
        <Tasks tasks={tasks} onDel={delTask} onToggle={onToggle}/>
        </>
      )}
      />
      <Route path='/about' Component={About} />
      </Routes>

      <Footer />
    </div>
    </Router>
  );
}

export default App;


