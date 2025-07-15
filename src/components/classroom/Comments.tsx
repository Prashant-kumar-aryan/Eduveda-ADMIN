import axios from "axios";
import { useState, useContext, useEffect, type FormEvent } from "react";
import { AuthContext } from "../../context/AuthProvider";
import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../BASE_URL";
import toast from "react-hot-toast";

interface Chat {
  message: string;
  timestamp: string;
  userEmail: string;
  isAdmin: boolean;
}

const Comments = () => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const { email, role } = useContext(AuthContext);
  const { courseId } = useParams();

  const fetchComments = async () => {
    try {
      const res = await axios.get<{ comments: Chat[] }>(
        `${BASE_URL}/courses/${courseId}/comments`
      );
      setChats(res.data.comments || []);
    } catch (err) {
      toast.error("Error fetching comments");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chat.trim()) return;

    const payload: Chat = {
      message: chat,
      timestamp: new Date().toISOString(),
      userEmail: email || "unknown@example.com",
      isAdmin: role === "ADMIN",
    };

    try {
      await axios.post(`${BASE_URL}/courses/${courseId}/comments`, payload);
      setChats((prev) => [...prev, payload]);
      setChat("");
    } catch (err) {
      toast.error("Error posting comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [courseId]);

  return (
    <section className="relative h-full w-full bg-gray-50">
      <header>
        <h1 className="shadow px-10 text-gray-700 py-4 text-lg font-semibold">
          Comments
        </h1>
      </header>

      <main className="px-4 py-4 space-y-2 h-[70vh] overflow-auto flex flex-col">
        {chats.map((chatItem, index) => {
          const name = chatItem.userEmail.split("@")[0];
          const formattedTime = format(new Date(chatItem.timestamp), "hh:mm a");
          const isMine = chatItem.userEmail === email;

          return (
            <div
              key={index}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl shadow ${
                  isMine
                    ? "bg-violet-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                <div className="flex flex-col mb-1">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>{name}</span>
                    {chatItem.isAdmin && (
                      <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-[2px] rounded-full">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {chatItem.userEmail}
                  </span>
                </div>
                <div className="text-sm">{chatItem.message}</div>
                <div
                  className={`text-xs mt-1 ${
                    isMine ? "text-purple-200" : "text-gray-400"
                  } text-right`}
                >
                  {formattedTime}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="absolute bottom-5 w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="relative border rounded-2xl w-8/12 mx-auto"
        >
          <input
            type="text"
            className="px-10 py-5 w-full focus:outline-0 rounded-2xl"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            placeholder="Type your comment..."
          />
          <button
            type="submit"
            className="p-5 bg-amber-500 absolute right-0 top-0 bottom-0 rounded-r-2xl active:bg-amber-900 active:scale-95"
          >
            <SendIcon className="text-white" />
          </button>
        </form>
      </footer>
    </section>
  );
};

export default Comments;
