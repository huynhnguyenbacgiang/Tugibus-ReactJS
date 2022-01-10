import React from 'react'
import Cards from './Cards'
import './CommonRoutes.css'

function CommonRoutes() {
    return (
        <div className='cards'>
            <h2>NHỮNG TUYẾN ĐI PHỔ BIẾN </h2>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <Cards
                            src='images/hanoi.jpg'
                            text='Explore the hidden waterfall deep inside the Amazon Jungle'
                            distance="1.723km"
                            time="8"
                            cost="1.500.000"
                            label='Sài Gòn => Hà Nội'
                            path='/'
                        />
                        <Cards
                            src='images/lamdong.jpg'
                            distance="1.723km"
                            time="8"
                            cost="1.500.000"
                            label='Sài Gòn => Lâm Đồng'
                            path='/'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <Cards
                            src='images/nhatrang.jpg'
                            distance="1.723km"
                            time="8"
                            cost="1.500.000"
                            label='Đà Lạt => Nha Trang'
                            path='/'
                        />
                        <Cards
                            src='images/hanoi.jpg'
                            distance="1.723km"
                            time="8"
                            cost="1.500.000"
                            label='Vinh => Hà Nội'
                            path='/'
                        />
                        <Cards
                            src='images/bavi.jpg'
                            distance="1.723km"
                            time="8"
                            cost="1.500.000"
                            label='Hà Nội => Ba Vì'
                            path='/'
                        />
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default CommonRoutes
