import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const socket = io(`http://localhost:8000`, {
  withCredentials: true,
});

export default function AdminChatPanel() {
  const [chat, setChat] = useState<{ from: string; message: string }[]>([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  socket.on("chat-message", (data) => {
    setChat((prev) => [...prev, { from: data.from, message: data.message }]);
  });

  return () => {
    socket.off("chat-message");
  };
}, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat-message", { from: "Admin", message });
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Açılıb-bağlanan düymə */}
      <button
        className="bg-yellow-400 text-white rounded-full cursor-pointer w-12 h-12 flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <IoChatbubbleEllipsesOutline className="text-2xl" />
      </button>

      {/* Chat paneli yalnız isOpen true olduqda göstərilir */}
      {isOpen && (
        <div className="mt-2 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="p-4 bg-yellow-400 text-white font-semibold text-lg">
            Live Chat (Admin Panel)
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded ${
                  msg.from === "Admin" ? "bg-yellow-100 text-right" : "bg-gray-200 text-left"
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
              placeholder="Type your reply..."
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
