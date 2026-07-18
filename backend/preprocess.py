import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline

# Constants for category normalization
CATEGORY_MAP = {
    'obc': 'OBC',
    'open': 'Open',
    'sc': 'SC',
    'sebc': 'SEBC',
    'nt 2': 'NT 2 (NT-C)',
    'nt-c': 'NT 2 (NT-C)',
    'nt 2 (nt-c)': 'NT 2 (NT-C)',
    'st': 'ST',
    'dt/vj': 'DT/VJ',
    'vj/dt': 'DT/VJ',
    'dt': 'DT/VJ',
    'vj': 'DT/VJ',
    'nt 3': 'NT 3 (NT-D)',
    'nt-d': 'NT 3 (NT-D)',
    'nt 3 (nt-d)': 'NT 3 (NT-D)',
    'nt 1': 'NT 1 (NT-B)',
    'nt-b': 'NT 1 (NT-B)',
    'nt 1 (nt-b)': 'NT 1 (NT-B)',
    'sbc': 'SBC',
    'not applicable': 'Not Applicable',
    'na': 'Not Applicable'
}

GENDER_MAP = {
    'female': 'Female',
    'f': 'Female',
    'male': 'Male',
    'm': 'Male',
    'others': 'Others',
    'other': 'Others',
    'o': 'Others'
}

MINORITY_MAP = {
    '-/-': '-/-',
    'none': '-/-',
    'no': '-/-',
    '-/rm': '-/RM',
    'rm': '-/RM',
    'religious': '-/RM',
    'lm/-': 'LM/-',
    'lm': 'LM/-',
    'linguistic': 'LM/-',
    'lm/rm': 'LM/RM',
    'both': 'LM/RM'
}

# Column Definitions
NUM_COLS = ['merit_percentile', 'hsc_total_percent']
CAT_COLS = ['category', 'gender', 'is_ews', 'is_tfws', 'is_pwd_def', 'minority_type']

def to_yes_no(val):
    """Normalize boolean or string values to 'Yes' or 'No'."""
    if val is None:
        return 'No'
    if isinstance(val, bool):
        return 'Yes' if val else 'No'
    val_str = str(val).strip().lower()
    if val_str in ('yes', 'true', '1', 'y', 't'):
        return 'Yes'
    return 'No'

def normalize_category(cat):
    """Map user input category to canonical category names in the dataset."""
    if not cat:
        return 'Open'
    cat_cleaned = str(cat).strip().lower()
    return CATEGORY_MAP.get(cat_cleaned, 'Open')

def normalize_gender(gen):
    """Map user input gender to canonical gender names in the dataset."""
    if not gen:
        return 'Male'
    gen_cleaned = str(gen).strip().lower()
    return GENDER_MAP.get(gen_cleaned, 'Male')

def normalize_minority(min_type):
    """Map user input minority type to canonical names."""
    if not min_type:
        return '-/-'
    min_cleaned = str(min_type).strip().lower()
    return MINORITY_MAP.get(min_cleaned, '-/-')

def load_data(csv_path):
    """Load the merit list CSV and clean basic formats."""
    df = pd.read_csv(csv_path)
    
    # Standardize column mappings & handle types
    df['merit_percentile'] = pd.to_numeric(df['merit_percentile'], errors='coerce')
    df['hsc_total_percent'] = pd.to_numeric(df['hsc_total_percent'], errors='coerce')
    df['merit_no'] = pd.to_numeric(df['merit_no'], errors='coerce')
    
    # Fill any null values with default fallback
    df['merit_percentile'] = df['merit_percentile'].fillna(df['merit_percentile'].median())
    df['hsc_total_percent'] = df['hsc_total_percent'].fillna(63.0)
    df['category'] = df['category'].fillna('Open').apply(normalize_category)
    df['gender'] = df['gender'].fillna('Male').apply(normalize_gender)
    df['is_ews'] = df['is_ews'].fillna('No').apply(to_yes_no)
    df['is_tfws'] = df['is_tfws'].fillna('No').apply(to_yes_no)
    df['is_pwd_def'] = df['is_pwd_def'].fillna('No').apply(to_yes_no)
    df['minority_type'] = df['minority_type'].fillna('-/-').apply(normalize_minority)
    
    return df

def get_preprocessor():
    """Create and return the ColumnTransformer preprocessor pipeline."""
    return ColumnTransformer([
        ('num', StandardScaler(), NUM_COLS),
        ('cat', OneHotEncoder(handle_unknown='ignore'), CAT_COLS)
    ])

def clean_input_payload(data):
    """Clean the incoming JSON payload for prediction."""
    percentile = float(data.get('percentile', 50.0))
    category = normalize_category(data.get('category', 'Open'))
    gender = normalize_gender(data.get('gender', 'Male'))
    ews = to_yes_no(data.get('ews', data.get('is_ews', 'No')))
    tfws = to_yes_no(data.get('tfws', data.get('is_tfws', 'No')))
    pwd = to_yes_no(data.get('pwd', data.get('is_pwd_def', 'No')))
    minority_type = normalize_minority(data.get('minority_type', '-/-'))
    hsc_marks = float(data.get('hsc_marks', data.get('hsc_total_percent', 63.0)))
    
    # Build standard dictionary conforming to model training features
    cleaned_dict = {
        'merit_percentile': percentile,
        'category': category,
        'gender': gender,
        'is_ews': ews,
        'is_tfws': tfws,
        'is_pwd_def': pwd,
        'minority_type': minority_type,
        'hsc_total_percent': hsc_marks
    }
    
    return pd.DataFrame([cleaned_dict])
