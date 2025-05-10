import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { jwtDecode } from "jwt-decode";
import JwtType from "../../types/jwtType";
import { BiSupport } from "react-icons/bi";

const socket = io(`http://localhost:8000`, {
  withCredentials: true,
});

export default function ChatWidget() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ from: string; message: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const token = getTokenFromCookie();

  useEffect(() => {
    socket.on("chat-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtType>(token);
      setUsername(decoded.username);
    }
  }, [token]);

  const sendMessage = () => {
    if (message.trim()) {
      const data = { message, from: username? username : "User" };
      socket.emit("chat-message", data);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-3 md:right-6 z-50">
      <button
        className="bg-yellow-400 text-white rounded-full shadow-[0px_12px_24px_rgba(0,0,0,0.35)] cursor-pointer w-12 h-12 flex items-center justify-center  hover:bg-yellow-500 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <IoChatbubbleEllipsesOutline className="text-2xl" />
      </button>

      {isOpen && (
        <div className="mt-2 w-70  md:w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="p-4 bg-yellow-400 text-white font-semibold text-lg flex items-center gap-2">
            Live Support
            <BiSupport  className="text-2xl"/>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded ${
                  msg.from === "Admin"
                    ? "bg-yellow-100 text-left"
                    : "bg-gray-200 text-right"
                }`}
              >
                <p className="font-medium">{msg.from}</p>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-400 flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-yellow-400 text-white font-semibold px-4 py-1 rounded-md text-sm hover:bg-yellow-500 cursor-pointer transition"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
