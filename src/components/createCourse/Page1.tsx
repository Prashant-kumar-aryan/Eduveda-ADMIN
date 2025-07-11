import { useState } from "react";

type Page1Props = {
  title: string;
  subTitle: string;
  description: string;
  tags: string[];
  overview: { bullets: string[] };
  updateFields: (fields: Partial<Page1Props>) => void;
};

const Page1 = ({
  title,
  subTitle,
  description,
  tags,
  overview,
  updateFields,
}: Page1Props) => {
  const [tagInput, setTagInput] = useState("");
  const [bulletInput, setBulletInput] = useState("");

  const handleTagAdd = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      updateFields({ tags: [...tags, trimmed] });
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    updateFields({ tags: tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleBulletAdd = () => {
    const trimmed = bulletInput.trim();
    if (trimmed) {
      updateFields({
        overview: {
          bullets: [...overview.bullets, trimmed],
        },
      });
      setBulletInput("");
    }
  };

  const handleBulletRemove = (bulletToRemove: string) => {
    updateFields({
      overview: {
        bullets: overview.bullets.filter((b) => b !== bulletToRemove),
      },
    });
  };

  return (
    <section className="p-6 overflow-y-auto bg-white h-full ">
      {/* Title */}
      <div>
        <label className="block text-gray-700 mb-1" htmlFor="courseName">
          Course Name (Title)
        </label>
        <input
          type="text"
          id="courseName"
          value={title}
          onChange={(e) => updateFields({ title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter course name"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="mt-4">
        <label className="block text-gray-700 mb-1" htmlFor="courseSubTitle">
          Course Subtitle
        </label>
        <input
          type="text"
          id="courseSubTitle"
          value={subTitle}
          onChange={(e) => updateFields({ subTitle: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter course subtitle"
          required
        />
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block text-gray-700 mb-1" htmlFor="courseDescription">
          Course Description
        </label>
        <textarea
          id="courseDescription"
          value={description}
          onChange={(e) => updateFields({ description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter course description"
          required
        />
      </div>

      {/* Tags */}
      <div className="mt-4">
        <label className="block text-gray-700 mb-1">Course Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter a tag eg. Live Classes , Tests , PDF materials"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-500"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-2 gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleTagRemove(tag)}
                className="text-red-600 hover:text-red-800"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Bullets */}
      <div className="mt-4">
        <label className="block text-gray-700 mb-1">
          Course Overview Points
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={bulletInput}
            onChange={(e) => setBulletInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter a bullet point"
          />
          <button
            type="button"
            onClick={handleBulletAdd}
            className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-500"
          >
            Add
          </button>
        </div>
        <ul className="mt-2 space-y-1">
          {overview.bullets.map((bullet, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
            >
              <span>{bullet}</span>
              <button
                type="button"
                onClick={() => handleBulletRemove(bullet)}
                className="text-red-600 hover:text-red-800"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page1;
