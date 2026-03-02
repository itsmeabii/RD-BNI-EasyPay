import { Link, useNavigate } from "react-router-dom";

interface TrainingCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  status?: "Completed" | null;
  onAddToCart: (id: number) => void;
}

export default function TrainingCard({
  id,
  title,
  description,
  price,
  image,
  status,
  onAddToCart,
}: TrainingCardProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-col">
      {/* Card Image */}
      <Link to={`/training/${id}`} className="block overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-[228px] h-[229px] sm:h-[220px] lg:h-[240px] object-cover hover:opacity-95 transition-opacity"
        />
      </Link>

      {/* Card Body */}
      <div className="pt-3 pb-4 flex flex-col flex-grow">
        <Link
          to={`/training/${id}`}
          className="block mb-1 hover:text-bni-red transition-colors"
        >
          <h3 className="text-base sm:text-lg font-bold text-black leading-snug">
            {title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
          {description}
        </p>
        {/* Status + Price + Cart */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            {status === "Completed" && (
              <p className="text-green-600 text-xs sm:text-sm font-medium mb-0.5">
                Completed
              </p>
            )}
            <p className="text-sm sm:text-base font-semibold text-black">{price}</p>
          </div>

          <button
            onClick={() => navigate(`/training/${id}`)}
            className="bg-bni-red text-white rounded-full w-9 h-9 flex items-center justify-center hover:opacity-90 transition flex-shrink-0"
            aria-label="Add to cart"
          >
            {/* Cart icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}