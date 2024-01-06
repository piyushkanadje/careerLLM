from langchain_experimental.llms import ChatLlamaAPI
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from llamaapi import LlamaAPI
from langchain_experimental.llms import ChatLlamaAPI
from langchain.prompts.chat import (
    ChatPromptTemplate
)
from transformers import GPT2Tokenizer
import json
import os
# import resumeparser
import re
import json
# from './resumeparser'

# Regular expression pattern to match the JSON formatted text
def extract_from_text(text):
    # Patterns to find MatchScore and Suggestions in different formats
    patterns = {
        'match_score': [
            r"MatchScore:\s*(\d+%)",  # MatchScore: 60%
            r"Match Score:\s*(\d+%)",  # Match Score: 60%
        ],
        'suggestions': [
            r"Suggestions:\s*\"(.*?)\"",  # Suggestions: "Some suggestion."
            r"Suggestions:\s*(.*?)$",  # Suggestions: Some suggestion.
        ]
    }

    # Initialize default values
    match_score = "Not found"
    suggestions = "Not found"

    # Search for each pattern and update if found
    for key, pattern_list in patterns.items():
        for pattern in pattern_list:
            match = re.search(pattern, text, re.MULTILINE | re.DOTALL)
            if match:
                if key == 'match_score':
                    match_score = match.group(1)
                elif key == 'suggestions':
                    suggestions = match.group(1)
                break  # Stop searching if a match is found

    return match_score, suggestions
def parse_json_like_string(json_like_str):
    # Remove JavaScript-style comments (anything following //)
    cleaned_str = re.sub(r"//.*", "", json_like_str)

    # Ensure percentage values are quoted
    cleaned_str = re.sub(r'(\d+)%', r'"\1%"', cleaned_str)

    try:
        return json.loads(cleaned_str)
    except json.JSONDecodeError:
        return None
def get_text(text):
    pattern_json = r"```json\n(.*?)\n```"
    match_json = re.search(pattern_json, text, re.DOTALL)

    if match_json:
        # Extract the JSON-like string
        json_like_str = match_json.group(1)

        # Parse the cleaned JSON-like string
        data = parse_json_like_string(json_like_str)

        if data:
            # Extract MatchScore and Suggestions
            match_score = data.get("MatchScore", "Not found")
            suggestions = data.get("Suggestions", "Not found")
            return {"MatchScore":match_score, "Suggestions":suggestions} if match_score!="Not found" and suggestions != "Not found" else None
        else:
            print("Error parsing JSON-like data")
            match_score, suggestions = extract_from_text(text)
            return {"MatchScore":match_score, "Suggestions":suggestions} if match_score!="Not found" and suggestions != "Not found" else None
    else:
        
        print("No JSON-like data found in the text")
        match_score, suggestions = extract_from_text(text)
        return {"MatchScore":match_score, "Suggestions":suggestions} if match_score!="Not found" and suggestions != "Not found" else None

def preprocess_text(text):
    tokenizer = GPT2Tokenizer.from_pretrained('EleutherAI/gpt-neo-2.7B')
    tokenized_text = tokenizer.encode(text)
    cleaned_text = tokenizer.decode(tokenized_text)
    return cleaned_text

def analyze_job(job_desc = '', output_dict = None):
    if output_dict == None:
        # output_dict = resumeparser.resume_parse()
        current_directory = os.getcwd() + "/model/"
        filename = "parsed-resume.json"
        full_file_path = os.path.join(current_directory, filename)
        try:
            with open(full_file_path, 'r') as file:
                output_dict = json.load(file)

            # print("File successfully read. Contents:")
            # print(output_dict)

        except FileNotFoundError:
            print(f"Error: The file '{filename}' was not found.")
            return

        except json.JSONDecodeError:
            print(f"Error: The file '{filename}' does not contain valid JSON.")
            return

        except Exception as e:
            print(f"An error occurred: {e}")
            return

    llama = LlamaAPI("LL-UD6myaJsam1zJIgRwUXSrljlSoX9LIQwcWXM8HOPasgnPiFMQf5MWHKDpll926pD") 

    job_matching_template = """
    Resume Details:
        Role: {role}
        Education: {education}
        Experiences: {experiences}
        Skills: {skills}
    Job Description: {jd}
    """
    question = """Template: JobMatcher

    Just like a Applicant Tracking System (ATS), for the following resume text and job description, find match score and suggestions to improve resume match:

    MatchScore: What is matching percentage between resume content and job description? Separate by comma.

    Suggestions: Suggestions to improve job matching with job description. Separate by comma.

    Input:
    text: {text}

    {format_instructions}

    """
    if job_desc == "":

        job_description = """
        About the job
        Bring your heart to CVS Health. Every one of us at CVS Health shares a single, clear purpose: Bringing our heart to every moment of your health. This purpose guides our commitment to deliver enhanced human-centric health care for a rapidly changing world. Anchored in our brand — with heart at its center — our purpose sends a personal message that how we deliver our services is just as important as what we deliver.

        Our Heart At Work Behaviors™ support this purpose. We want everyone who works at CVS Health to feel empowered by the role they play in transforming our culture and accelerating our ability to innovate and deliver solutions to make health care more personal, convenient and affordable.

        This role is a highly visible opportunity on the Rebates Forecasting Decision Science team, responsible for modernizing and innovating to advance rebate performance and profitability for both clients and the PBM organization.

        The Product team designs and builds applications that create insights transforming the healthcare industry. The products we are building have a strong forecasting, what-if scenario, and financial analysis components to them. You will work with business leaders, product leaders, and engineering teams to develop product strategy and roadmaps.You will brainstorm with product owners, engineers, and data scientists to problem solve and develop products to reimagine the rebates forecasting work.

        We are part of the Analytics& Behavior Change organization that serves as a critical partner to various teams across the enterprise helping them to achieve core business goals.

        Position Summary

        As an engineer in the Analytics team building a new Integrate Rebate Forecasting application, you will be part of the team responsible for building advanced modeling applications to forecast rebate profitability.
        Your role will include developing our new model using Python, Pandas, Polars, and other technologies and integrating our system with the existing underwriting application.
        Additionally, you will have the opportunity to work with various cloud technologies to build a reliable application that scales our end user's needs.
        Build and maintain rebate model written in Python, Pandas, which interfaces with a relational database.
        Integrate application data with upstream and downstream systems and applications including RDBMS, Hive, Databricks, Azure Data Lake, GCP buckets, etc.
        Build and maintain microservices written in Python to enable communications with external services to send and retrieve relevant rebates data.
        Integrate rebate forecasting results into Databricks jobs.


        Location: Hybrid work schedule based in Scottsdale, AZ office - 3 days a week every other week in the office.

        Required Qualifications

        2+ years of experience working in software/data engineering role
        2+ years hands-on experience coding in Python or another backend programing language
        2+ years of experience of software engineering best practices (OOP, Git, CI/CD, data structure& algorithms) in enterprise application development.


        Preferred Qualifications

        2+ years designing systems in the cloud using Cloud Functions, Data Pipelines, Tools for Big Data, RDBMS, Cache, Logging and Monitoring.
        Experience building and maintaining microservices.


        Education

        Bachelor's degree required
        """
    else:
        job_description = job_desc
    
    #cleaned_job_description = preprocess_text(job_description)
    formatted_job_description = job_description
    formatted_resume = {
        'role': output_dict['Role'],
        'education': output_dict['Education'],
        'experiences': output_dict['Experience'],
        'skills': output_dict['Skills'],
        'job_description': formatted_job_description
    }


    directory_path = os.getcwd() + "/model/"
    filename = "job_description.txt"

    full_file_path = os.path.join(directory_path, filename)

    try:
        os.makedirs(directory_path, exist_ok=True)

        with open(full_file_path, 'w', encoding='utf-8') as file:
            file.write(formatted_job_description)
        
        print(f"Data has been written to {full_file_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

    jm = job_matching_template.format(
    role=formatted_resume['role'],
    education=formatted_resume['education'],
    experiences=formatted_resume['experiences'],
    skills=formatted_resume['skills'],
    jd=formatted_job_description )
    output_jm_dict = None
    while output_jm_dict==None:
        try:
            prompt = ChatPromptTemplate.from_template(template=question)
            matching_schema = ResponseSchema(name="MatchScore",
                                        description="Match percentage")
            suggestions_schema = ResponseSchema(name="Suggestions",
                                                description="Suggestions")
            response_schemas = [matching_schema, 
                                suggestions_schema]
            output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
            format_instructions = output_parser.get_format_instructions()

            messages = prompt.format_messages(
                text= jm ,
                format_instructions=format_instructions )
            model = ChatLlamaAPI(client=llama)
            chat = model(messages)
            # output_jm_dict = output_parser.parse(chat.content)
            # print(chat.content)
            
            output_jm_dict = get_text(chat.content)
            print(output_jm_dict)
        except:
            pass
    return output_jm_dict
# print(analyze_job())
