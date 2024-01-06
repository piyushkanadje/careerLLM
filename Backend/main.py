from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from langchain.chains import LLMChain
from llamaapi import LlamaAPI
from langchain_experimental.llms import ChatLlamaAPI
from langchain.memory import ConversationBufferMemory
from fastapi import FastAPI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.schema import SystemMessage
from model import resumeparser
from model import jobmatcher
import llama
import json




from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("startup fastapi")
    yield
    # shutdown
    print("shutdown fastapi")
app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers

)   


@app.post("/submitprompt/")
async def submit_prompt(prompt: str = Form(...)):
 

    
    try:
        LLMresponse = llama.get(prompt)
    except:
        print("Error in model")
    
    return {"prompt": LLMresponse}
@app.post("/parseresume/")
async def parse_resume():
    try:
        parsed_json = resumeparser.resume_parse()
    except:
        print("Error in parsing")
    return parsed_json

@app.post("/jobmatcher/")
async def match_job(request: Request):
    print("aaaaaaa")
    body_str = await request.body()
    jd = body_str.decode()
    try:
        match = jobmatcher.analyze_job(jd)
    except:
        print("Error in matching")
    return match
               

app.mount("/", StaticFiles(directory="static", html=True), name="static")


# What can I see in Vienna? Propose a few locations. Names only, no details."




    


