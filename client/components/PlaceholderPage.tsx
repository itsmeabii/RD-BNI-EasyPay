
interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-bni-gray flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-black mb-6">{title}</h1>
          <p className="text-xl text-gray-700 mb-8">
            This page is under construction. Please continue prompting to fill in the content for this section.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600">
              Let me know what you'd like to see on this page and I'll build it for you!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
