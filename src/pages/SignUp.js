import {Card, Row, Col, Form,Button} from "react-bootstrap";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Apis, { endpoints } from "../configs/Apis";
import { useNavigate } from "react-router-dom";

export default function SignUp(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [checkbox, setCheckbox] = useState('')
    const avatar = useRef()
    const navigate = useNavigate();
    const [validationMsg, setValidationMsg] = useState('')
    // const [flag, setFlag] = useState()


    const validateAll = () => {
        const mgs = {}
        if(lastName == '')
        {
            mgs.lastName = "*Nhập họ và tên"
        }
        if(firstName == '')
        {
            mgs.firstName = "*Nhập tên"
        }
        if(username == '')
        {
            mgs.username = "*Nhập tên đăng nhập"
        }
        if(phone == '')
        {
            mgs.phone = "*Nhập số điện thoại"
        }
        if(password == '')
        {
            mgs.password = "*Nhập mật khẩu"
        }
        if(confirmPassword == '')
        {
            mgs.confirmPassword = "*Nhập mật khẩu xác thực"
        }else if (confirmPassword != password){
                mgs.confirmPassword = "*Nhập mật khẩu xác thực không đúng"
            }
        if(avatar.current.files[0] == null)
        {
            mgs.avatar = "*Chọn ảnh đại diện"
        }
        if(checkbox == '')
        {
            mgs.checkbox = "*"
        }

        setValidationMsg(mgs)

        if(Object.keys(mgs).length > 0) return false
        return true
    }


    const register = (event) =>{
        event.preventDefault()
        
        let registerUser = async () =>{
            const formData = new FormData()
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("number_phone", phone)
            formData.append("avatar", avatar.current.files[0])

            let res = await Apis.post(endpoints["register"], formData,{
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(res.data)
            navigate("/sign-in")
        }
        console.log(firstName, lastName, username, password, phone, avatar.current.files[0])

        const isValid = validateAll()

        if(!isValid) return
        registerUser()
    }
    
    return(
        <>
            <div className="justify-content-md-center">
                <Card className="search-card">
                    <Card.Body>
                        <h2 style={{textTransform:"uppercase", fontWeight:"bold"}}>Đăng ký</h2>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formLastName">
                                        <Form.Label>Họ và Tên đệm</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Họ và tên đệm..." 
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        />
                                        <p style={{color:"red"}}>{validationMsg.lastName}</p>                                      
                                    </Form.Group>
                                    
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Tên</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Tên..."
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)} 
                                        />
                                        <p style={{color:"red"}}>{validationMsg.firstName}</p>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="formUserName">
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control 
                                type="email" 
                                placeholder="Tên đăng nhập..." 
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                />
                                <p style={{color:"red"}}>{validationMsg.username}</p>
                            </Form.Group>
                            

                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control 
                                type="number"
                                placeholder="Số điện thoại..." 
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                />
                                <p style={{color:"red"}}>{validationMsg.phone}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Mật khẩu..." 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                />
                                <p style={{color:"red"}}>{validationMsg.password}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPasswordConfirm">
                                <Form.Label>Xác thực mật khẩu</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Xác thực mật khẩu..."
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)} 
                                />
                                <p style={{color:"red"}}>{validationMsg.confirmPassword}</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" ref={avatar}/>
                                <p style={{color:"red"}}>{validationMsg.avatar}</p>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCheckbox">
                                <Form.Check 
                                type="checkbox" 
                                label="Đồng ý với điều khoản sử dụng của chúng tôi "
                                // value={checkbox}
                                onChange={(event) => setCheckbox("checked")}
                                style={validationMsg.checkbox != null ? {color: "red"}: {}}
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <button onClick={register} className="btn btn-secondary btn-lg" style={{background:"linear-gradient(90deg, rgb(119, 199, 253) 0%, rgb(26, 23, 23) 100%)"}} variant="secondary" size="lg">
                                    Đăng ký
                                </button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}