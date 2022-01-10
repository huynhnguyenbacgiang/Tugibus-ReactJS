import {Card, Row, Col, Form,Button} from "react-bootstrap";
import "./Search.css"
import Apis, { endpoints } from "../configs/Apis";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Search() {

    const [points, setPoints] = useState([])
    const [startPoint, setStartPoint]= useState("")
    const [endPoint, setEndPoint]= useState("")
    const navigate = useNavigate();
    console.log(startPoint)
    useEffect(() => {
        const loadPoint = async ()=>{
            let res = await Apis.get(endpoints['points'])
            setPoints(res.data)
        }
        loadPoint()
    },[])

    const search = (event) => {
        event.preventDefault()
        navigate(`/lines/?start_point=${startPoint}&end_point=${endPoint}`)
    }

    return (
        <Card className="search-card">
            <Card.Body>
                <Row>
                    <Form className="search-form" style={{display:"flex"}}>
                        <Col>
                            <Form.Group className="search-form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{fontWeight:"bold", color:"rgb(98 121 142)", marginBottom:"1.5rem"}}>Chọn điểm bắt đầu</Form.Label>
                                <Form.Select value={startPoint} onChange={(event)=> setStartPoint(event.target.value)} aria-label="Default select example">
                                    <option value={""}></option>
                                    {points.map(c => <option key={c.id} value={c.id}>{c.address}</option>)} 
                                </Form.Select>
                            </Form.Group> 
                        </Col>
                        <Col>
                            <Form.Group className="search-form-group" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{fontWeight:"bold", color:"rgb(98 121 142)", marginBottom:"1.5rem"}}>Chọn điểm kết thúc</Form.Label>
                                <Form.Select value={endPoint} onChange={(event)=> setEndPoint(event.target.value)} aria-label="Default select example">
                                    <option value={""}></option>
                                    {points.map(c => <option key={c.id} value={c.id}>{c.address}</option>)} 
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <button type="button" onClick={search} className="btn btn-primary btn-lg search-form-button" size="lg">
                            Tìm kiếm
                        </button>
                    </Form>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Search
