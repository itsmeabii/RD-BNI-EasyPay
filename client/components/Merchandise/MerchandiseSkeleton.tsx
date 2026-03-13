export default function MerchandiseSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 animate-pulse">
          <div className="w-full aspect-square bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-8 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}