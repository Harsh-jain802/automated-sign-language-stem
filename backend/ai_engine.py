import json
import re
import pdfplumber
from thefuzz import fuzz

def extract_text_from_pdf(file_path):
    """The 'Secretary': Extracts text from PDF textbooks."""
    text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
        return text
    except Exception as e:
        print(f"PDF Error: {e}")
        return ""

def concept_mapper(text):
    """The 'Lab': Maps text to STEM concepts using Semantic Similarity."""
    if not text: return []
    text = text.upper()
    
    try:
        with open("concept_map.json", "r") as f:
            db = json.load(f)
    except Exception:
        return []

    matches = []
    
    for concept, data in db.items():
        # Calculate semantic similarity score across all keywords
        scores = [fuzz.token_set_ratio(kw, text) for kw in data["keywords"]]
        best_score = max(scores) if scores else 0

        # TRIGGER: 70% match or higher
        if best_score > 70:
            # Inside the loop in concept_mapper function
            matches.append({
                "concept": concept,
                "confidence": f"{best_score}%", 
                "video_url": f"http://localhost:8000/assets/{data.get('video', 'physics_overview.mp4')}",
                "formula": data.get("formula", ""),
                "variables": data.get("variables", ""),
                "diagram": data.get("diagram", ""),
                "example": data.get("example", ""),
                "quiz": data.get("quiz", {}), # NEW: Pass the whole quiz object
                "score": best_score 
            })
            
    # Sort results by highest confidence
    matches.sort(key=lambda x: x["score"], reverse=True)
    return matches