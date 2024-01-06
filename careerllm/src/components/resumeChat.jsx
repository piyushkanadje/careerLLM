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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text) return;
    console.log(text);
    setErrorText("");
    setIsResponseLoading(true);

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        // Add your get url for the response from the backend
        "http://localhost:8000/",
        options
      );
      const data = await response.json();

      if (data.error) {
        setErrorText(data.error.message);
        setText("");
      } else {
        setErrorText(false);
      }

      if (!data.error) {
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
          role: message.role,
          content:
            message.content.charAt(0).toUpperCase() + message.content.slice(1),
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
            <div className="containerr">
<section className="sidebarr">
  <div className="sidebar-headerr" onClick={createNewChat} role="button">
    <BiPlus size={20} />
    <button>New Chat</button>
  </div>
  <div className="sidebar-history">
    {uniqueTitles.length > 0 && <p>Today</p>}
    <ul>
      {/* {uniqueTitles?.map((uniqueTitle, idx) => (
        <li key={idx} onClick={() => backToHistoryPrompt(uniqueTitle)}>
          <BiComment />
          {uniqueTitle.slice(0, 18)}
        </li>
      ))} */}
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
  {/* {!currentTitle && (
    <div className="empty-chat-container">
      <img
        src="../public/ChatGPT_logo.svg"
        width={45}
        height={45}
        alt="chat gpt logo"
      />
      <h1>Chat GPT Clone</h1>
      <h3>How can I help you today?</h3>
    </div>
  )} */}
  <div className="main-header">
    <ul>
      {/* {currentChat?.map((chatMsg, idx) => (
        <li key={idx} ref={scrollToLastItem}>
          <img
            src={
              chatMsg.role === "user"
                ? "../public/face_logo.svg"
                : "../public/ChatGPT_logo.svg"
            }
            alt={chatMsg.role === "user" ? "Face icon" : "ChatGPT icon"}
            style={{
              backgroundColor: chatMsg.role === "user" && "#ECECF1",
            }}
          />
          <p>{chatMsg.content}</p>
        </li>
      ))} */}
    </ul>
  </div>
  <div className="main-bottom">
    {errorText && <p className="errorText">{errorText}</p>}
    <form className="form-container" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Send a message."
        spellCheck="false"
        value={
          isResponseLoading
            ? "Loading..."
            : text.charAt(0).toUpperCase() + text.slice(1)
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



