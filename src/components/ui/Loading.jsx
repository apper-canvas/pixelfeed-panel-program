const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
      
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-300 rounded-2xl shimmer-loading"></div>
      
      {/* Actions skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded ml-auto"></div>
      </div>
      
      {/* Text skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default Loading;