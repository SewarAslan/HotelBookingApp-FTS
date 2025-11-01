import { useFeaturedDeals } from "../hooks/useFeaturedDeals";
import { STATUS } from "../../../constants/status";
import FeaturedDealCard from "../components/FeaturedDealCard";
import MessageCard from "../../../components/MessageCard";

const FeaturedDealsSection = () => {
  const { data, status, error, refetch } = useFeaturedDeals();

  const shouldRenderGrid =
    status === STATUS.SUCCESS && Array.isArray(data) && data.length > 0;

  return (
    <section
      className="px-4 py-6 sm:px-8 lg:px-12 w-full mt-4"
      aria-busy={status === STATUS.LOADING}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-violet-800 mb-4">
        Featured Deals
      </h2>

      <MessageCard
        status={status}
        error={error}
        data={data}
        message="Loading featured deals..."
        onRetry={refetch}
      />

      {shouldRenderGrid && (
        <div
          className="
              grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-5 place-items-center
          "
        >
          {data.map((deal, index) => (
            <FeaturedDealCard key={deal.hotelId ?? index} deal={deal} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedDealsSection;
