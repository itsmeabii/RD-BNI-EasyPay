import { ChangeEvent, useRef, useState } from "react";
import { validateFile } from "../helper/TrainerApplicationValidation";

export const TrainerUploadAndDescriptionSection = (): JSX.Element => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxDescriptionLength = 500;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const err = validateFile(file);
    if (err) {
      setFileError(err);
      setSelectedFile(null);
      return;
    }

    setFileError(null);
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length <= maxDescriptionLength) {
      setDescription(value);
    }
  };

  return (
    <section className="absolute top-[290px] left-[790px] w-[345px] h-[400px]">
      <label
        htmlFor="formal-picture-upload"
        className="absolute top-0 left-[7px] h-4 flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[15.6px] whitespace-nowrap"
      >
        Upload a Formal Picture
      </label>

      <div className="absolute top-[22px] -left-px w-[337px] h-[198px] bg-white rounded-[5px] border border-solid border-[#999999]">
        <input
          ref={fileInputRef}
          id="formal-picture-upload"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Upload a formal picture"
        />

        <p className="absolute top-[39px] left-[40px] w-[249px] h-[73px] flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-[#817d7d] text-[10px] text-center tracking-[0] leading-[13.0px]">
          Max file size: 2MB
          <br />
          File format: .jpg, .jpeg, .png
          <br />
          or
        </p>

        <button
          type="button"
          onClick={handleBrowseClick}
          className="absolute top-[137px] left-[40px] w-[254px] h-9 bg-[#d9d9d9] rounded-[5px] border border-solid border-[#999999] shadow-[4px_4px_4px_#00000040] cursor-pointer hover:bg-[#cccccc] transition-colors"
          aria-label="Browse file to upload"
        >
          <span className="flex items-center justify-center w-full h-full [font-family:'Inter-Italic',Helvetica] font-normal italic text-black text-[13px] text-center tracking-[0] leading-[16.9px]">
            {selectedFile ? selectedFile.name : "Browse File"}
          </span>
        </button>

        {fileError && (
          <p className="absolute top-[180px] left-[40px] text-red-500 text-[10px]">{fileError}</p>
        )}
      </div>

      <div className="absolute top-[229px] left-[7px] h-4 flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[15.6px] whitespace-nowrap">
        Brief Description
      </div>

      <div className="absolute top-[248px] left-0 w-[335px] h-[137px]">
        <textarea
          id="brief-description"
          value={description}
          onChange={handleDescriptionChange}
          maxLength={maxDescriptionLength}
          placeholder=""
          className="w-full h-full bg-[#d9d9d9] rounded-[5px] border border-solid border-[#999999] shadow-[inset_4px_4px_4px_#00000040] p-2 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[#999999]"
          aria-label="Brief description"
        />
      </div>

      <div
        className="absolute top-[387px] left-[301px] h-[13px] flex items-center justify-center [font-family:'Inter-Regular',Helvetica] font-normal text-[#817d7d] text-[10px] text-center tracking-[0] leading-[13.0px] whitespace-nowrap"
        aria-live="polite"
        aria-atomic="true"
      >
        {description.length}/{maxDescriptionLength}
      </div>
    </section>
  );
};