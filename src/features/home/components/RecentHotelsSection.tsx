import { useRecentHotels } from "../hooks/useRecentHotels";
import { STATUS } from "../../../constants/status";
import MessageCard from "../../../components/MessageCard";
import RecentHotelCard from "../components/RecentHotelCard";

const RecentHotelsSection = () => {
  const { data, status, error, refetch } = useRecentHotels();

  const shouldRenderGrid =
    status === STATUS.SUCCESS && Array.isArray(data) && data.length > 0;

  return (
    <section
      className="px-4 py-6 sm:px-8 lg:px-12 w-full mt-8"
      aria-busy={status === STATUS.LOADING}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-violet-800 mb-4">
        Recently Visited
      </h2>

      <MessageCard
        status={status}
        error={error}
        data={data}
        message="Loading recent hotels..."
        onRetry={refetch}
      />

      {shouldRenderGrid && (
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-5 place-items-center
          "
        >
          {data.map((hotel, index) => (
            <RecentHotelCard key={hotel.hotelId ?? index} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentHotelsSection;
