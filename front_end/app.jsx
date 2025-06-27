import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './cool.css';

const cropImages = {
  rice: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Rice_plants_%28IRRI%29.jpg",
  wheat: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wheat_close-up.JPG",
  maize: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Corncobs.jpg",
  sugarcane: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Sugarcane_field.jpg",
  cotton: "https://upload.wikimedia.org/wikipedia/commons/6/6f/CottonPlant.JPG",
  pulses: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Assorted_pulses.jpg",
  barley: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Barley_field_in_Sweden.jpg",
  millet: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Finger_millet_%28Eleusine_coracana%29.jpg",
  groundnut: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Peanut_%28Arachis_hypogaea%29.jpg",
  soybean: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Soybean.USDA.jpg",
  sunflower: "https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg",
};
const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

function SlidingNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const [slide, setSlide] = useState(false);
  useEffect(() => {
    let start = 0;
    setSlide(false);
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setSlide(true);
      }
    };
    requestAnimationFrame(step);
  }, [value, duration]);
  return (
    <span className={slide ? 'slide-in-yeild' : ''}>{display}</span>
  );
}

function PredictionSite() {
  const location = useLocation();
  const navigate = useNavigate();
  const { top_crops } = location.state || {};

  if (!top_crops || !Array.isArray(top_crops) || top_crops.length === 0) {
    return (
      <div className="prediction-site">
        <h2>No prediction data found.</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const rankStyles = [
    {
      border: '4px solid #ffd700',
      boxShadow: '0 12px 40px 0 rgba(255,215,0,0.25)',
      transform: 'scale(1.18)',
      zIndex: 3
    },
    {
      border: '4px solid #c0c0c0',
      boxShadow: '0 8px 32px 0 rgba(192,192,192,0.18)',
      transform: 'scale(1.07)',
      zIndex: 2
    },
    {
      border: '4px solid #cd7f32',
      boxShadow: '0 8px 32px 0 rgba(205,127,50,0.15)',
      transform: 'scale(1)',
      zIndex: 1
    }
  ];

  return (
    <div className="prediction-site" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #43cea2 0%, #185a9d 100%)' }}>
      <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '2.5rem', marginBottom: 36, letterSpacing: 2, textShadow: '0 4px 24px #185a9d55' }}>Top 3 Crop Recommendations</h2>
      <div className="top-crops-container circular-layout">
        {top_crops.map((item, idx) => {
          const crop = item.crop;
          const yield_percent = item.yield_percent;
          const image = cropImages[crop?.toLowerCase()] || placeholderImage;
          // Set size and zIndex based on rank
          const sizes = [180, 130, 110];
          const fontSizes = ["2.1rem", "1.3rem", "1.1rem"];
          const yieldFontSizes = [36, 26, 22];
          return (
            <div
              key={crop}
              className={`prediction-card animated-card rank-${idx+1}`}
              style={{
                background: 'rgba(255,255,255,0.99)',
                borderRadius: 999,
                width: sizes[idx],
                height: sizes[idx],
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: `calc(50% + ${Math.cos((idx-1)*2*Math.PI/3)*160}px - ${sizes[idx]/2}px)`,
                top: `calc(50% + ${Math.sin((idx-1)*2*Math.PI/3)*120}px - ${sizes[idx]/2}px)`,
                zIndex: 10-idx,
                boxShadow: idx === 0 ? '0 12px 40px 0 rgba(255,215,0,0.25)' : idx === 1 ? '0 8px 32px 0 rgba(192,192,192,0.18)' : '0 8px 32px 0 rgba(205,127,50,0.15)',
                border: idx === 0 ? '4px solid #ffd700' : idx === 1 ? '4px solid #c0c0c0' : '4px solid #cd7f32',
                transition: 'transform 0.5s cubic-bezier(.39,.575,.565,1.000), box-shadow 0.5s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.13)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ position: 'absolute', top: 12, left: 12, background: idx === 0 ? '#ffd700' : idx === 1 ? '#c0c0c0' : '#cd7f32', color: '#fff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>{idx+1}</div>
              <img
                src={image}
                alt={crop}
                title={cropImages[crop?.toLowerCase()] ? crop : `No image found for ${crop}`}
                style={{ width: sizes[idx]-40, height: sizes[idx]-40, objectFit: 'cover', borderRadius: '50%', marginBottom: 10, boxShadow: '0 6px 32px 0 rgba(67,206,162,0.22)', border: '4px solid #fff', background: '#fff', transition: 'transform 0.3s' }}
              />
              <div className="prediction-title" style={{ color: '#185a9d', fontWeight: 800, fontSize: fontSizes[idx], marginBottom: 6, letterSpacing: 1 }}>{crop}</div>
              <div className="yield-percent" style={{ fontSize: yieldFontSizes[idx], color: '#43cea2', fontWeight: 700, marginBottom: 4 }}>
                <SlidingNumber value={yield_percent} duration={1200 + idx * 300} />% yield
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn" style={{ marginTop: 48, fontSize: '1.1rem', fontWeight: 700, letterSpacing: 1 }} onClick={() => navigate('/')}>Predict Again</button>
    </div>
  );
}

function MainApp() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericData = {};
    Object.keys(formData).forEach(key => {
      numericData[key] = formData[key] === '' ? null : parseFloat(formData[key]);
    });
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(numericData)
      });
      if (!res.ok) {
        const errorText = await res.text();
        alert(`Backend error: ${res.status} ${res.statusText}\n${errorText}`);
        throw new Error(`Backend error: ${res.status} ${res.statusText}\n${errorText}`);
      }
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        alert("Invalid JSON response from backend.\n" + (await res.text()));
        throw new Error("Invalid JSON response from backend.");
      }
      if (!data.top_crops || !Array.isArray(data.top_crops) || data.top_crops.length === 0) {
        alert("No top_crops in backend response.\n" + JSON.stringify(data));
        throw new Error("No top_crops in backend response.");
      }
      navigate('/prediction', { state: { top_crops: data.top_crops } });
    } catch (err) {
      alert("Prediction failed: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      <div className="glass-card home-card">
        <h1 className="main-title">🌾 Smart Crop Predictor</h1>
        <form onSubmit={handleSubmit} className="predict-form">
          {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.toUpperCase()}:</label>
              <input
                type="number"
                name={field}
                step="any"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="main-btn">Predict Crop</button>
        </form>
      </div>
    </div>
  );
}

function OuterHero() {
  const navigate = useNavigate();
  const cropGrid = [
    ['rice', 'wheat', 'maize'],
    ['sugarcane', 'cotton', 'pulses'],
    ['barley', 'millet', 'groundnut'],
    ['soybean', 'sunflower']
  ];
  return (
    <div className="outer-hero">
      <div className="outer-hero-content" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
        <div className="outer-hero-text" style={{flex: 1, paddingLeft: 40}}>
          <h1 className="outer-hero-title" style={{fontSize: '2.8rem', fontWeight: 800, color: '#185a9d', marginBottom: 24, letterSpacing: 1}}>
            <span role="img" aria-label="crop">🌾</span> Smart Crop<br/>Predictor
          </h1>
          <button className="main-btn" style={{marginTop: 32, fontSize: '1.2rem', padding: '16px 48px', fontWeight: 700}} onClick={() => navigate('/predictor')}>Start Predicting</button>
        </div>
        <div className="outer-hero-crops" style={{flex: 1.2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 120px)',
            gridTemplateRows: 'repeat(4, 120px)',
            gap: '32px 32px',
            marginRight: 40
          }}>
            {cropGrid.flat().map((key, idx) => (
              <div key={key} style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={cropImages[key] || placeholderImage}
                  alt={key}
                  title={cropImages[key] ? key : `No image found for ${key}`}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: 4,
                  }}
                />
                <span style={{
                  fontSize: 16,
                  color: '#222',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  right: 0,
                  textAlign: 'center'
                }}>{key}</span>
              </div>
            ))}
            {Array(12 - cropGrid.flat().length).fill(0).map((_, i) => (
              <div key={'empty-'+i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OuterHero />} />
        <Route path="/predictor" element={<MainApp />} />
        <Route path="/prediction" element={<PredictionSite />} />
      </Routes>
    </Router>
  );
}
