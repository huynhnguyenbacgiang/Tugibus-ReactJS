import React from 'react'
import group from '../icon/group.svg'
import ticketing from '../icon/ticketing.svg'
import bus from '../icon/bus.svg'
import './QualityCheck.css'


function QualityCheck() {
    return (
        <div className="tugi-quality-honor">
            <div className="title-container">
                <label className="title">TUGI - Chất lượng là danh dự</label>
            </div>
            <div className="summary">
                <div className="summary-item">
                    <img className="summary-icon" src={group} alt="group" />
                    <div className="text">
                        <p className="summary-title">20M</p>
                        <p className="subtitle">Hơn 20 triệu lượt khách</p>
                        <p className="des">Tư Giang phục vụ hơn 20 triệu lượt khách/bình quân 1 năm trên toàn quốc</p>
                    </div>
                </div>
                <div className="summary-item">
                    <img className="summary-icon" src={ticketing} alt="ticketing" />
                    <div className="text">
                        <p className="summary-title">250</p>
                        <p className="subtitle">Hơn 250 phòng vé, phòng hàng</p>
                        <p className="des">Tư Giang có hơn 250 phòng vé, trạm trung chuyển, bến xe... trên toàn hệ thống</p>
                    </div>
                </div>
                <div className="summary-item">
                    <img className="summary-icon" src={bus} alt="bus" />
                    <div className="text">
                        <p className="summary-title">1,600</p>
                        <p className="subtitle">Hơn 1,600 chuyến mỗi ngày</p>
                        <p className="des">Tư Giang phục vụ hơn 1600 chuyến xe đường dài và liên tỉnh mỗi ngày</p>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default QualityCheck
