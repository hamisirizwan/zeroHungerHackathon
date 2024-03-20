import React, { useState } from "react";
import TableData from "../../Components/dashboard/TableData";
import AddDonation from "../../Components/dashboard/modals/AddDonation";

export default function Donor() {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <section className="max-w-5xl mx-auto mb-10 p-10 space-y-4">
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-3xl font-semibold">Donor Dashboard</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-block rounded-lg bg-[#4b2114] text-white hover:bg-[#7f3b26] px-5 py-3 text-sm font-medium"
        >
          Add Donation
        </button>
      </div>
      <TableData />
      <AddDonation isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
