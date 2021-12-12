const Tasks = ({ tasks, deleteTask, onToggle }) => {
    return(
    <>
        {tasks.map((task) => 
            <div className={`task ${task.reminder ? 'reminder' : ''}`} key={task.id} onDoubleClick={() => onToggle(task.id)}>
                <li>
                    {task.name} <input type="button" value="X" onClick={() => {deleteTask(task.id)}}  />
                    <br />
                    {task.date}
                    
                </li>
            </div>
        )}
    </>
    )
}

export default Tasks