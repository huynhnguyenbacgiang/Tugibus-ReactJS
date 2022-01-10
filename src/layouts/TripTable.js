import { Link } from 'react-router-dom';

export default function TripTable(props){
    const price = Number(props.obj.line.price)
    const extra_changes = Number(props.obj.extra_changes)
    const totalPrice = price + extra_changes

    return(
        <tr key={props.obj.id} style={{textAlign:"center"}}>
            <td >{props.obj.name} </td>
            <td >{props.obj.start_time}</td>
            <td >{props.obj.end_time}</td>
            <td >{totalPrice}</td>
            <td ><Link to={`/trips/${props.obj.id}/tickets/${props.obj.line.id}`} style={{textDecoration: "none"}}>Mua vé</Link></td>
        </tr>
    )
}