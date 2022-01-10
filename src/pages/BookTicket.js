import React, { useState , useContext, useEffect} from 'react'
import Apis, { endpoints } from "../configs/Apis";
import { useParams } from 'react-router-dom'
import {Card, Row, Col, Form,Button,Table, FormControl} from "react-bootstrap";
import seatimg from '../icon/account.svg'
import "./BookTicket.css"
import cookies from "react-cookies";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


export default function BookTicket(){

    const user = useSelector(state => state.user.user)
    const {tripId} = useParams()
    const {lineId} = useParams()
    const[seatSelected, setSeatSelected] = useState("")
    const[tickets, setTickets] = useState(null)
    const[trip, setTrip] = useState({})
    const[line, setLine] = useState({})
    const[spoint, setSpoint] = useState("")
    const[epoint, setEpoint] = useState("")
    const navigate = useNavigate();
    const[flag, setFlag] = useState(1)
    // const groups = user.groups
    
    const totalPrice = Number(trip.extra_changes) + Number(line.price)

    const changeSeatSelected=(id)=>{
        setSeatSelected(id)
    }
    useEffect(() => {
        const loadTicket = async ()=>{
            try{
                let res = await Apis.get(endpoints['tickets'](tripId))
                setTickets(res.data)
            }catch(err){
                console.error(err)
            }
        }
        const loadTrip = async ()=>{
            try{
                let res = await Apis.get(`${endpoints['trips']}${tripId}/`)
                setTrip(res.data)
            }catch(err){
                console.error(err)
            }
        }
        const loadLine = async ()=>{
            try{
                let res = await Apis.get(endpoints['line'](lineId))
                setLine(res.data)  
                setSpoint(res.data.start_point) 
                setEpoint(res.data.end_point) 
            }catch(err){
                console.error(err)
            }
        }
        loadLine()
        loadTrip() 
        loadTicket() 
        localStorage.setItem("tripId",tripId)
        localStorage.setItem("lineId",lineId)
    },[flag])

    // console.log(groups.length)
    
    const sellTicket = (event) =>{
        event.preventDefault()
        
        let sellSeatTicket = async() =>{
            const formData = new FormData()
            formData.append("seat_position", seatSelected)
            
            let res = await Apis.post(endpoints['sell-ticket'](tripId),formData,{
                headers: {
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
                })
                console.log(res.data)
        }
        sellSeatTicket()
        setFlag(flag+1)
    }
    const bookTicket = (event) =>{
        event.preventDefault()

        navigate(`/payment/${tripId}/seat/${seatSelected}/price/${totalPrice}`)
    }
    
    return(
        <>  
            {tickets == null?(
                <div style={{minHeight:"55vh"}}>
                    <div role="alert" className='fade alert alert-danger show'>
                        <h1>Chưa có vé</h1>
                        <p>Yêu cầu chọn tuyến và chuyến xe</p>
                    </div>
                    
                </div>
            ):(
                <div style={{minHeight:"55vh"}}>
                    <h1 className="title-page"> Đặt vé xe </h1>
                    <Row style={{maxWidth: "900px", margin: " auto"}}>
                        <Col sm={4} className="book-ticket-col" style={{minWidth:"300px"}}>
                            <p className="book-ticket-text red"> {line.name}</p>
                            <p className="book-ticket-text"> Khởi hành : {spoint.address}</p>
                            <p className="book-ticket-text" > Điểm đến : {epoint.address}</p>
                            <p className="book-ticket-text" >Số ghế : {seatSelected}</p>
                            <p className="book-ticket-text" >Tổng tiền vé</p>
                            <p className="book-ticket-text red">{totalPrice}</p>
                            <img alt="d" className="bus-img" src="/images/xe-nha-1.png"  style={{width:"240px", marginTop:"15px"}}/>
                        </Col>
                        <Col md="auto"></Col>
                        <Col sm={7} className="book-ticket-col" style={{minWidth:"525px"}}>
                            <p className="book-ticket-text red">Sơ đồ ghế</p>
                            <Row style={{padding:"36px", overflowY:"scroll", maxHeight:"75vh"}}>
                                {Object.keys(tickets).map(i => 
                                    <Col key={i} md={3} xs={12}>
                                        <button className={tickets[i] === "blank" ? 'empty-seat' : 'booked-seat'} onClick={() => { changeSeatSelected(i) }}>
                                            <img style={{width:"70px"}} src={seatimg} />
                                            <p style={{margin:"0"}}>{i}</p>
                                        </button>
                                    </Col>
                                    )}
                            </Row>
                        </Col>
                    </Row>
                    <div className={seatSelected ==="" ? "book-form-hide":"book-ticket-col"} style={{maxWidth: "750px", margin:"3em auto", textAlign:"left"}}>
                         
                        {user == null?(
                            <div style={{textAlign:"center"}}>
                                <p className="book-ticket-text red">Đăng nhập để đặt vé</p>
                            </div>
                        ):(
                            <>
                                    <div style={{textAlign:"center"}}>
                                        <p className="book-ticket-text red">Thông tin vé</p>
                                    </div>
                                    
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formTripName">
                                            <Form.Label>Chuyến</Form.Label>
                                            <Form.Control type="text" readOnly="readOnly" value={trip.name}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formTripPrice">
                                            <Form.Label>Tiền vé</Form.Label>
                                            <Form.Control type="text" readOnly="readOnly" value={totalPrice}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formTripSeat">
                                            <Form.Label>Vị trí ghế</Form.Label>
                                            <Form.Control type="text" readOnly="readOnly" value={seatSelected}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formUserName">
                                            <Form.Label>Họ và tên</Form.Label>
                                            <Form.Control type="text" readOnly="readOnly" value={user.first_name +" "+ user.last_name}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formUserPhone">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <Form.Control type="text" readOnly="readOnly" value={user.number_phone}/>
                                        </Form.Group>
                                        <div className="d-grid gap-2">
                                            <button 
                                            className="btn btn-secondary btn-lg" 
                                            style={{background:"linear-gradient(90deg, rgb(119, 199, 253) 0%, rgb(26, 23, 23) 100%)"}} 
                                            variant="secondary" 
                                            size="lg"
                                            onClick={bookTicket}
                                            >
                                                Mua vé
                                            </button>
                                        </div>
                                    </Form>
                                </>
                        )}
                    </div>
                </div>
            )
            }
        </>
    )
}