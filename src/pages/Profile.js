import {Card, Row, Col, Form,Button,Table, FormControl, Modal} from "react-bootstrap";
import account from '../icon/account.svg'
import { useSelector } from "react-redux"
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import cookies from "react-cookies"
import TicketDetail from "../layouts/TicketDetail";


export default function Profile(){

    const user = useSelector(state => state.user.user)
    const [tickets, setTickets] = useState([])

    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const [pass, setPass] = useState('')
    const [validationMsg, setValidationMsg] = useState('')

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPassModal, setShowPassModal] = useState(false);

    const passModalClose = () => setShowPassModal(false);
    const passModalShow = () => setShowPassModal(true);

    const [flag, setFlag] =useState(1)

    const profileRow ={
        boxShadow:"rgb(140 140 140) 4px 4px 20px 1px",
        padding: "15px",
        borderRadius:"16px",
        border:"3px solid #1e69af",
        margin: " auto",
        marginTop:"3rem",
    }
    const ticketRow ={
        boxShadow:"rgb(140 140 140) 4px 4px 20px 1px",
        padding: "15px",
        borderRadius:"16px",
        border:"3px solid #1e69af",
        margin: " auto",
        marginTop:"3rem",
        overflowY:"scroll",
        maxHeight:"65vh"
    }
    const pStyle ={
        marginLeft:"1rem"
    }

    const validateAll = () => {
        const mgs = {}
        if(email == '')
        {
            mgs.email = "*Nhập địa chỉ email"
        }
        if(address == '')
        {
            mgs.address = "*Nhập địa chỉ"
        }
        if(phone == '')
        {
            mgs.phone = "*Nhập số điện thoại"
        }
        setValidationMsg(mgs)

        if(Object.keys(mgs).length > 0) return false
        return true
    }

    const validatePass = () =>{
        const mgs ={}
        if(pass == '')
        {
            mgs.pass = "*Nhập mật khẩu mới"
        }
        setValidationMsg(mgs)

        if(Object.keys(mgs).length > 0) return false
        return true
    }

    const updateProfile = (event) =>{
        event.preventDefault()

        let updateUser = async () =>{
            const formData = new FormData()
            formData.append("new_email", email)
            formData.append("new_address", address)
            formData.append("new_number_phone", phone)

            let res = await Apis.post(endpoints["change-profile"], formData,{
                headers: {
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
            })
            console.log(res.data)
            setFlag(flag+1)
            handleClose()
            
        }
        
        const isValid = validateAll()

        if(isValid) updateUser()

    }

    const updatePassword = (event) =>{
        event.preventDefault()

        let changePass = async () =>{
            const formData = new FormData()
            formData.append("new_pass", pass)
            formData.append("confirm", pass)

            let res = await Apis.post(endpoints["change-pass"], formData,{
                headers: {
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
            })
            console.log(res.data)
            setFlag(flag+1)
            passModalClose()
            // navigate("/users/profile")
            
        }

        const isValid = validatePass()
        if(isValid) changePass()
    }
    // console.log(user)

    useEffect ( () =>{        

        let getUserTicket = async () => {
            try{
                let res = await Apis.get(endpoints["users-ticket"],{
                    headers:{
                        'Authorization': `Bearer ${cookies.load("access_token")}`
                    }
                })
                setTickets(res.data)  
            }catch(err){
                console.error(err)
            }
            
            // console.log(tickets)
        }
        getUserTicket()
    },[flag])

    return(
        <>
            <div style={{minHeight:"55vh"}}>
                <Row style={profileRow}>
                    <Col md={3} style={{minWidth:"300px"}}>
                        <Card className="profile-car" style={{ width: '100%' , margin:"0", boxShadow:"none", border:"3px solid rgb(210 225 239)", padding:"10px"}}>
                            {user.avatar != null ?(
                                <Card.Img variant="top" src={user.avatar} />
                            ):(
                                <Card.Img variant="top" src={account} />
                            )}
                            <Card.Body>
                                <div className="d-grid gap-2">
                                    <Button style={{backgroundColor:"rgb(30, 105, 175)"}} variant="primary">Chọn ảnh đại diện</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={7} style={{ margin:"0", boxShadow:"none", border:"3px solid rgb(210 225 239)", borderRadius:"0.25rem", padding:"0"}}>
                        <h2 style={{fontSize:"2rem", fontWeight:"bold", backgroundColor:"rgb(30, 105, 175)", color:"#fff", padding:"8px", borderRadius:"5px"}}>Thông tin cá nhân</h2>
                        <Row style={{marginTop:"2rem"}}>
                            <Col>
                                <p style={pStyle}>Username: </p>
                                <p style={pStyle}>Họ và tên đệm: </p>
                                <p style={pStyle}>Tên: </p>
                                <p style={pStyle}>Số điện thoại: </p>
                            </Col>
                            <Col>
                                <p>{user.username}</p>
                                <p>{user.last_name}</p>
                                <p>{user.first_name}</p>
                                <p>{user.number_phone}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <div className="d-grid gap-2">
                            <Button style={{backgroundColor:"rgb(30, 105, 175)"}} variant="primary" onClick={handleShow}>Chỉnh sửa</Button>
                            <Button style={{backgroundColor:"rgb(30, 105, 175)"}} variant="primary" onClick={passModalShow}>Đổi mật khẩu</Button>
                        </div>
                    </Col>
                </Row>
                
                <Row style={ticketRow}>
                    {tickets.length > 0 ? (
                        tickets.map(c=> 
                            <Col key={c.id} md={6} xs={12}>
                                <TicketDetail obj={c}/>
                            </Col>
                        )
                    ):(
                        <h2>Chưa đặt vé xe</h2>
                    )}
                    
                </Row>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={updateProfile}>
                    <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control 
                            type="text"
                            placeholder="Địa chỉ..." 
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            />
                            <p style={{color:"red"}}>{validationMsg.address}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>email</Form.Label>
                            <Form.Control 
                            type="email"
                            placeholder="Email..." 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            />
                            <p style={{color:"red"}}>{validationMsg.email}</p>
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
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng 
                    </Button>
                    <Button style={{backgroundColor:"rgb(30, 105, 175)"}} type="submit" variant="primary">
                        Lưu chỉnh sửa
                    </Button>
                    </Modal.Footer>
                </Form>
                
            </Modal>

            <Modal show={showPassModal} onHide={passModalClose}>
                <Form onSubmit={updatePassword}>
                    <Modal.Header closeButton>
                    <Modal.Title>Đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formPass">
                            <Form.Label>Mật khẩu mới</Form.Label>
                            <Form.Control 
                            type="password"
                            placeholder="Mật khẩu..." 
                            value={pass}
                            onChange={(event) => setPass(event.target.value)}
                            />
                            <p style={{color:"red"}}>{validationMsg.pass}</p>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={passModalClose}>
                        Đóng 
                    </Button>
                    <Button style={{backgroundColor:"rgb(30, 105, 175)"}} type="submit" variant="primary">
                        Lưu chỉnh sửa
                    </Button>
                    </Modal.Footer>
                </Form>
                
            </Modal>
        </>
    )
}