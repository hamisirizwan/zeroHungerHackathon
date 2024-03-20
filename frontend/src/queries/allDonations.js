"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosConfig";

export function useGetAllDonations() {
  const allDonationsData = useQuery({
    queryKey: ["allDonationsData"],
    queryFn: async () => {
      const { data: responseData } = await instance.get("/donations/get-all");
      return responseData.data;
    },
    retry: false,
  });

  return allDonationsData;
}
