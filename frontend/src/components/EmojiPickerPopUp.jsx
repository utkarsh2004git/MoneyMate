import { Image, X } from "lucide-react";
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (emojiData) => {
    onSelect(emojiData?.imageUrl || emojiData?.emoji || "");
    setIsOpen(false);
  };

  return (
   
    <div className="relative  flex flex-col md:flex-row items-start gap-5 mb-6">
      

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-blue-50 text-blue-500 rounded-lg overflow-hidden">
          {icon ? (
            <img src={icon} alt="Category Icon" className="w-8 h-8 object-contain" />
          ) : (
            <Image />
          )}
        </div>
        <p className="text-sm font-medium text-slate-700">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>


      {isOpen && (
        <div className="absolute -top-30 -right-4 z-50">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-full absolute -top-3 -right-3 z-50 cursor-pointer shadow-sm transition-colors"
            aria-label="Close emoji picker"
          >
            <X size={16} />
          </button>
          
          {/* Emoji Picker Component */}
          <div className="shadow-2xl rounded-lg bg-white">
            <EmojiPicker onEmojiClick={handleSelect} />
          </div>

        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;