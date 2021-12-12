import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Tasks from './Tasks';

const TaskContainer = () => {

    const [tasks, setTasks] = useState([])
    const [toggleForm, setToggleForm] = useState(false)

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer =  await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                },
            body: JSON.stringify(task),
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}` , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) => 
                task.id === id ? {...task, reminder: !data.reminder } : task
            )
        )
    }


    return(
        <>
            <h1>My Tasks</h1>
            <input type="button" onClick={() => setToggleForm(!toggleForm)} value={toggleForm ? "close form" : "add task"} />
            {toggleForm && <TaskForm addTask={addTask} /> }
            {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} onToggle={toggleReminder}/> : "No Tasks" }
        </>
    )
}

export default TaskContainer