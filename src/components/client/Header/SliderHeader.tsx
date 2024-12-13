import { Carousel } from 'antd';
import React from 'react';
const contentStyle: React.CSSProperties = {
    height: '45px',
    color: '#1c2434',
    lineHeight: '45px',
    textAlign: 'center',
    background: '#f5f5f5',
    fontSize: '14px'
};

const SlideHeader = () => {
    return (
        <Carousel autoplay autoplaySpeed={6666} easing="ease-in-out" speed={1666} swipeToSlide draggable={false} dots={false} arrows={false} className='font-semibold'>
            <div>
                <h3 style={contentStyle}>Cam kết giá rẻ nhất thị trường - Chất lượng đảm bảo</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Tặng kèm nhiều phụ kiện và quà tặng hấp dẫn</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Phân phối sỉ lẻ xe đạp thể thao - Liên hệ ngay qua Zalo để nhận báo giá tốt nhất</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Sản phẩm chất lượng chính hãng, bảo đảm nguồn gốc rõ ràng.</h3>
            </div>
            <div>
                <h3 style={contentStyle}>Siêu ưu đãi - Giảm giá cực sâu cho nhiều sản phẩm</h3>
            </div>

        </Carousel>
    )
}

export default SlideHeader