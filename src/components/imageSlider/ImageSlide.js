import React, { useState } from 'react'
import './styles.css'

const ImageSlide = ({images}) => {
    const [page, setPage] = useState(1);
    const imageNumberPerPage = 4;
    const pageNumber = Math.ceil(images.length / imageNumberPerPage);
    const switchPage = (step) => {
        setPage(prev => {
            if (prev === 1 && step < 0) {
                return pageNumber;
            } else if (prev === pageNumber && step > 0) {
                return 1;
            } else {
                return prev + step;
            }
        });
    }
    const viewImage = (e) => {
        // setViewingImageIndex(e.target.id);
    }
    return (
        <div className="slideshow-container">
            <div onClick={() => switchPage(-1)} className='slideshow-navigator prev'>❮</div>
            {
                images.slice(imageNumberPerPage * (page - 1), imageNumberPerPage * page).map((image, index) => (
                    <div>
                        <img key={index} src={image} alt="" className='slideshow-image' onClick={viewImage}/>
                    </div>
                ))
            }
            <div onClick={() => switchPage(1)} className='slideshow-navigator next'>❯</div>
        </div>
    )
}

export default ImageSlide