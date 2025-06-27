import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './cool.css';

const cropImages = {
  rice: require('./crop_images/rice.jpg'),
  wheat: require('./crop_images/wheat.jpg'),
  maize: require('./crop_images/maize.jpg'),
  sugarcane: require('./crop_images/sugarcane.jpg'),
  cotton: require('./crop_images/cotton.jpg'),
  pulses: require('./crop_images/pulses.jpg'),
  barley: require('./crop_images/barley.jpg'),
  millet: require('./crop_images/millet.jpg'),
  groundnut: require('./crop_images/groundnut.jpg'),
  soybean: require('./crop_images/soybean.jpg'),
  sunflower: require('./crop_images/sunflower.jpg'),
};

export default function PredictionSite() {
  const location = useLocation();
  const navigate = useNavigate();
  const { crop } = location.state || {};
  const image = cropImages[crop?.toLowerCase()] || cropImages['rice'];

  if (!crop) {
    return (
      <div className="prediction-site">
        <h2>No prediction data found.</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="prediction-site" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(120deg, #43cea2 0%, #185a9d 100%)' }}>
      <div className="prediction-card" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(34,49,63,0.2)', padding: 40, maxWidth: 400, textAlign: 'center', position: 'relative' }}>
        <img src={image} alt={crop} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 16, marginBottom: 24, boxShadow: '0 4px 16px rgba(67,206,162,0.18)' }} />
        <h2 style={{ color: '#185a9d', fontFamily: 'Montserrat, Arial, sans-serif' }}>Best Crop: <span style={{ color: '#43cea2' }}>{crop}</span></h2>
        <button className="btn" onClick={() => navigate('/')}>Predict Again</button>
      </div>
    </div>
  );
}
