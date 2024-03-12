"use client";

import History from "./history";
import { useRef } from "react";
import { useChat } from "ai/react";
import { VercelIcon, GithubIcon, LoadingCircle, SendIcon } from "./icons";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat();
  console.log("messages:", messages);
  // console.log("messages:", messages);

  return (
    <main className="flex flex-col max-w-[1080px] m-auto">
      <div className="flex flex-col justify-center items-center w-full py-12 border-b-2">
        {/* <img src="vercel.svg" className="bg-white"/> */}
        <h1 className="font-mono font-bold mb-5 text-center text-5xl">AI Positivity Journal</h1>
        <p className="font-sans max-w-sm text-center">Built with Next.js, Tailwind CSS, PlanetScale DB, OpenAI streaming, and Vercel AI SDK</p>
      </div>
      <div className="block text-white text-lg font-bold mb-10 mt-8 max-w-3xl">
        This morning, my car wouldn&apos;t start, making me late for an important meeting. As I waited for the tow truck, frustration and anxiety washed over me. It seemed like the day was set to be a disaster from the start.
      </div>
      <div className='grid grid-cols-2 gap-x-8'>
        <div>
          <form onSubmit={handleSubmit} className="w-full mt-8">
              <label className="block text-white text-lg font-bold mb-3" htmlFor="username">
                Describe your event here:
              </label>
              <textarea 
                  className="bg-white text-gray-700 w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none" 
                  id="grid-first-name" 
                  rows={16}
                  placeholder={"Ex: “This morning, my car wouldn't start, making me late for an important meeting. As I waited for the tow truck, frustration and anxiety washed over me. It seemed like the day was set to be a disaster from the start.”"}
                  value={input}
                  required
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      formRef.current?.requestSubmit();
                      e.preventDefault();
                    }
                  }}
              />
            <button className="flex justify-center items-center bg-blue-500 w-full hover:bg-blue-400 mt-3 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              {isLoading ? <LoadingCircle /> : "Generate Positivity"}
            </button>
          </form>
        </div>
        <div className="flex flex-col w-full pt-8">
          <div className="block text-white text-lg font-bold mb-3">See the bright side here:</div>
          <div className="h-full bg-stone-800 rounded py-3 px-4">
            {messages.length > 0 && messages[1]?.content}
          </div>
          <button className="bg-blue-500 w-full hover:bg-blue-400 mt-4 text-white font-bold py-2 px-4 border-b-4 border-blue-700 opacity-50 cursor-not-allowed rounded">
            Save
          </button>
        </div>
      </div>
      <History />
      
    </main>
  );
}
