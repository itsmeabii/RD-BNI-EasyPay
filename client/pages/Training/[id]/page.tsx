import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trainings, formatPrice } from "@/data/Training";

export default function TrainingDetail() {
  const { id } = useParams<{ id: string }>();
  const training = trainings.find((t) => t.id === Number(id));

  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  if (!training) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-400 mb-4">Training not found</p>
          <Link to="/training" className="text-bni-red font-semibold hover:underline">
            ← Back to Trainings
          </Link>
        </div>
      </div>
    );
  }

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? training.images.length - 1 : i - 1));
  const nextImage = () =>
    setActiveImage((i) => (i === training.images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Image Gallery */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-sm bg-gray-100 mb-3">
              <img
                src={training.images[activeImage]}
                alt={training.title}
                width={420}
                height={380}
                className="w-full h-[320px] lg:h-[380px] object-cover"
              />
              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {training.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-[60px] h-[60px] flex-shrink-0 overflow-hidden rounded-sm border-2 transition ${
                    activeImage === i ? "border-bni-red" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${training.title} ${i + 1}`}
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1">
            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {training.title}
            </h1>
            {/* Price + status */}
            <div className="flex items-center gap-7 mb-5">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(training.price)}
              </span>
              {training.completed && training.completedDate && (
                <span className="text-green-600 font-semibold text-md">
                  Completed Last {training.completedDate}
                </span>
              )}
            </div>

            {/* Description fields */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold text-gray-800">
                {training.description}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {training.keyTopics}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {training.outcomes}
              </p>
            </div>

            {/* Select Date */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-md font-semibold text-gray-800 whitespace-nowrap">
                Select Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-md text-gray-500 outline-none focus:border-bni-red"
              >
                <option value="">Choose an Option</option>
                {training.dates.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label} - {d.time}
                  </option>
                ))}
              </select>
            </div>

            {/* Instructors carousel */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
              {training.instructors.map((instructor, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-gray-300 border border-gray-200 rounded-lg p-4 max-w-[350px] flex-shrink-0"
                >
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    width={80}
                    height={100}
                    className="w-20 h-24 object-cover rounded flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-black mb-0.5">Name of Instructor:</p>
                    <p className="text-sm font-bold text-black mb-2">
                      {instructor.name}
                    </p>
                    <p className="text-xs font-bold text-black mb-1">
                      Brief Background:
                    </p>
                    <p className="text-xs text-black leading-relaxed">
                      {instructor.background}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="bg-bni-red text-white font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition">
                Add to Cart
              </button>
              <button className="bg-bni-red text-white font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}