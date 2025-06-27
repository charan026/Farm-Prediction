from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import random
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

model = joblib.load("crop_model.pkl")

crop_data = pd.read_csv("crop_recommendation_dataset.csv")
le = LabelEncoder()
le.fit(crop_data['label'])

class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@app.post("/predict")
def predict_crop(data: CropInput):
    input_data = np.array([
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]).reshape(1, -1)
    
    proba = model.predict_proba(input_data)[0]
    crop_indices = np.argsort(proba)[::-1][:3]  
    crops = le.inverse_transform(crop_indices)
    top_crops = []
    for idx, crop in enumerate(crops):
        yield_percent = round(proba[crop_indices[idx]] * 100, 2)
        top_crops.append({"crop": crop, "yield_percent": yield_percent})
    return {"top_crops": top_crops}
