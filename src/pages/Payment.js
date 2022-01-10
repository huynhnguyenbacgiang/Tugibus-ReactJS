import React, { useEffect, useRef, useState } from "react";
import {Card, Row, Col, Form,Button,Table, FormControl, Modal} from "react-bootstrap";
import Paypal from "../layouts/Paypal";
import { useParams } from 'react-router-dom'
import cookies from "react-cookies";
import Apis, { endpoints } from "../configs/Apis";

export default function Payment(){

    const {tripId} = useParams()
    const {seatId} = useParams()
    const {price} = useParams()

    const CADPrice = (Number(price) /18000).toFixed(2)

    // useEffect(()=>{
    //     let getTicketDetail = async () => {
    //         try{
    //             let res = await Apis.get(endpoints["ticket-detail"](ticketId),{
    //                 headers:{
    //                     'Authorization': `Bearer ${cookies.load("access_token")}`
    //                 }
    //             })
    //             setPrice(res.data.current_price) 
    //         }catch(err){
    //             console.error(err)
    //         }
    //     }
    //     getTicketDetail()
    // },[])
    console.log(price)
    return(
        <>
            <div style={{minHeight:"54vh"}}>
                <Paypal val={CADPrice} trip={tripId} seat={seatId}/>
            </div>
            
        </>
    )
}