import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useGetDonations } from "../../../queries/donations";
import { toast } from "sonner";
import { instance } from "../../../utils/axiosConfig";

export default function AddDonation({ isOpen, setIsOpen }) {
  const { refetch } = useGetDonations();

  const [isMakingDonation, setIsMakingDonation] = useState(false);

  const [donationFormData, setDonationFormData] = useState({
    item: "",
    quantity: "",
    description: "",
  });

  const handleAddDonation = async (event) => {
    event.preventDefault();
    setIsMakingDonation(true);
    try {
      const { data: responseData } = await instance.post(
        "/donations/post",
        donationFormData
      );

      refetch();
      setIsMakingDonation(false);
      setDonationFormData({
        item: "",
        quantity: "",
        description: "",
      });
      toast.success(responseData.message, {
        position: "top-center",
      });
      setIsOpen(false);
    } catch (error) {
      setIsMakingDonation(false);
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      toast.success(errorMessage, {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Add Donation
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                      ></path>
                    </svg>
                  </button>
                  <form
                    onSubmit={(e) => handleAddDonation(e)}
                    className="mt-2 space-y-2"
                  >
                    <div>
                      <label
                        htmlFor="item-name"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Item Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="item-name"
                          id="item-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Name of the item"
                          value={donationFormData.item}
                          onChange={(e) =>
                            setDonationFormData((prevState) => ({
                              ...prevState,
                              item: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Quantity
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          min={1}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Item quantity"
                          value={donationFormData.quantity}
                          onChange={(e) =>
                            setDonationFormData((prevState) => ({
                              ...prevState,
                              quantity: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={donationFormData.description}
                          onChange={(e) =>
                            setDonationFormData((prevState) => ({
                              ...prevState,
                              description: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium bg-[#4b2114] text-white hover:bg-[#7f3b26] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {isMakingDonation && (
                          <span className="w-4 h-4 border-2 border-dashed rounded-full animate-spin"></span>
                        )}
                        {isMakingDonation ? "Donating..." : "Donate"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
