from fastapi import FastAPI, Request, Form, Body
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from langchain.chains import LLMChain
from llamaapi import LlamaAPI
from langchain_experimental.llms import ChatLlamaAPI
from langchain.memory import ConversationBufferMemory
from langchain_experimental.chat_models import Llama2Chat
from fastapi import FastAPI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.schema import SystemMessage
from os.path import expanduser
from langchain_community.llms import LlamaCpp
from pydantic import BaseModel
import asyncio
# nest_asyncio.apply()
import llama
# from httpx import AsyncClient
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import websockets
import json
# app = FastAPI()
router = APIRouter()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allows all origins
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers

# )

# class Data(BaseModel):
#     prompt: str
@router.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        prompt = data
        llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD")

    
        model = ChatLlamaAPI(client=llama)
        # await asyncio.sleep(30)
        print("a")

        template_messages = [
            SystemMessage(content="You are a helpful assistant."),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{text}"),
            ]
        prompt_template = ChatPromptTemplate.from_messages(template_messages)

        # model_path = expanduser("llama-2-7b-chat.Q4_0.gguf")

        # llm = LlamaCpp(
        #     model_path=model_path,
        #     streaming=False,
        # )
        # model = Llama2Chat(llm=llm)

        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        chain = LLMChain(llm=model, prompt=prompt_template, memory=memory)
        LLMresponse = chain.run(
            text= prompt
        )
        print(LLMresponse)
        data_dict = {'op':LLMresponse}
        await websocket.send_text(f"Message text was: {LLMresponse}")
        

# @app.post("/submitprompt/")
# async def create_item(prompt: str = Form(...)):
 

    
#     print(prompt)
#     # llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD")
#     # model = ChatLlamaAPI(client=llama)
#     # template_messages = [
#     # SystemMessage(content="You are a helpful assistant."),
#     # MessagesPlaceholder(variable_name="chat_history"),
#     # HumanMessagePromptTemplate.from_template("{text}"),
#     # ]
#     # prompt_template = ChatPromptTemplate.from_messages(template_messages)

#     # # model_path = expanduser("llama-2-7b-chat.Q4_0.gguf")

#     # # llm = LlamaCpp(
#     # #     model_path=model_path,
#     # #     streaming=False,
#     # # )
#     # # model = Llama2Chat(llm=llm)
    
#     # memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
#     # chain = LLMChain(llm=model, prompt=prompt_template, memory=memory)
#     # LLMresponse = chain.run(
#     #     text= prompt
#     # )

#     # # Replace 'Your_API_Token' with your actual API token
#     # print(LLMresponse)
#     # await asyncio.sleep(30)
#     async with websockets.connect(
#         "ws://127.0.0.1:8000/chat"
#     ) as websocket:
#         message_data = {"message": prompt}
#         json_data = json.dumps(message_data)

#         await websocket.send(json_data)
#         counter = 0
        
#         stream_data = ""
#         try:
#             while True:
#                 counter += 1
#                 response = await asyncio.wait_for(websocket.recv(), timeout=20)
#                 response = json.loads(response)

#                 if "error" in response:
#                     stream_data = response["error"]
#                     break
#                 else:
#                     prompt = response['op']
#                     break
               
#         except asyncio.TimeoutError:
#             pass
#     return {"prompt": prompt}
               

#         # return stream_data
#     # response = await llama.get(prompt)
     

# app.mount("/", StaticFiles(directory="static", html=True), name="static")


# What can I see in Vienna? Propose a few locations. Names only, no details."




    


