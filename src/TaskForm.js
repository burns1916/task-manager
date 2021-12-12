import { useState } from 'react';

const TaskForm = ({ addTask }) => {

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        if(!name || !date) {
            alert("Please set task and date")
        } else {
            addTask({ name, date, reminder })
        }
        setName("")
        setDate("")
        setReminder(false)
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Task: </label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label htmlFor="date">Date: </label>
                <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <br />
            <label htmlFor="reminder">Reminder: </label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default TaskForm