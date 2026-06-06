import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

const DeleteAlert = ({ content, onDelete, onClose }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
        await onDelete();
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      <p className="text-sm ">{content}</p>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          type="button"
          className="p-2 px-3 hover:bg-gray-500 cursor-pointer rounded-md bg-gray-400 duration-200 text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          type="button"
          className="p-2 px-3 hover:bg-red-600 cursor-pointer rounded-md bg-red-500 duration-200 text-white"
        >
          {loading?(
            <>
            Deleting...
            <LoaderCircle className="h-4 w-4 animate-spin"/>
            </>
          ):(
            <>
            Delete
            </>
          )

          }
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
