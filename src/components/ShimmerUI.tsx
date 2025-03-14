function ShimmerUI() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
        ))}
      </div>
      <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
    </div>
  );
}

export default ShimmerUI;
