# upload.py
from fastapi import APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from fastapi import FastAPI
from model import resumeparser


router = APIRouter()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    
)

@app.get('/')
async def main():
    return {"message":"hello"}

# @app.post("/files/")
# async def create_file(file: Annotated[bytes, File()]):
#     return {"file_size": len(file)}

@app.post("/uploadfile/")
async def create_upload_file(file_upload: UploadFile):
    with open("temp_file.pdf", "wb") as f:
        content = await file_upload.read()
        f.write(content)
    print("File delivered")
    print("file delivered")
    obj = resumeparser.resume_parse()
    print(obj)
    return {"data": obj}
