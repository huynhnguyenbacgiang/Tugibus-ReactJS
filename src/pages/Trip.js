import {Card, Row, Col, Form,Button,Table, FormControl} from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import React, { useState, useEffect } from 'react';
import LineTable from "../layouts/LineTable"
import Search from "../layouts/Search";
import { useLocation } from "react-router-dom";
import TripTable from "../layouts/TripTable";

export default function Trip(){
    const [trips, setTrips] = useState([])
    const location = useLocation()
    useEffect(() => {
        const loadTrips = async ()=>{
            try{
                let res = await Apis.get(`${endpoints['trips']}${location.search}`)
                setTrips(res.data)
                
            }catch(err){
                console.error(err)
            }
        }
        loadTrips()
    }, [location.search])

    const titleStyle ={
        fontWeight: "900",
        fontSize: "min(5vw, 50px)",
        textAlign: "center",
        color: "rgb(30, 105, 175)",
        whiteSpace: "nowrap",
        maxWidth: "100vw",
        textTransform: "uppercase",
        margin: "2rem 0px",
    }

    return (
        <>
            <div style={{minHeight:"55vh"}}>
                <h1 className="title-page" style={titleStyle}> Các chuyến xe </h1>
                <Table striped bordered hover style={{width:"80%", margin:"0 auto",boxShadow:"0 6px 20px rgb(56 125 255 / 17%)"}}>
                    <thead style={{textAlign:"center"}}>
                        <tr>
                        <th>Chuyến xe</th>
                        <th>Thời gian khởi hành</th>
                        <th>Thời gian đến(dự kiến)</th>
                        <th>Giá vé</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map(c=> <TripTable key={c.id} obj={c} /> )}
                    </tbody>
                </Table>
                
            </div>
            
        </>
    )
}