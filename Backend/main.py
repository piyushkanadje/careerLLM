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
    SystemMessagePromptTemplate
)
from langchain.schema import SystemMessage
from model import resumeparser
from model import jobmatcher
import llama
import json




from contextlib import asynccontextmanager
from langchain.chat_models import ChatOpenAI
# from model import resumeparser
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.memory import ConversationSummaryMemory
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
import os
path = os.getcwd()
filename = "temp_file.pdf"
full_path = os.path.join(path, filename)
loader = PyMuPDFLoader(full_path)
# loader = PyMuPDFLoader("/Users/piyushkanadje/Desktop/careerLLM/careerLLM/Backend/model/Kaushik_Daiv_Resume_Hadoop.pdf")
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
all_splits = text_splitter.split_documents(data)
vectorstore = Chroma.from_documents(documents=all_splits, embedding=HuggingFaceEmbeddings())
llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD")
model = ChatLlamaAPI(client=llama)
memory = ConversationSummaryMemory(
llm=model, memory_key="chat_history", return_messages=True
)
retriever = vectorstore.as_retriever()

qa = ConversationalRetrievalChain.from_llm(model, retriever=retriever, memory=memory)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("startup fastapi")
    yield
    # shutdown
    print("shutdown fastapi")
app = FastAPI(lifespan=lifespan)
# router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers

)   


@app.post("/submitprompt/")
async def create_item(prompt: str = Form(...)):
    print(prompt)
    ans=''
    while ans == '':
        try:
                qa = ConversationalRetrievalChain.from_llm(model, retriever=retriever, memory=memory)
                ans = qa(prompt)['answer']
        except:
             pass
    return {"prompt": ans}

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
               
        # except asyncio.TimeoutError:
        #     pass
    return {"role": "ai","prompt": ans}

@app.post("/interviewprompt/")
async def interview_chat(prompt: str = Form(...)):
    llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD")
    llm = ChatLlamaAPI(client=llama)
    with open("/Users/piyushkanadje/Desktop/careerLLM/careerLLM/Backend/model/parsed-resume.json") as f:
        output_dict = json.load(f)
    print(output_dict)


    # Prompt
    promptTemp = ChatPromptTemplate(
        messages=[
            SystemMessagePromptTemplate.from_template(
                f"You are a chatbot helping user with interview preparation for following role{output_dict['Role']}."
            ),
            # The `variable_name` here is what must align with memory
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{question}"),
        ]
    )

    # Notice that we `return_messages=True` to fit into the MessagesPlaceholder
    # Notice that `"chat_history"` aligns with the MessagesPlaceholder name
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    conversation = LLMChain(llm=llm, prompt=promptTemp, verbose=True, memory=memory)

    # Notice that we just pass in the `question` variables - `chat_history` gets populated by memory
    print(prompt)
    chat = conversation({"question": prompt})["text"]
    print(" AI: "+ chat)
    
    return {"role": "ai","prompt": chat}
                  

app.mount("/", StaticFiles(directory="static", html=True), name="static")


# What can I see in Vienna? Propose a few locations. Names only, no details."




    


