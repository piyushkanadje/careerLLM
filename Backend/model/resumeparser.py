'''
 pip3.11 install langchain_experimental
  pip3.11 install llamaapi 
  pip3.11 install pymupdf 
  pip3.11 install langchain            
 
'''

from langchain_experimental.llms import ChatLlamaAPI
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from llamaapi import LlamaAPI
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_experimental.llms import ChatLlamaAPI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)

# Replace 'Your_API_Token' with your actual API token
def resume_parser(path="/Users/enduser/Downloads/Learning/LangChain-LLM/Dhananjay_resume5_2023.pdf"):
    llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD") 
    loader = PyMuPDFLoader(path)
    data = loader.load()
    role_schema = ResponseSchema(name="Role",
                                description="Extracted Role")
    education_schema = ResponseSchema(name="Education",
                                        description="Extracted Education")
    experiences_schema = ResponseSchema(name="Experience",
                                        description="Extracted Experiences")
    skills_schema = ResponseSchema(name="Skills",description="Extracted Skills")

    response_schemas = [role_schema, 
                        education_schema,
                        experiences_schema,
                        skills_schema]
    model = ChatLlamaAPI(client=llama)
    

    question = """Template: ResumeParser

    For the following resume text, extract the following information:

    Role: What is the job role of this individual based on resume information?

    Education: List all schools the individual along with the duration. Separate each education by comma.

    Experiences: List all experiences of the individual along with duration. Separate each experience by comma.

    Skills: List all skills mentioned in the resume.

    Input:
    text: {text}

    {format_instructions}

    """
    prompt = ChatPromptTemplate.from_template(template=question)

    output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
    format_instructions = output_parser.get_format_instructions()
    print(format_instructions)
    messages = prompt.format_messages(text=data[0].page_content, 
                                    format_instructions=format_instructions)
    output_dict = None

    while not output_dict:
        try:
            model = ChatLlamaAPI(client=llama)
            chat = model(messages)
            print(chat.content)
            output_dict = output_parser.parse(chat.content)
        except:
            pass
    return output_dict
print(resume_parser())