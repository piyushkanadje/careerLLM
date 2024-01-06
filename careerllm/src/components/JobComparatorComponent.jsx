import React, { Fragment, useEffect, useState } from "react";
import "./JobComparatorComponent.css";
import { ReactComponent as Loader } from '../assets/spinner.svg';




const JobComparatorComponent = () => {
    const [text, setText] = useState("");
    const [isResponseLoading, setIsResponseLoading] = useState(false)
    const [isResponse, setIsResponse] = useState(false)
    const [responseData, setResponseData] = useState('')



    const updateText = (event) => {
        setText(event.target.value)
        // console.log(text)
    }



    const compareJobs = async () => {
        setIsResponseLoading(true)
        console.log("aa",text)
        const options = {
            method: "POST",
            body: text,
            headers: {
              "Content-Type": "text/plain",
            },
          };
      
          try {
            const response = await fetch(
              // Add your get url for the response from the backend
              "http://127.0.0.1:8000/jobmatcher/",
              options
            );
            const data = await response.json();
            // console.log("compare", data)
            setIsResponseLoading(false)

            if (data.error) {
              console.log(data.error.message);
              setText("");
              setIsResponseLoading(false)

            } else {
              console.log(false);
              setIsResponseLoading(false)

            }
      
            if (!data.error) {
                setIsResponse(true)
                setResponseData(data)
                setIsResponseLoading(false)
              console.log("Hello No eroor found");
      
              // Check your response and send data according here 
              // setMessage(data.choices[0].message);
              // setTimeout(() => {
              //   scrollToLastItem.current?.lastElementChild?.scrollIntoView({
              //     behavior: "smooth",
              //   });
              // }, 1);
              // setTimeout(() => {
              //   setText("");
              // }, 2);
            }
          } catch (e) {
            console.error(e);
          } finally {
            setIsResponseLoading(false);
          }

    
    }

    return(
        <Fragment>
        <form className="col-lg-6 col-md-6 forms">
        <textarea placeholder='Enter comment...' value={text} onChange = {updateText} name="jd">
            Paste the Job Description Here...  
        </textarea>
        <button onClick = {compareJobs} disabled={isResponseLoading} className="col-lg-1 col-md-1 btn btn-primary compare-button" type="button" data-mdb-ripple-init>
		{!isResponseLoading ? "Compare" : <Loader className="spinner" />}</button>
        </form>
        <div className="percent">
        <h1>Your Match Percentage is {responseData.MatchScore}</h1>
        <p>Suggestions For You Are : {responseData.Suggestions}</p>
        </div>
        </Fragment>
    )

}

export default JobComparatorComponent;