import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { BASE_URL } from "../../BASE_URL";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

interface StreamItem {
  _id: string;
  type: "Announcement" | "Assignment" | "Material" | "Test";
  data: string;
  createdAt: string;
}

const iconMap: Record<StreamItem["type"], string> = {
  Announcement: "📢",
  Assignment: "📝",
  Material: "📘",
  Test: "🧪",
};

const Stream = () => {
  const [post, setPost] = useState("");
  const [items, setItems] = useState<StreamItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [streamType, setStreamType] = useState<
    "Announcement" | "Assignment" | "Material" | "Test"
  >("Announcement");
  const { courseId } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!post.trim()) return;

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/courses/${courseId}/streams`, {
        data: post,
        type: streamType,
      });
      setPost("");
      await fetchStreams(); // Refresh stream
    } catch (err) {
      console.error("Error submitting post:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreams = async () => {
    try {
      const res = await axios.get<{ streams: StreamItem[] }>(
        `${BASE_URL}/courses/${courseId}/streams`
      );
      setItems(res.data.streams || []);
    } catch (err) {
      console.error("Error fetching streams:", err);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, [courseId]);

  return (
    <section className="h-dvh w-full overflow-auto">
      <header>
        <h1 className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] px-10 text-gray-700 py-4 text-lg font-semibold">
          Stream
        </h1>
      </header>

      <main className="px-10 py-4 pb-40 space-y-4 ">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400">No items in stream.</p>
        ) : (
          items
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-4 px-4 py-6">
                  <div className="text-3xl">{iconMap[item.type]}</div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.type}: {item.data}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(item.createdAt), "d MMM yyyy")}
                    </p>
                  </div>
                </div>
                <hr className="border-gray-200" />
              </div>
            ))
        )}
      </main>

      <footer>
        <form
          className="absolute bottom-0 w-full flex items-end pt-6 px-4 pb-8"
          onSubmit={handleSubmit}
        >
          <select
            value={streamType}
            onChange={(e) => setStreamType(e.target.value as typeof streamType)}
            className="border px-2 py-1 rounded mb-2 bg-amber-300 absolute bottom-8 left-6 "
          >
            <option value="Announcement">Announcement</option>
            <option value="Assignment">Assignment</option>
            <option value="Material">Material</option>
            <option value="Test">Test</option>
          </select>

          <textarea
            placeholder="Enter new work"
            className="pb-10 grow focus:outline-0 bg-white shadow-2xl shadow-gray-600 p-4 rounded-sm resize-none"
            rows={4}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>

          <button
            className="
              ml-4 p-3
              bg-violet-500
              hover:bg-violet-600
              text-white
              rounded-full
              border
              shadow-2xl shadow-amber-900
              hover:shadow-lg
              transition-all
              hover:scale-105
              active:scale-95
              active:shadow-sm
            "
            type="submit"
            aria-label="Stream-submit-button"
            disabled={loading}
          >
            🚀
          </button>
        </form>
      </footer>
    </section>
  );
};

export default Stream;
