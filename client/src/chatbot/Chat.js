import { useState } from "react";

export default function Chat() {
  const secretKey = "sec_w2zWAPuDvDlR8K1vx0mdIeXCjzMVC5fI";

  const [files, setFiles] = useState(null);
  // States to be updated when user uploads a file
  const [uploaded, setUploaded] = useState(null);
  const [message, setMessage] = useState(null);
  const [srcId, setSrcId] = useState(null);
  // States to be updated when a user prompts the ai bot
  const [reply, setReply] = useState(null);
  const [prompt, setPrompt] = useState(null);

  // Fired when user uploads a file
  async function handleUpload(e) {
    // 1. Stop default behaviour on form submissino
    e.preventDefault();

    // 2. Make request ready
    const apiUrl = "https://api.chatpdf.com/v1/sources/add-file";

    const data = new FormData();
    try {
      data.set("file", files[0]);
    } catch {
      alert("You must upload a file!");
      return;
    }
    const req = {
      method: "POST",
      body: data,
      headers: {
        "x-api-key": secretKey,
      },
    };

    // 3. Make fetch call
    try {
      // Get response from the server, await blocks the main thread
      const response = await fetch(apiUrl, req);
      // Extract data
      const apiData = await response.json();

      // set src id, and uploaded
      setSrcId(apiData.sourceId);
      setUploaded(true);
      setMessage("File has been uploaded, you can now prompt the tutor!");
    } catch (e) {
      alert("Api is not responding!");
    }
  }

  // When user enters a prompt and clicks enter, this is fired
  async function handleChat(e) {
    // 1. Stop the default behaviour
    e.preventDefault();

    // 2. Make request ready
    // Specify url
    const apiUrl = "https://api.chatpdf.com/v1/chats/message";
    // Specify data
    const data = {
      sourceId: "src_mX8I102536ZivxkYdV9js", // hard coding for now, change this to:
      // sourceId: srcId,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    };
    // Make request
    const request = {
      method: "POST",
      headers: {
        "x-api-key": secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // 3. Do fetch request
    try {
      const apiResponse = await fetch(apiUrl, request);
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        setReply(apiData.content);
        return;
      } else {
        alert("Bad response from the AI bot, try again!");
      }
    } catch (e) {
      alert("Api is not responding!");
    }
  }

  // Another way to use ChatPDF api, by adding our own server as intermdeiary
  // Function for sending user prompt to our server, which will then get response back from chatPDF api
  //   async function handleChat(e) {
  //     e.preventDefault();

  //     const apiUrl = "http://localhost:4000/chatpdf-request";
  //     const data = {
  //     sourceId: "src_mX8I102536ZivxkYdV9js", // hard coding for now, change this to:
  //     // sourceId: srcId,
  //       messages: [
  //         {
  //           role: "user",
  //           content: prompt,
  //         },
  //       ],
  //     };

  //     try {
  //       const apiResponse = await fetch(apiUrl, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });

  //       if (apiResponse.ok) {
  //         const apiData = await apiResponse.json();
  //         setReply(apiData.content);
  //       } else {
  //         alert("Bad response from the AI bot, try again!");
  //       }
  //     } catch (e) {
  //       alert("Api is not responding!");
  //     }
  //   }

  return (
    <div className="tutor">
      <h1>Chat</h1>
      <p>{message}</p>
      <form onSubmit={handleUpload} className="upload-file-form">
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <button>Give to Language model</button>
      </form>

      {true && (
        <form onSubmit={handleChat} className="chat-prompt-form">
          <input
            type="text"
            placeholder="Prompt the tutor..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input type="submit" value="Ask" />
        </form>
      )}

      {reply && (
        <div className="response-section">
          <h2>Response</h2>
          <div className="response">{reply}</div>
        </div>
      )}
    </div>
  );
}
