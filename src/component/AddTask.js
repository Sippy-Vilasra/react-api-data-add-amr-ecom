import React, { useState } from 'react'
import Swal from 'sweetalert2';

const AddTask = ({ onSave }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if (!text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task and date or close the form!'
            })
        } else if (!text && day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your task!'
            })
        } else if (text && !day) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fill in your date!'
            })
        } else {
            onSave({ text, day });
        }
        setText('');
        setDay('');
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='from-control'>
                <label>Task</label>
                <input type="text" placeholder='add task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='from-control'>
                <label>Day & Time</label>
                <input type="text" placeholder='add day & time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <input type="submit" className='btn btn-block' value='Save task' />
        </form>
    )
}

export default AddTask