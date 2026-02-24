from fastapi import FastAPI, UploadFile, File
import shutil

app = FastAPI()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Save the file locally
    with open(f"uploads/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Trigger AI Engine to process the new textbook
    # process_textbook(file.filename) 
    
    return {"filename": file.filename, "status": "Ready for AI processing"}