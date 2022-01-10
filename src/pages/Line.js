import {Card, Row, Col, Form,Button,Table, FormControl} from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis";
import React, { useState, useEffect } from 'react';
import LineTable from "../layouts/LineTable"
import Search from "../layouts/Search";
import { useLocation } from "react-router-dom";

export default function Line(){
    const [lines, setLines] = useState([])
    const location = useLocation()

    useEffect(() => {
        const loadLines = async ()=>{
            try{
                let res = await Apis.get(`${endpoints['lines']}${location.search}`)
                setLines(res.data)
            }catch(err){
                console.error(err)
            }
        }
        loadLines()
    }, [location.search])

    console.log(lines)

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
                <h1 className="title-page" style={titleStyle}> Các tuyến xe </h1>
                <Search/>
                <Table striped bordered hover style={{width:"80%", margin:"0 auto",boxShadow:"0 6px 20px rgb(56 125 255 / 17%)"}}>
                    <thead style={{textAlign:"center"}}>
                        <tr>
                        <th>Điểm bắt đầu</th>
                        <th>Điểm Kết thúc</th>
                        <th>Giá vé</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lines.map(c=> <LineTable key={c.id} obj={c}/> )}
                    </tbody>
                </Table>
            </div>
            
        </>
    )
}