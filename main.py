from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.staticfiles import StaticFiles
import httpx
import os
from pathlib import Path
import base64
from dotenv import load_dotenv
from search import get_db
import json
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY is not set in the environment variables")

IMAGE_DIR = Path("uploaded_images")
IMAGE_DIR.mkdir(exist_ok=True)

class ClothingArea(Enum):
    HEAD = "head(hat)"
    TORSO = "torso(body)"
    LEGS = "legs(pants)"
    SHOES = "shoes"
    WHOLE = "full outfit"

class Style(Enum):
    SMART_CASUAL = "smart-casual"
    CLUB = "for clubbing/night out/night"
    DATE = "date, romantic, dinner"
    LUXURY = "luxury and high-end"

# @app.post("/upload-image/")
# async def upload_image(file: UploadFile = File(...)):
#     if not file.content_type.startswith('image/'):
#         raise HTTPException(status_code=400, detail="File is not an image")
#     file_path = IMAGE_DIR / file.filename
#     with open(file_path, "wb") as buffer:
#         data = await file.read()
#         buffer.write(data)
#     return {"id": file.filename, "message": "Image uploaded successfully"}

def generate_prompt(clothing_area: ClothingArea, style: Style):
    base_prompt = f"""
    You are a stylist and your job is to pick the best clothes according to the person's style, body build and 
    where they want to go in those clothes. There will be 1 person in the picture and you should analyze only 
    the person and his clothes, do not pay attention to the background and so on. 
    Use a chain-of-thought technique to analyze the person's clothes and suggest the best clothes for this person.
    """

    specific_prompt = f"Suggest {clothing_area.value} attire that fits a {style.value} style."
    
    return_text = f"ONLY RETURN the description of suggested {clothing_area.value}, only description of suggested cloth is enough, keywords are enough."

    full_prompt = f"{base_prompt} {specific_prompt} {return_text}"
    return full_prompt

class AnalyzeImageRequest(BaseModel):
    image_base64: str
    clothing_area: ClothingArea
    style: Style

@app.post("/analyze-image/")
async def analyze_image(request: AnalyzeImageRequest, price_start: int = None, price_end: int = None, brand: str = None):
    base64_image = request.image_base64
    prompt = generate_prompt(request.clothing_area, request.style)
    response = await send_image_to_openai(base64_image, prompt)
    db = get_db()
    docs = db.similarity_search(response["choices"][0]["message"]["content"], k=8)
    return docs

# @app.post("/analyze-image/{image_id}")
# async def analyze_image(image_id: str, prompt: str = '''
                        
# You are a stylist and your job is to pick the best clothes according to the person's style, body build and 
# where they want to go in those clothes. 

# There will be 1 person on the picture and you should analyze only 
# the person and his clothes, do not pay attention to the background and so on. 
# Use a chain-of-though technique to analyze the person's clothes and suggest the best clothes for this person. 

# ONLY RETURN the Suggestion of T-shirt for this person, only description of suggested cloth is enough, keywords are enough
                
# '''):
#     image_path = IMAGE_DIR / image_id
#     if not image_path.exists():
#         raise HTTPException(status_code=404, detail="Image not found")
#     base64_image = encode_image(image_path)
#     response = await send_image_to_openai(base64_image, prompt)
#     db = get_db()
#     docs = db.similarity_search(response["choices"][0]["message"]["content"], k=5)
#     return docs

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
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
class ImageRequest(BaseModel):
    image_base64: str

@app.post("/describe-image/")
async def describe_image(request: ImageRequest):
    prompt = '''You are a stylist and your job is to pick the best clothes according to the person's style, body build and 
    where they want to go in those clothes. There will be 1 person in the picture and you should analyze only 
    the person and his clothes, do not pay attention to the background and so on. So give me  detailed description of the person's clothes.
    Answer only in 1 format like. You are wearing ... and ... and ... and, with some adjectives. Also you can praise the style and say it's all good BUT you can change ...'''
    
    base64_image = request.image_base64
    
    response = await send_image_to_openai(base64_image, prompt)
    
    return response

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
        "max_tokens": 100
    }
    timeout = httpx.Timeout(10.0, connect=60.0) 
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(url, headers=headers, json=payload)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()


class CustomTextGPTRequest(BaseModel):
    prompt: str
    max_tokens: int = 150 

@app.post("/custom-text-gpt-query/")
async def custom_text_gpt_query(request: CustomTextGPTRequest):
    response = await send_text_to_openai(request.prompt, request.max_tokens)
    return response

async def send_text_to_openai(prompt, max_tokens=150):
    """
    Helper function to send a text prompt to OpenAI's API.
    """
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
                "content": prompt  # Directly using string here
            }
        ],
        "max_tokens": max_tokens
    }
    timeout = httpx.Timeout(10.0, connect=60.0) 
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(url, headers=headers, json=payload)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

app.mount("/images", StaticFiles(directory="uploaded_images"), name="images")