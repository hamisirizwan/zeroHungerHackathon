import React from "react";
import { useGetAllDonations } from "../../queries/allDonations";
import { toast } from "sonner";
import { instance } from "../../utils/axiosConfig";
import { useGetReceivedDonations } from "../../queries/received";

export default function Donations() {
  const { data: allDonations, refetch } = useGetAllDonations();
  const { refetch: refetchDonations } = useGetReceivedDonations();

  const handleReceiveDonations = async (itemId) => {
    try {
      const { data: responseData } = await instance.put(
        "/donations/receive/" + itemId
      );

      refetch();
      refetchDonations();
      toast.success(responseData.message, {
        position: "top-center",
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  };
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
        {allDonations.map((donation) => (
          <div
            key={donation._id}
            className="p-4 sm:p-5 bg-white space-y-3 border border-stone-200 rounded-xl shadow-sm "
          >
            <div className="sm:flex sm:gap-x-3">
              <svg
                className="sm:order-2 mb-2 sm:mb-0 flex-shrink-0 w-6 h-6 text-stone-400"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="4"
                >
                  <path d="M44 14L24 4L4 14v20l20 10l20-10z"></path>
                  <path
                    stroke-linecap="round"
                    d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"
                  ></path>
                </g>
              </svg>
              <div className="sm:order-1 grow space-y-1">
                <p className="text-lg md:text-xl font-semibold text-stone-800">
                  {donation.item}
                </p>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-x-2">
              <span className="text-sm leading-5 text-stone-500 truncate">
                {donation.description}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleReceiveDonations(donation._id)}
              className="py-2 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              Receive
            </button>
          </div>
        ))}
      </div>
      {/* End Stats Grid */}
    </>
  );
}
