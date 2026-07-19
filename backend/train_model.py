import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import preprocess
from pathlib import Path

def main():
    base_dir = Path(__file__).resolve().parent
    csv_path = base_dir / 'PH2025_MH_MeritList_Clean.csv'
    if not csv_path.exists():
        print(f"Error: Dataset {csv_path} not found.")
        return

    print("Loading and cleaning dataset...")
    df = preprocess.load_data(csv_path)

    # Features and Target
    feature_cols = ['merit_percentile', 'category', 'gender', 'is_ews', 'is_tfws', 'is_pwd_def', 'minority_type', 'hsc_total_percent']
    X = df[feature_cols].copy()
    y = df['merit_no'].values

    print(f"Dataset loaded. Total records: {len(df)}")

    # Split into train and test sets for evaluation
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create preprocessor & pipeline
    preprocessor = preprocess.get_preprocessor()
    model = DecisionTreeRegressor(max_depth=12, random_state=42)

    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', model)
    ])

    print("Training the model on training split...")
    pipeline.fit(X_train, y_train)

    # Evaluate
    y_pred = pipeline.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print("\n--- Model Evaluation Results ---")
    print(f"Mean Absolute Error (MAE) : {mae:.2f} ranks")
    print(f"Mean Squared Error (MSE)   : {mse:.2f}")
    print(f"R-squared Score (R2)       : {r2:.4f}")
    print("--------------------------------\n")

    # Retrain pipeline on full dataset for maximum accuracy
    print("Retraining model on full dataset for production...")
    full_pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('regressor', DecisionTreeRegressor(max_depth=12, random_state=42))
    ])
    full_pipeline.fit(X, y)

    # Save to file
    base_dir = Path(__file__).resolve().parent
    model_filename = base_dir / 'model.pkl'
    print(f"Saving final model to {model_filename}...")
    joblib.dump(full_pipeline, model_filename)
    
    file_size_mb = model_filename.stat().st_size / 1024 / 1024
    print(f"Successfully saved model.pkl. Size: {file_size_mb:.4f} MB")

if __name__ == '__main__':
    main()
