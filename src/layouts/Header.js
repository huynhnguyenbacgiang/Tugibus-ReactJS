import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link  } from 'react-router-dom';
import {Button } from "react-bootstrap";
import { useSelector } from "react-redux"
import cookies from "react-cookies"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Header.css';

function Header() {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const [tripId, setTripId] = useState();
    const [lineId, setLineId] = useState();

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    
    const logout = (event) =>{
        event.preventDefault()
        cookies.remove("access_token")
        cookies.remove("user")
        dispatch({
            "type":"USER_LOGOUT",
            "payload": user.data
        })
        navigate("/")
    }
    // console.log(localStorage.getItem("tripId"))
    // console.log(localStorage.getItem("lineId"))
    useEffect(() => {
        showButton();
        // console.log(user)
        const loadTicket = async ()=>{}
        setTripId(localStorage.getItem("tripId"))
        setLineId(localStorage.getItem("lineId"))
        // console.log(tripId)
        // console.log(lineId)
    }, [tripId]);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TuGi
                        <FontAwesomeIcon icon={faBus}/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        {click ? <FontAwesomeIcon icon={faTimes}/>: <FontAwesomeIcon icon={faBars}/>}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Trang chủ
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/lines'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Tuyến xe
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to={`/trips/${tripId}/tickets/${lineId}`}
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Đặt vé
                            </Link>
                        </li>

                        <li>
                            {user != null ?(
                                <>
                                    <Link
                                        to='/users/profile'
                                        className='nav-links-mobile'
                                        onClick={closeMobileMenu}>                                
                                        {user.username}
                                    </Link>
                                    <Link
                                        to='/users/profile'
                                        className='nav-links-mobile'
                                        onClick={logout}>                                
                                        ĐĂNG XUẤT
                                    </Link>
                                </>
                                
                            ) : (
                               <Link
                                    to='/sign-in'
                                    className='nav-links-mobile'
                                    onClick={closeMobileMenu}>
                                    ĐĂNG NHẬP
                                </Link> 
                            )}                          
                        </li>
                    </ul>
                    {user != null ?(
                        <>
                            <Link className='header-nav-button-signup' to="/users/profile">
                                <Button variant='outline-light' size='lg' > {user.username} </Button>
                            </Link>
                            <div className='header-nav-button-signup' style={{marginLeft:"5px"}}>
                                <Button variant='outline-light' size='lg' onClick={logout} > ĐĂNG XUẤT </Button>
                            </div>
                        </>
                        
                    ):(
                        <Link className='header-nav-button-signup' to="/sign-in">
                            <Button variant='outline-light' size='lg' > ĐĂNG NHẬP </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Header;