import Donations from "../../Components/dashboard/Donations";
import { useGetAllDonations } from "../../queries/allDonations";
import { useState } from "react";
import ReceivedDonations from "../../Components/dashboard/ReceivedDonations";

export default function Recipient() {
  const { data: allDonations } = useGetAllDonations();
  const [showMyDonations, setShowMyDonations] = useState(false);
  return (
    <section className="max-w-5xl mx-auto mb-10 p-10 space-y-8">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-3xl font-semibold">Recipient Dashboard</h1>
        {showMyDonations ? (
          <button
            onClick={() => setShowMyDonations(false)}
            className="inline-block rounded-lg bg-[#4b2114] text-white hover:bg-[#7f3b26] px-5 py-3 text-sm font-medium"
          >
            Hide Donations
          </button>
        ) : (
          <button
            onClick={() => setShowMyDonations(true)}
            className="inline-block rounded-lg bg-[#4b2114] text-white hover:bg-[#7f3b26] px-5 py-3 text-sm font-medium"
          >
            My Donations
          </button>
        )}
      </div>

      {showMyDonations ? (
        <ReceivedDonations className="my-6" />
      ) : (
        <div>
          {allDonations?.length > 0 ? (
            <Donations />
          ) : (
            <div className="py-6 text-center">No Donations</div>
          )}
        </div>
      )}
    </section>
  );
}
