import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Header.css';

export default function Header() {
    const navigate = useNavigate();

    return <Fragment>
        <div className='header-container'>
            <button
                className='back-button'
                onClick={()=>{
                    navigate(-1);
                }}
            >
                &#60;
            </button>
            <button 
                className='header-button'
                onClick={()=>{
                    navigate('/');
                }}
            >
                Home
            </button>
        </div>
    </Fragment>
}