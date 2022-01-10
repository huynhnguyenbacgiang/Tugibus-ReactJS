import "./Footer.css"
import { Link } from 'react-router-dom';

export default function Footer(){
    return(
        <div className="footer-wrap">
            <div className="footer-container">
                <div className="blog-hotline">
                    <div>
                        <p className="phone-title">Tổng đài đặt vé & CSKH</p>
                        <p className="phoneNumber"> 1900 100 00</p>
                    </div>

                    <Link to="http://www.online.gov.vn/">
                        <img alt="d" className="ddk-image" src="/images/DaDangKy.png" />
                    </Link>
                </div>
                <div className="desc">
                    <p className="desc-tit">CÔNG TY CỔ PHẦN XE KHÁCH TƯ GIANG BUS LINES</p>
                    <p> Địa chỉ: 477/40 Nguyễn Văn Công, phường 3, quận Gò Vấp, TP Hồ Chí Minh. </p>
                    <p>Email: <a href="/">hotro@tugibus.vn</a></p>
                    <p>Điện thoại: <a href="/"> 0913260623 </a></p>
                    <div className="social-media">
                        <Link to="/">
                            <img alt="d" className="sc-image" src="/images/facebook.png" />
                        </Link>
                        <Link to="/">
                            <img alt="d" className="sc-image" src="/images/youtube.png" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}