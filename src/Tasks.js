const Tasks = ({ tasks, deleteTask }) => {
    return(
    <>
        {tasks.map((task) => 
            <div key={task.id}>
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