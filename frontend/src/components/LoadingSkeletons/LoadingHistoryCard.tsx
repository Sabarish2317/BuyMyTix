const LoadingHistoryCard = () => {
  return (
    <div
      className="ticket-tile-container flex flex-row gap-3 min-w-[300px] max-w-[450px] 
      rounded-xl p-[10px] items-center select-none transition-all text-gray bg-white/5 animate-pulse"
    >
      {/* Poster Skeleton */}
      <div className="relative w-[80px] md:w-[100px] lg:w-[120px] flex-shrink-0">
        <div className="w-full aspect-3/4 bg-gray-700 rounded-md" />
      </div>

      {/* Details Skeleton */}
      <div className="flex flex-col gap-2 w-full">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="h-5 bg-gray-700 rounded w-1/2" />
          <div className="h-6 w-6 bg-gray-700 rounded-md" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded-full" />
          <div className="h-4 bg-gray-700 rounded w-3/4" />
        </div>

        {/* Ticket details */}
        <div className="flex justify-between text-sm">
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 bg-gray-700 rounded-full" />
            <div className="h-4 bg-gray-700 rounded w-12" />
          </div>
          <div className="h-4 bg-gray-700 rounded w-12" />
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 bg-gray-700 rounded-full" />
            <div className="h-4 bg-gray-700 rounded w-12" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[2px] bg-gray-600" />

        {/* Show Time */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-700" />
          <div className="h-4 bg-gray-700 rounded w-1/3" />
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="rounded-full w-5 h-5 bg-gray-700" />
          <div className="h-4 bg-gray-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default LoadingHistoryCard;
