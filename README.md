# CareerLLM -> Eduhacks 2023 (Hackathon US & CHINA) - 3rd Prize (SOON TO HOST)

CareerLLM is an innovative platform designed to navigate the complexities of the job search and application process. Through a user-friendly chat interface, CareerLLM offers real-time career guidance, aligns resumes with job descriptions for the best fit, and provides actionable advice to elevate your professional presentation. Prepare for interviews with confidence by accessing personalized questions and look forward to expert resume reviews for a competitive edge.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
* You have a Windows/Linux/Mac machine.

### Installing

To install CareerLLM, follow these steps:

Clone the repository to your local machine using the following command and install all the required libraries:

```bash
git clone https://github.com/piyushkanadje/careerLLM.git

cd CareerLLM/

pip install -r requirements.txt

cd reactLLM/

npm install
```

### Running the web app

## To run the backend server, navigate to the Backend/ directory in the project folder as follow and follow the steps:

```bash
cd Backend/

uvicorn main:app --reload --loop asyncio
```

## To run the frontend, navigate to the reactLLM/ directory in the project folder as follow and follow the steps:

```bash
cd reactLLM/

npm start
```




