import React from 'react';

const ImageCard = ({ link, imgSrc, title }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #ccc', borderRadius: 10, padding: 10, margin: 10, textAlign: 'center' }}>
                <img src={imgSrc} alt={title} style={{ width: '100px', height: '100px' }} />
                <h4 style={{ color: '#333' }}>{title}</h4>
            </div>
        </a>
    );
};

export default ImageCard;
