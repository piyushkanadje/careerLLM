import { useState, useEffect, useRef } from "react";
import { BiPlus, BiComment, BiUser, BiFace, BiSend } from "react-icons/bi";
import "./resumeChat.css";
function ResumeChat() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const scrollToLastItem = useRef(null);

  const createNewChat = () => {
    console.log("Chat Created")
    setMessage(null);
    setText("");
    setCurrentTitle(null);
  };

  const backToHistoryPrompt = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setText("");
  };

  const submitHandler = async (e)=> {
    // console.log(e);
    e.preventDefault();
    if (!text) return;
    setErrorText("");
    setIsResponseLoading(true);

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: text,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
 
    try {
      // const response = await fetch(
      //   // Add your get url for the response from the backend
      //   "http://127.0.0.1:8000/submitprompt/",
      //   options
      // );
      const dataToSend = new FormData();
      dataToSend.append('prompt', text);
//       const response = await fetch('http://127.0.0.1:8000/submitprompt/', {
//              method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({ prompt: 'your_prompt_here' }),
// });
        const response = await fetch('http://127.0.0.1:8000/submitprompt/', {
            method: 'POST',
            body: dataToSend,
        });
      const data = await response.json();
      // console.log(data.prompt);
      if (data.error) {
        setErrorText(data.error.message);
        setText("");
      } else {
        setErrorText(false);
      }

      if (!data.error) {
        console.log(data);

        //Check your response and send data according here 
        setMessage(data);
        setTimeout(() => {
          scrollToLastItem.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
          });
        }, 1);
        setTimeout(() => {
          setText("");
        }, 2);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsResponseLoading(false);
    }
  };

  useEffect(() => {
    if (!currentTitle && text && message) {
      setCurrentTitle(text);
    }

    if (currentTitle && text && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: text,
        },
        {
          title: currentTitle,
          role: "ai",
          content: message.prompt
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (prevChat) => prevChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((prevChat) => prevChat.title).reverse())
  );
  return (

    <>
      <div >
        <div className="row">
            <div className="col-md-1">
            </div>
            <div className="col-md-10">
            <div className="containerrr">
<section className="sidebarrr">
  <div className="sidebar-headerrr" onClick={createNewChat} role="button">
    <BiPlus size={20} />
    <button>New Chat</button>
  </div>
  <div className="sidebar-historyy">
    {uniqueTitles.length > 0 && <p>Today</p>}
    <ul>
      {uniqueTitles?.map((uniqueTitle, idx) => (
        <li key={idx} onClick={() => backToHistoryPrompt(uniqueTitle)}>
          <BiComment />
          {uniqueTitle.slice(0, 18)}
        </li>
      ))}
    </ul>
  </div>
  <div className="sidebar-info">
    <div className="sidebar-info-upgrade">
      <BiUser />
      <p>pkana006</p>
    </div>
    <div className="sidebar-info-user">
      <BiFace />
      <p>pkana006@careerllm.co</p>
    </div>
  </div>
</section>

<section className="mainn">
  {!currentTitle && (
    <div className="empty-chat-container">
      <img
        src="../../img/log.png"
        width={100}
        height={100}
        alt="CareerLLM logo"
      />
      <h1>CareerLLM</h1>
      <h3>How can I help you today?</h3>
    </div>
  )}
  <div className="main-header">
  <ul>
  {console.log(currentChat)}
  {currentChat?.map((chatMsg, idx) => (
    <li key={idx} ref={scrollToLastItem}>

      <img
        src={
          chatMsg.role === "user"
            ? "../../img/face_logo.svg"
            : "../../img/log.png"
        }
        alt={chatMsg.role === "user" ? "Face icon" : "ChatGPT icon"}
        style={{
          backgroundColor: chatMsg.role === "ai" && "white",
        }}
      />
      <p>{chatMsg.content}</p>
    </li>
  ))}
</ul>
  </div>
  <div className="main-bottom">
    {errorText && <p className="errorText">{errorText}</p>}
    <form className="form-containerr" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Send a message."
        spellCheck="false"
        name ="prompt"
        value={
          isResponseLoading
      ? "Loading..."
      : text
        }
        onChange={(e) => setText(e.target.value)}
        readOnly={isResponseLoading}
      />
      {!isResponseLoading && (
        <button type="submit">
          <BiSend
            size={20}
            style={{
              fill: text.length > 0 && "white",
            }}
          />
        </button>
      )}
    </form>
    <p className="chat-text">
      CareerLLM can make mistakes. Consider checking important
      information.
    </p>
  </div>
</section>
</div>
            </div>
            <div className="col-md-1">
            </div>
        </div>
    </div>

    </>
  );
}

export default ResumeChat;


