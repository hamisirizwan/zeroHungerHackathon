import React, { useState } from "react";
import { toast } from "sonner";
import { instance } from "../../utils/axiosConfig";
import { useGetChatHistory } from "../../queries/chats";

export default function Chatbot() {
  const { data: chats, refetch } = useGetChatHistory();
  const [user_input, setUserInput] = useState("");
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [isShowChatWithAI, showChatWithAI] = useState(false);

  const chatWithAI = async () => {
    setIsAIThinking(true);
    try {
      setUserInput("");
       await instance.post("/chat", {
        user_input,
      });
      refetch();
      setUserInput("");
      setIsAIThinking(false);
    } catch (error) {
      setIsAIThinking(false);
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      toast.error(errorMessage, {
        position: "top-right",
      });
    }
  };
  return (
    <div className="absolute bottom-5 right-2 flex flex-col items-end z-20">
      {isShowChatWithAI && (
        <div className="w-[22rem] mx-auto p-4">
          {/* Chat Container */}
          <div className="bg-white rounded-lg shadow-md drop-shadow-lg p-4">
            {/* Chat Header */}
            <div className="flex items-center mb-4">
              <div className="ml-3">
                <p className="text-xl font-medium">Your AI Assistant</p>
                <p className="text-gray-500">Online</p>
              </div>
            </div>
            {/* Chat Messages */}
            <div
              className="space-y-4 -2 overflow-y-scroll py-4 px-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300 h-[14rem]"
            >
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width={100}
                  height={100}
                  fill="#009688"
                  className="w-8 h-8 rounded-full"
                >
                  {/* Robot Face */}
                  <circle cx={50} cy={50} r={20} fill="#009688" />
                  <circle cx={50} cy={40} r={2} fill="#fff" />
                  <rect x={47} y={45} width={6} height={10} fill="#fff" />
                  <circle cx={50} cy={65} r={3} fill="#009688" />
                  {/* Robot Eyes */}
                  <circle cx={45} cy={45} r={3} fill="#fff" />
                  <circle cx={55} cy={45} r={3} fill="#fff" />
                  <circle cx={45} cy={45} r={1} fill="#000" />
                  <circle cx={55} cy={45} r={1} fill="#000" />
                  {/* Robot Antennas */}
                  <line
                    x1={50}
                    y1={30}
                    x2={40}
                    y2={20}
                    stroke="#009688"
                    strokeWidth={2}
                  />
                  <line
                    x1={50}
                    y1={30}
                    x2={60}
                    y2={20}
                    stroke="#009688"
                    strokeWidth={2}
                  />
                </svg>
                <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-800">
                    How may I assist you today?
                  </p>
                </div>
              </div>

              {chats &&
                chats.reverse().map((message, index) => (
                  <div key={index}>
                    {message.is_user_message && (
                      <div className="flex items-end justify-end">
                        <div className="bg-blue-500 p-3 rounded-lg">
                          <p className="text-sm text-white">{message.text}</p>
                        </div>
                        <img
                          src="https://pbs.twimg.com/profile_images/1707101905111990272/Z66vixO-_normal.jpg"
                          alt="Other User Avatar"
                          className="w-8 h-8 rounded-full ml-3"
                        />
                      </div>
                    )}

                    {!message.is_user_message && (
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          width={100}
                          height={100}
                          fill="#009688"
                          className="w-8 h-8 rounded-full"
                        >
                          {/* Robot Face */}
                          <circle cx={50} cy={50} r={20} fill="#009688" />
                          <circle cx={50} cy={40} r={2} fill="#fff" />
                          <rect
                            x={47}
                            y={45}
                            width={6}
                            height={10}
                            fill="#fff"
                          />
                          <circle cx={50} cy={65} r={3} fill="#009688" />
                          {/* Robot Eyes */}
                          <circle cx={45} cy={45} r={3} fill="#fff" />
                          <circle cx={55} cy={45} r={3} fill="#fff" />
                          <circle cx={45} cy={45} r={1} fill="#000" />
                          <circle cx={55} cy={45} r={1} fill="#000" />
                          {/* Robot Antennas */}
                          <line
                            x1={50}
                            y1={30}
                            x2={40}
                            y2={20}
                            stroke="#009688"
                            strokeWidth={2}
                          />
                          <line
                            x1={50}
                            y1={30}
                            x2={60}
                            y2={20}
                            stroke="#009688"
                            strokeWidth={2}
                          />
                        </svg>
                        <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                          <p className="text-sm text-gray-800">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              {isAIThinking && (
                <div class="flex space-x-2  items-start">
                  <span class="sr-only">Loading...</span>
                  <div class="h-3 w-3 bg-[#4b2114] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div class="h-3 w-3 bg-[#4b2114] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div class="h-3 w-3 bg-[#4b2114] rounded-full animate-bounce"></div>
                </div>
              )}
            </div>
            {/* Search */}
            <div className="sticky bottom-0 z-10 bg-white border-t border-gray-200 dark:bg-slate-900 dark:border-gray-700 mt-4">
              <div className="max-w-4xl">
                {/* Input */}
                <div className="relative">
                  <textarea
                    className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Ask me anything..."
                    defaultValue={""}
                    value={user_input}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  {/* Toolbar */}
                  <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-slate-900">
                    <div className="flex justify-between items-center">
                      {/* Button Group */}
                      <div className="flex items-center">
                        {/* Mic Button */}
                        <button
                          type="button"
                          className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width={18} height={18} x={3} y={3} rx={2} />
                            <line x1={9} x2={15} y1={15} y2={9} />
                          </svg>
                        </button>
                        {/* End Mic Button */}
                        {/* Attach Button */}
                        <button
                          type="button"
                          className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                        </button>
                        {/* End Attach Button */}
                      </div>
                      {/* End Button Group */}
                      {/* Button Group */}
                      <div className="flex items-center gap-x-1">
                        {/* Mic Button */}
                        <button
                          type="button"
                          className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1={12} x2={12} y1={19} y2={22} />
                          </svg>
                        </button>
                        {/* End Mic Button */}
                        {/* Send Button */}
                        <button
                          onClick={() => chatWithAI()}
                          type="button"
                          className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            className="flex-shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                          </svg>
                        </button>
                        {/* End Send Button */}
                      </div>
                      {/* End Button Group */}
                    </div>
                  </div>
                  {/* End Toolbar */}
                </div>
                {/* End Input */}
              </div>
            </div>
            {/* End Search */}
          </div>
        </div>
      )}
      <button
        onClick={() => showChatWithAI(!isShowChatWithAI)}
        className="block p-0 w-12 h-12 bg-[#4b2114] rounded-full hover:bg-[#743521] active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <svg
          className="w-8 h-auto text-white inline-block"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 3h-2v3H5v-3H3v-1h2v-2c0-2.76 2.24-5 5-5h4c2.76 0 5 2.24 5 5v2h2zM8.5 13.5l2.36 2.36l-1.18 1.18l-1.18-1.18l-1.18 1.18l-1.18-1.18zm7 0l2.36 2.36l-1.18 1.18l-1.18-1.18l-1.18 1.18l-1.18-1.18z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
