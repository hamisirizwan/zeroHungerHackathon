"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosConfig";

export function useGetDonations() {
  const donationsData = useQuery({
    queryKey: ["donationsData"],
    queryFn: async () => {
      const { data: responseData } = await instance.get(
        "/donations/user-posted"
      );
      return responseData.data;
    },
    retry: false,
  });

  return donationsData;
}
