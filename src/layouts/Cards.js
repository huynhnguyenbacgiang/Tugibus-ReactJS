import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
function Cards(props) {
    return (
        <>
            <li className='cards__item'>
                <Link className='cards__item__link' to={props.path}>
                    <figure className='cards__item__pic-wrap' data-category={props.label}>
                        <img
                            className='cards__item__img'
                            alt='Travel Image'
                            src={props.src}
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <label className='cards__item__text'>
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                            {props.distance}
                        </label>
                        <label className='cards__item__text'>
                            <FontAwesomeIcon icon={faClock}/>
                            {props.time}
                        </label>
                        <label className='cards__item__text'>
                            <FontAwesomeIcon icon={faMoneyBillWave}/>
                            {props.cost}
                        </label>
                    </div>
                </Link>
            </li>
        </>
    )
}

export default Cards
