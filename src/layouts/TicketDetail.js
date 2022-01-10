import { Link } from 'react-router-dom';
import {Card, Row, Col, Form,Button,Table, FormControl, Modal} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Apis, { endpoints } from '../configs/Apis';
import cookies from "react-cookies"
import './TicketDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

export default function TicketDetail(props){
    const [detail, setDetail] = useState([])

    const [content, setContent] = useState('')

    const [show, setShow] = useState(false);

    const [flag, setFlag] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadDetail = async ()=>{
            let res = await Apis.get(endpoints["ticket-detail"](props.obj.id),{
                headers:{
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
            })
            setDetail(res.data)
        }
        const loadFeedback = async ()=>{
            let res = await Apis.get(endpoints["get-feedback"](props.obj.trip.id),{
                headers:{
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
            })
            // console.log(res.data)
        }
        loadDetail()
        // loadFeedback()
        
    },[])
    // console.log(props.obj.trip.id)

    const sendFeedback = (event) =>{
        event.preventDefault()

        let postFeedback = async () =>{
            const formData = new FormData()
            formData.append("content", content)

            let res = await Apis.post(endpoints["feedback"](props.obj.id), formData,{
                headers: {
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
            })
            // console.log(res.data)
            handleClose()
            if(res.data !== null) setFlag(false)
        }

        postFeedback()
    }

    // console.log(detail)
    // console.log(props.obj)


    return(
        <>
            <Card style={{marginTop:"10px"}}>
                <Card.Body style={{border:"3px solid rgb(210, 225, 239)", padding:"0 12px 0 0"}}>
                    <Row>
                        <Col md={3} style={{textAlign:"center", borderRight:"3px dotted rgb(210, 225, 239)", position:"relative"}}>
                            <span style={{fontWeight:"bold", position:"absolute", left:"38%", top:"30%"}}>
                                GHẾ
                            </span>
                            <h2 style={{marginBottom:"0", fontSize:"3rem", color:"rgb(30, 105, 175)", position:"absolute", left:"32%", top:"42%"}}>
                                {detail.seat_position}
                            </h2>
                        </Col>
                        <Col md={7}>
                            <div style={{marginLeft:"10px", textAlign:"left", marginTop:"5px"}}>
                                <span style={{fontWeight:"bold"}}>
                                    MÃ VÉ:  {props.obj.id}
                                </span>
                                <p style={{fontSize:"1.5rem",textTransform:"uppercase", fontWeight:"bold"}}>{props.obj.customer.first_name} {props.obj.customer.last_name}</p>
                                <span style={{fontWeight:"bold"}}>
                                    <FontAwesomeIcon icon={faClock}/> KHỞI HÀNH:  {props.obj.trip.start_time}
                                </span>
                                <p style={{fontWeight:"bold"}}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt}/> {props.obj.trip.line.name}
                                </p>
                                <p style={{fontWeight:"bold"}}>
                                    <FontAwesomeIcon icon={faMoneyBillWave}/> GIÁ VÉ: {detail.current_price}
                                </p>
                                {flag === false?(
                                    <Button style={{backgroundColor:"green", marginBottom:"5px"}} disabled>
                                        Đã phản hồi
                                    </Button>
                                ):(
                                    <Button style={{backgroundColor:"rgb(30, 105, 175)", marginBottom:"5px"}} onClick={handleShow}>
                                        Viết phản hồi
                                    </Button>
                                )}
                                
                                

                            </div>
                            
                        </Col>
                        <Col md={2} style={{backgroundColor:"rgb(30, 105, 175)", textAlign:"center"}}>
                            <p style={{writingMode:"vertical-lr", fontSize:"3rem", textOrientation:"mixed", color:"#fff", margin:"0"}}>
                                TUGI TUGI
                            </p>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Form >
                    <Modal.Header closeButton>
                    <Modal.Title>Viết phản hồi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Control
                            as="textarea"
                            placeholder="Viết phản hồi..."
                            style={{ height: '100px' }}
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng 
                    </Button>
                    <Button style={{backgroundColor:"rgb(30, 105, 175)"}} type="submit" variant="primary" onClick={sendFeedback}>
                        Lưu chỉnh sửa
                    </Button>
                    </Modal.Footer>
                </Form>
                
            </Modal>
        </>
        
    )
}