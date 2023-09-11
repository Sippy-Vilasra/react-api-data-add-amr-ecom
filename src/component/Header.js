import React from 'react'
import Button from './Button';
import "../index.css";
const Header = ({ showFrom, changeTextAndColor }) => {

    return (
        <header className='header'>
            <h2 className='app-header'>Task Manager App</h2>
            <Button onClick={showFrom} color={changeTextAndColor ? "red" : "green"
            } text={changeTextAndColor ? 'Close' : 'Add'}></Button>
        </header>
    )
}

export default Header