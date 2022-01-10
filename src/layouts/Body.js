import Footer from "./Footer";
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { Container } from 'react-bootstrap';
import './Style.css'
import Line from "../pages/Line";
import Trip from "../pages/Trip";
import BookTicket from "../pages/BookTicket";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";

export default function Body(){
    return(
        <>
            <BrowserRouter>
                <Header/>
                <Container>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/sign-in" element={<SignIn/>}/>
                    <Route exact path="/sign-up" element={<SignUp/>}/>
                    <Route exact path="/lines" element={<Line/>}/>
                    <Route exact path="/trips" element={<Trip/>}/>
                    <Route exact path="/trips/:tripId/tickets/:lineId" element={<BookTicket/>}/>
                    <Route exact path="/users/profile" element={<Profile/>}/>
                    <Route exact path="/payment/:tripId/seat/:seatId/price/:price" element={<Payment/>}/>
                </Routes>
                </Container>
                <Footer/>
            </BrowserRouter>
        </>
    )
}