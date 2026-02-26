import { useState } from "react";
//import { ChevronDown } from "./ChevronDown";

export const TrainerPersonalInfoSection = (): JSX.Element => {
  const [firstName, setFirstName] = useState("Jane Marie");
  const [lastName, setLastName] = useState("Doe");
  const [chapter, setChapter] = useState("");
  const [training, setTraining] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-[290px] left-[362px] w-[361px] h-[382px]"
    >
      <div className="absolute top-0 left-2 w-[69px] h-4 flex">
        <label
          htmlFor="firstName"
          className="flex items-center justify-center w-[67.23px] h-4 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[15.6px]"
        >
          First Name
        </label>
      </div>

      <div className="absolute top-[19px] left-0 w-[347px] h-[42px] bg-[#d9d9d9] rounded-[10px] border border-solid shadow-[inset_0px_4px_4px_#00000040]">
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none px-[21px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#817d7d] text-[15px] tracking-[0] leading-[normal]"
          placeholder="Jane Marie"
        />
      </div>

      <div className="absolute top-[76px] left-2 w-[68px] h-4 flex">
        <label
          htmlFor="lastName"
          className="flex items-center justify-center w-[66.15px] h-4 [font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[15.6px]"
        >
          Last Name
        </label>
      </div>

      <div className="absolute top-24 left-0 w-[347px] h-[42px] bg-[#d9d9d9] rounded-[10px] border border-solid shadow-[inset_0px_4px_4px_#00000040]">
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none px-[21px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#817d7d] text-[15px] tracking-[0] leading-[normal]"
          placeholder="Doe"
        />
      </div>

      <div className="absolute top-[153px] left-2 w-[50px] h-4 flex items-center justify-center">
        <label
          htmlFor="chapter"
          className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[15.6px]"
        >
          Chapter
        </label>
      </div>

      <div className="absolute top-[175px] left-0 w-[347px] h-10 rounded-[10px] border border-solid border-[#999999] shadow-[inset_0px_4px_4px_#00000040]">
        <select
          id="chapter"
          name="chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none px-[13px] appearance-none [font-family:'Inter-Regular',Helvetica] font-normal text-[#817d7d] text-[15px] text-center tracking-[0] leading-[19.5px]"
        >
          <option value="">Select Chapter</option>
        </select>
      </div>

      {/* <ChevronDown className="!absolute !top-[178px] !left-[303px] !w-[31px] !h-[31px] !aspect-[1] pointer-events-none" /> */}

      <div className="absolute top-[230px] left-2 w-[111px] h-4 flex items-center justify-center">
        <label
          htmlFor="training"
          className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-xs text-center tracking-[0] leading-[15.6px]"
        >
          Preferred Training
        </label>
      </div>

      <div className="absolute top-[248px] left-0 w-[347px] h-10 rounded-[10px] border border-solid border-[#999999]">
        <select
          id="training"
          name="training"
          value={training}
          onChange={(e) => setTraining(e.target.value)}
          className="w-full h-full bg-transparent border-none outline-none px-[13px] appearance-none [font-family:'Inter-Regular',Helvetica] font-normal text-[#817d7d] text-[15px] text-center tracking-[0] leading-[19.5px]"
        >
          <option value="">Select Training</option>
        </select>
      </div>

      {/* <ChevronDown className="!absolute !top-[251px] !left-[303px] !w-[31px] !h-[31px] !aspect-[1] pointer-events-none" /> */}

      <button
        type="submit"
        className="absolute top-[334px] left-0 w-[347px] h-12 bg-[#cf2031] rounded-[10px] shadow-[4px_4px_4px_#00000040] flex items-center justify-center [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[19.5px] whitespace-nowrap cursor-pointer"
      >
        Send Application
      </button>
    </form>
  );
};