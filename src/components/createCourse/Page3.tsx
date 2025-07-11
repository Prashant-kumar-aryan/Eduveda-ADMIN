type InstructorData = {
  name: string;
  title: string;
  experience: string;
  bio: string;
};

type Page3Props = {
  originalPrice: number;
  discountPercent: number;
  currency: string;
  instructor: InstructorData;
  updateFields: (fields: Partial<Page3Props>) => void;
};

const Page3 = ({
  originalPrice,
  discountPercent,
  currency,
  instructor,
  updateFields,
}: Page3Props) => {
  const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;

  return (
    <section className="p-6 overflow-y-auto flex-1 bg-white space-y-6">
      {/* Price Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Pricing</h3>

        <label className="block text-gray-700 mb-1">Original Price</label>
        <input
          type="number"
          value={originalPrice === 0 ? "" : originalPrice}
          onChange={(e) => {
            updateFields({
              originalPrice: Number(e.target.value),
            });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter original price"
          min={0}
        />

        <label className="block text-gray-700 mt-4 mb-1">Discount (%)</label>
        <input
          type="number"
          value={discountPercent === 0 ? "" : discountPercent}
          onChange={(e) =>
            updateFields({
              discountPercent: Math.min(
                100,
                Math.max(0, Number(e.target.value) || 0)
              ),
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter discount percentage"
          min={0}
          max={100}
        />

        <label className="block text-gray-700 mt-4 mb-1">Currency</label>
        <input
          type="text"
          readOnly
          value={currency}
          onChange={(e) => updateFields({ currency: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="INR, USD etc."
        />
        <p className="mt-4 text-red-700 font-medium">
          Orignal Price:{" "}
          <span className="font-bold line-through">
            {currency} {originalPrice.toFixed(2)}
          </span>
        </p>
        <p className="mt-4 text-yellow-700 font-medium">
          Discounted Price:{" "}
          <span className="font-bold ">
            {currency} {finalPrice.toFixed(2)}
          </span>
        </p>
        <p className="mt-4 text-green-700 font-medium">
          Final Price:{" "}
          <span className="font-bold">
            {currency} {finalPrice.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Instructor Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Instructor Info
        </h3>

        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={instructor.name}
          onChange={(e) =>
            updateFields({
              instructor: { ...instructor, name: e.target.value },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Instructor's name"
          required
        />

        <label className="block text-gray-700 mt-4 mb-1">Title</label>
        <input
          type="text"
          value={instructor.title}
          onChange={(e) =>
            updateFields({
              instructor: { ...instructor, title: e.target.value },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Instructor's title"
          required
        />

        <label className="block text-gray-700 mt-4 mb-1">Experience</label>
        <input
          type="text"
          value={instructor.experience}
          onChange={(e) =>
            updateFields({
              instructor: { ...instructor, experience: e.target.value },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g. 10 years"
          required
        />

        <label className="block text-gray-700 mt-4 mb-1">Bio</label>
        <textarea
          value={instructor.bio}
          onChange={(e) =>
            updateFields({
              instructor: { ...instructor, bio: e.target.value },
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Short bio"
          required
        />
      </div>
    </section>
  );
};

export default Page3;
