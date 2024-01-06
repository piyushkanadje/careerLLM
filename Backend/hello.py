from langchain_community.document_loaders import PyMuPDFLoader
from langchain.memory import ConversationSummaryMemory
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain

loader = PyMuPDFLoader("/Users/enduser/Downloads/Learning/LangChain-LLM/Dhananjay_resume5_2023.pdf")
data = loader.load()



text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
all_splits = text_splitter.split_documents(data)


vectorstore = Chroma.from_documents(documents=all_splits, embedding=HuggingFaceEmbeddings())

memory = ConversationSummaryMemory(
    llm=llm, memory_key="chat_history", return_messages=True
)

llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD")
llm = ChatLlamaAPI(client=llama)
retriever = vectorstore.as_retriever()
qa = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory=memory)