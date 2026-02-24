import csv
import re

# Load ASL dataset
ASL_WORDS = set()

with open("asl_data.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        word = row.get("Entry", "").upper().strip()
        if word:
            ASL_WORDS.add(word)

def convert_to_sign(text):
    text = text.upper()
    words = re.findall(r'\b\w+\b', text)

    tokens = []
    for w in words:
        if w in ASL_WORDS:
            tokens.append(w)
        else:
            tokens.append("FINGER_SPELL")

    return tokens
