import { Star } from "lucide-react";

interface RewardCardProps {
  imageUrl?: string;
  description: string;
}

function RewardCard({ imageUrl, description }: RewardCardProps) {
  return (
    <div className="w-full border border-black p-4 md:p-[16px_16px_18px_16px] flex flex-col md:flex-row gap-4 md:gap-6 items-start">
      {/* Reward Image */}
      <div className="w-full md:w-[135px] h-[126px] bg-[#D9D9D9] flex items-center justify-center flex-shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt="Reward" className="w-full h-full object-cover" />
        ) : (
          <span className="text-black text-[18px]">Reward img</span>
        )}
      </div>

      {/* Description and Button */}
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        <div className="text-black text-[16px] md:text-[18px] flex-1">
          {description}
        </div>
        <button className="w-full md:w-[184px] h-[46px] bg-bni-red text-white font-black text-[18px] hover:bg-bni-red/90 transition-colors flex items-center justify-center">
          Redeem
        </button>
      </div>
    </div>
  );
}

export function Rewards() {
  const rewards = [
    { description: "Reward Description" },
    { description: "Reward Description" },
    { description: "Reward Description" },
    { description: "Reward Description" },
  ];

  return (
    <div className="w-full max-w-[1063px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] md:text-[35px] font-semibold text-black">
          Rewards
        </h2>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-black fill-current" />
          <span className="text-[14px] md:text-[16px] text-black">
            20 Stars Available to Redeem
          </span>
        </div>
      </div>

      {/* Reward Cards */}
      <div className="flex flex-col gap-[15px]">
        {rewards.map((reward, index) => (
          <RewardCard key={index} description={reward.description} />
        ))}
      </div>
    </div>
  );
}
