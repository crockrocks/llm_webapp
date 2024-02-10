import React, { useState, useEffect } from 'react';

const ProductCarousel = ({ imagePath }) => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    if (imagePath) {
      
      // Fetch images from the server based on the imagePath
      fetch(`http://127.0.0.1:5000/api/get-images?image_path=${encodeURIComponent(imagePath)}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched images:', data.images);
          setCarouselImages(data.images);
        })
        .catch(error => console.error('Error fetching images:', error));
    }
  }, []);

  return (
    <div id="productCarousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-item${index === 0 ? ' active' : ''}`}
          >
            <img
              src={'/data/shirts/images/shirt001.jpg'}
              className="d-block w-100"
              alt={`Product ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href="#productCarousel"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#productCarousel"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default ProductCarousel;