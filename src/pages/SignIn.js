import {Card, Row, Col, Form,Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Apis, { endpoints } from "../configs/Apis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";


export default function SignIn(){

    const [usernamein, setUsernamein]= useState()
    const [passwordin, setPasswordin] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [flag, setFlag] = useState()


    const login = async (event) =>{
        event.preventDefault()
        
        try{
            let userload ={
                client_id: "lWrqmTlPSvy9z5QYqGtaqyEW4kSYywLzOPW6cPBs",
                client_secret: "0okLZjq23EMlH9o0BicaPsPqFl6Wpvyds9XuRs30JkWJ52psVbLctj2txueigIl0kFBVWL4CA8cDgl6abVkweaAJJvWG79EDb8r0AniZTX4bE9rnKMyZ2ExSo4SmX8tx",
                username: usernamein,
                password: passwordin,
                grant_type: "password"
            }
            // console.log(userload)
            let res = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8000/o/token/',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(userload)
            })
            
            // console.log(res.data)
            cookies.save("access_token", res.data.access_token)
            let user = await Apis.get(endpoints['current-user'],{
                headers:{
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
            })
            // console.log(user.data)
            cookies.save("user", user.data)
            // console.log(cookies.load("access_token"))
            dispatch({
                "type":"USER_LOGIN",
                "payload": user.data
            })
            

            navigate("/")
            setFlag(true)
        }catch(err){
            setFlag(false)
            console.error(err)
        }
    }
    // console.log(passwordin)
    // console.log(usernamein)

    return(
        <>
            <div className="justify-content-md-center">
                <Card className="search-card">
                    <Card.Body>
                        <h2 style={{textTransform:"uppercase", fontWeight:"bold"}}>Đăng nhập</h2>
                        <Form onSubmit={login}>
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Tên đăng nhập..." 
                                value={usernamein}
                                onChange={(event) => setUsernamein(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Mật khẩu..." 
                                value={passwordin}
                                onChange={(event) => setPasswordin(event.target.value)}
                                />                                
                            </Form.Group>
                            {flag === false &&
                                <p style={{color:"red"}}> *Tên đăng nhập hoặc mật khẩu không chính xác</p>
                            }
                            
                            <Form.Group style={{marginBottom: "1.5rem"}}>
                                Chưa có tài khoản? <Link to={"/sign-up"}>Đăng ký tại đây</Link>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <button 
                                className="btn btn-secondary btn-lg" 
                                style={{background:"linear-gradient(90deg, rgb(119, 199, 253) 0%, rgb(26, 23, 23) 100%)"}} 
                                variant="secondary" 
                                size="lg"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}