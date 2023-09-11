import React from 'react'
import Task from './Task'
import "../index.css"

const Tasks = ({ tasks, deleteTask, onEdit }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={deleteTask} onEdit={onEdit} />))}
        </>
    )
}

export default Tasks