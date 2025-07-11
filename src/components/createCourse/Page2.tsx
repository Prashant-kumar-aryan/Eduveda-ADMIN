type page2 = {
  file: null | File;
  updateFields: (feilds: Partial<page2>) => void;
};

const Page2 = ({ file, updateFields }: page2) => {
  return (
    <div className="mt-4 px-4">
      {/* Label */}
      <label
        htmlFor="courseImage"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Upload Course Image <span className="text-amber-500">📁⬆️</span>
      </label>

      {/* File Input */}
      <input
        type="file"
        id="courseImage"
        className="w-full cursor-pointer text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-amber-500 file:text-white
                   hover:file:bg-amber-600 transition"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) updateFields({ file: selected });
        }}
      />

      {/* Recommendations */}
      <p className="mt-2 text-sm text-gray-500">
        Recommended image size: <strong>800×600px</strong> | Supported: JPG,
        PNG, JPEG.
      </p>

      {/* Preview */}
      {file && (
        <div className="mt-6 border p-4 rounded-md bg-gray-50 shadow-sm">
          <p className="text-gray-700 font-medium mb-2">Preview</p>
          <div className="text-sm text-gray-600 mb-2">
            <p>
              <strong>File Name:</strong> {file.name}
            </p>
            <p>
              <strong>File Size:</strong> {(file.size / 1024 / 1024).toFixed(2)}{" "}
              MB
            </p>
          </div>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-w-full h-auto rounded-md border"
          />
        </div>
      )}
    </div>
  );
};

export default Page2;
