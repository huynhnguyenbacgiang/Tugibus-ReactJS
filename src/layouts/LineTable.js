import { Link } from 'react-router-dom';
export default function LineTable(props){
    // console.log(props.obj)
    return(
        <tr style={{textAlign:"center"}}>
            <td>{props.obj.start_point.address} </td>
            <td>{props.obj.end_point.address}</td>
            <td>{props.obj.price}</td>
            <td><Link to={`/trips/?line=${props.obj.id}`} style={{textDecoration: "none"}}>Xem chuyến</Link></td>
        </tr>
    )
}