"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosConfig";

export function useGetReceivedDonations() {
  const receivedDonationsData = useQuery({
    queryKey: ["receivedDonationsData"],
    queryFn: async () => {
      const { data: responseData } = await instance.get(
        "/donations/user-received"
      );
      return responseData.data;
    },
    retry: false,
  });

  return receivedDonationsData;
}
