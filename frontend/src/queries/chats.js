"use client";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../utils/axiosConfig";

export function useGetChatHistory() {
  const chatsData = useQuery({
    queryKey: ["chatsData"],
    queryFn: async () => {
      const { data: responseData } = await instance.get("/chat");
      return responseData.data;
    },
    retry: false,
  });

  return chatsData;
}
