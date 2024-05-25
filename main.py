from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
import httpx
import os
from pathlib import Path
import base64
from dotenv import load_dotenv
from search import get_db
import json

load_dotenv()  # Load environment variables

app = FastAPI()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set in the environment variables")

IMAGE_DIR = Path("uploaded_images")
IMAGE_DIR.mkdir(exist_ok=True)

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File is not an image")
    file_path = IMAGE_DIR / file.filename
    with open(file_path, "wb") as buffer:
        data = await file.read()
        buffer.write(data)
    return {"id": file.filename, "message": "Image uploaded successfully"}

@app.post("/analyze-image/{image_id}")
async def analyze_image(image_id: str, prompt: str = '''
                        
You are a stylist and your job is to pick the best clothes according to the person's style, body build and 
where they want to go in those clothes. 

There will be 1 person on the picture and you should analyze only 
the person and his clothes, do not pay attention to the background and so on. 
Use a chain-of-though technique to analyze the person's clothes and suggest the best clothes for this person. 

ONLY RETURN the Suggestion of T-shirt for this person, only description of suggested cloth is enough, keywords are enough
                
'''):
    image_path = IMAGE_DIR / image_id
    if not image_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    base64_image = encode_image(image_path)
    response = await send_image_to_openai(base64_image, prompt)
    db = get_db()
    docs = db.similarity_search(response["choices"][0]["message"]["content"], k=5)
    return docs

async def send_image_to_openai(base64_image, prompt):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    payload = {
        "model": "gpt-4o",
        "messages": [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": prompt
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
                }
            ]
            }
        ],
        "max_tokens": 300
    }
    timeout = httpx.Timeout(10.0, connect=60.0) 
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(url, headers=headers, json=payload)
        return response.json()


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')



app.mount("/images", StaticFiles(directory="uploaded_images"), name="images")
