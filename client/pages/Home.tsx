import ShoppingCartButton from "@/components/ShoppingCartButton";
import Training from "./Training";
import Patterns from "@/components/patterns";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
          {/* Decorative triangular SVG elements */}
          <Patterns
            first="absolute left-1 top-20 lg:top-23 z-20"
            second="absolute left-28 top-0 z-20"
            third="absolute left-28 top-20 lg:top-23 z-20"
          />

          {/* Main BNI 40 Years Image */}
          <div className="bg-bni-gray-200 relative flex items-center justify-center py-12 lg:py-16 px-4">
            <img
              src="/BNI-40-image.svg"
              alt="BNI - Cheers to 40 Years"
              className="w-full max-w-5xl h-auto object-contain z-30"
            />
          </div>
        </section>
        
        {/* Training Section */}
        <section id="training-section" className="min-h-[600px] bg-white relative">
          <Patterns
            first="absolute right-1 top-20 z-0"
            second="absolute right-1 top-0 z-0"
            third="absolute right-28 top-20 z-0"
          />
          <Training />
        </section>
        <ShoppingCartButton count={0} />
      </main>
  </div>
    
  );
}
