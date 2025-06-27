import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
data = pd.read_csv("crop_recommendation_dataset.csv")
X = data.drop("label", axis=1)
y = data["label"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)
joblib.dump(model, "crop_model.pkl")
print("✅ Model trained and saved as crop_model.pkl")
