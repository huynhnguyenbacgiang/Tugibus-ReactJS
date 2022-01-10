import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import cookies from "react-cookies";

export default function Paypal(props){

    const paypal = useRef()
    const navigate = useNavigate();
    // const [price, setPrice] = useState(9.89)

    const paymentTicket = (event) => {
        event.preventDefault()

        let bookSeatTicket = async() =>{
            const formData = new FormData()
            formData.append("seat_position", props.seat)
            
            let res = await Apis.post(endpoints['book-ticket'](props.trip),formData,{
                headers: {
                    'Authorization': `Bearer ${cookies.load("access_token")}`
                }
                })
            console.log(res.data)
            navigate(`/users/profile`)
        }
        window.paypal.Buttons({
            createOrder: (data,actions,err) =>{
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units: [
                        {
                            description:"Thanh toan ve xe",
                            amount:{
                                currency_code:"CAD",
                                value: props.val,
                            }
                        }
                    ]

                })
            },
            onApprove: async (data, actions) =>{
                const order = await actions.order.capture()
                console.log(order)
                bookSeatTicket()
            },
            onError: (err) =>{
                console.log(err)
            }
        }).render(paypal.current)
    }
    return(
        <>
            <button type="button" onClick={paymentTicket}>
                Thanh toán
            </button>
            <div style={{margin:"3rem auto"}}>
                <div ref={paypal}></div>
            </div>
        </>
        
        
    )
}