# upload.py
from fastapi import APIRouter, File, UploadFile
from typing import Annotated

router = APIRouter()

@router.post("/files/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}
