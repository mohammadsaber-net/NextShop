export default function ProductsFallback() {
  return (
    <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}