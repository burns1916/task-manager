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

    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: "POST",
            headers: {
                "Content=Type": "application/json"
                },
            body: JSON.stringify(task)
        })

        const data = res.json()

        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE"
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }


    return(
        <>
            <h1>My Tasks</h1>
            <input type="button" onClick={() => setToggleForm(!toggleForm)} value={toggleForm ? "close form" : "add task"} />
            {toggleForm && <TaskForm addTask={addTask} /> }
            {tasks ? <Tasks tasks={tasks} deleteTask={deleteTask} /> : "" }
        </>
    )
}

export default TaskContainer