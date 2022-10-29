import React, { useEffect } from 'react'
import ImageSlide from '../../../components/imageSlider/ImageSlide';
import image1 from '../../../assets/ft-members-1.png'
import image2 from '../../../assets/ft-members-2.png'
import image3 from '../../../assets/ft-members-3.png'
import image4 from '../../../assets/ft-members-4.png'
import image5 from '../../../assets/ft-members-5.png'
import image6 from '../../../assets/ft-members-6.png'
import image7 from '../../../assets/ft-members-7.png'
import image8 from '../../../assets/ft-members-8.png'

import { useDispatch, useSelector } from 'react-redux'
import { getAllSponsors } from '../../../actions/sponsor';
import './styles.css'

const About = () => {

  const dispatch = useDispatch();
  const sponsorList = useSelector(state => state.sponsor.sponsors);
  const images = [
    image1, image2, image3, image4, image5, image6, image7, image8
]

  useEffect(() => {
    dispatch(getAllSponsors());
  }, [])

  const content1 = "Một nhóm các bạn trẻ tràn trề nhiệt huyết và năng lượng tập hợp lại với nhau với mong muốn đóng góp một phần công sức của mình để giảm thiểu các tác động tiêu cực của đồ ăn thừa tới môi trường và giải quyết vấn đề thiếu lương thực, thực phẩm trong xã hội hiện nay"
  const content2 = "Các đơn vị bảo trợ đã đồng hành cùng Food Town";

  return (
    <div className='about-container container wrapper' id="about">
      <div className='about-section-container'>
        <div className='about-top'>
          <p className='about-title'>Về chúng tôi</p>
          <p className='about-content'>{content1}</p>
        </div>
        <ImageSlide images={images} />
      </div>
      <div className='about-section-container'>
        <div className='about-top'>
          <p className='about-title'>Đơn vị bảo trợ</p>
          <p className='about-content'>{content2}</p>
        </div>
        <div className='about-bottom'>
          {
            sponsorList?.length ?
            <div className='about-logos'>
              {
                sponsorList.map((sponsor, index) => <img key={index} src={sponsor.logo.data !== undefined ? `data:image/png;base64, ${Buffer.from(sponsor.logo.data).toString('base64')}` : null} alt="" className='about-logo'/>)
              }
            </div>
            :
            null
          }
        </div>
      </div>
      {/* <div className='slideshow__viewing__image-container'>
          <img src={images[viewingImageIndex]} alt="" className='slideshow__viewing__image-image'/>
      </div> */}
    </div>
  )
}

export default About