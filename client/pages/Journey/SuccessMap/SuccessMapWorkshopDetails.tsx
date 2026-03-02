import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { WORKSHOP_SERIES } from "@/data/Journey";

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month") ?? "";
  const monthQuery = month ? `?month=${month}` : "";

  const training = WORKSHOP_SERIES.find((t) => String(t.id) === id);

  if (!training) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Workshop not found.</p>
      </div>
    );
  }

  const currentIndex = WORKSHOP_SERIES.findIndex((t) => String(t.id) === id);
  const prevTraining = WORKSHOP_SERIES[currentIndex - 1];
  const nextTraining = WORKSHOP_SERIES[currentIndex + 1];

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative p-10"
    >
    <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/56747f665c7ffb39e050d8f6bcf34d3cda136a5e?width=2127"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
    />
      {/* Parchment overlay */}
      <div className="absolute inset-0 bg-[#f5ead0]/60" />

      <div className="flex flex-col relative z-10 mx-auto py-10 gap-10">
        <div className="relative flex items-center justify-center mb-8">
            {/* BNI Logo */}
            <div className="absolute left-0">
                <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ae73058432eb4af3969aac6ab283cae135b1c6f5?width=304"
                alt="BNI Taguig"
                className="w-30 h-auto"
                />
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-black text-center text-[#CF2031] tracking-wide uppercase px-36">
                {training.title}
            </h1>
        </div>

        {/* Description */}
        <section className="mb-6 text-center">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-widest text-gray-900 mb-3">
            Description
          </h2>
          <p className="text-md md:text-lg text-gray-800 leading-relaxed">
            {training.description}
          </p>
        </section>

        {/* Learning Objectives */}
        <section className="mb-6 text-center">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-widest text-gray-900 mb-3">
            Learning Objectives
          </h2>
          <p className="text-md md:text-lg text-gray-800 leading-relaxed">
            {training.learningObjectives}
          </p>
        </section>

        {/* Who Is This For */}
        <section className="mb-8 text-center">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-widest text-gray-900 mb-3">
            Who Is This For?
          </h2>
          <ul className="inline-block text-left text-md md:text-lg text-gray-800 space-y-1">
            {training.whoIsThisFor.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Register Button */}
        <div className="flex justify-center mb-10">
          <button className="bg-[#8B1A1A] hover:bg-[#CF2031] text-white text-xs md:text-sm font-bold tracking-widest uppercase px-8 py-3 rounded-full transition-colors shadow-md">
            I want to REGISTER for this workshop!
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1 text-xs text-gray-600 underline">
            <button onClick={() => navigate(`/success-treasure-map${monthQuery}`)} className="hover:text-gray-900">
              Back to homepage
            </button>
            {prevTraining && (
              <button onClick={() => navigate(`/success-treasure-map/${prevTraining.id}${monthQuery}`)} className="hover:text-gray-900">
                Previous page
              </button>
            )}
            {nextTraining && (
              <button onClick={() => navigate(`/success-treasure-map/${nextTraining.id}${monthQuery}`)} className="hover:text-gray-900">
                Next page
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}