import React from "react";
import { useGetReceivedDonations } from "../../queries/received";

export default function ReceivedDonations() {
  const { data: donations } = useGetReceivedDonations();
  console.log(donations);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Donor
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {donations &&
            donations.map((donation) => (
              <tr
                key={donation._id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {donation.item}
                </th>
                <td className="px-6 py-4">{donation.quantity}</td>
                <td className="px-6 py-4">{donation.description}</td>
                <td className="px-6 py-4">{donation.donor.name}</td>
                <td className="px-6 py-4">
                  {donation.status === "taken" && (
                    <span className="bg-green-600 text-white px-4  rounded-full">
                      {donation.status}
                    </span>
                  )}
                  {donation.status === "pending" && (
                    <span className="bg-yellow-600 text-white px-4  rounded-full">
                      {donation.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <button className="font-medium text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="font-medium text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
