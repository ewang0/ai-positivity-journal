"use client";

import History from "./history";
import { useRef } from "react";
import { useChat, Message } from "ai/react";
import { VercelIcon, GithubIcon, LoadingCircle, SendIcon } from "./icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { STRINGS } from "./strings.js"

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const initialMessages: Message[] = [
    {
      id: '1', 
      role: 'user', 
      content: 'For each following journal entry I send you, provide the most relevant quote from a famous philosopher, scientist, inventor, writer, artist, musician, activist, comedian, or other historical figure that may provide some guidance and a positive outlook for this specific situation. Include any supporting comments that are specific to the event described. Include terminology from the journal entry in your response. In your response, provide reassurance and a possible silver lining. Return the quote in bolded text.', // Message content
    },
    {
      id: '2',
      role: 'assistant', 
      content: '', 
    },
  ];

  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading} = useChat({
    initialMessages: initialMessages
  });
  console.log("messages:", messages);
  // console.log("messages:", messages);

  const ButtonLoading = (
    <div className="flex gap-x-2 justify-center items-center">
      <p>Loading</p>
      <LoadingCircle /> 
    </div>
  );

  return (
    <main className="flex flex-col max-w-[1080px] m-auto">
      <div className="flex flex-col justify-center items-center w-full py-12 border-b-2">
        {/* <img src="vercel.svg" className="bg-white"/> */}
        <h1 className="font-mono font-bold mb-5 text-center text-5xl">AI Positivity Journal</h1>
        <p className="font-sans max-w-sm text-center">Built with Next.js, Tailwind CSS, PlanetScale DB, OpenAI streaming, and Vercel AI SDK</p>
      </div>
      <div className="block text-white text-lg font-bold mb-10 mt-8 max-w-3xl">
        {STRINGS.INTRO}
      </div>
      <div className="flex flex-col">
        <div className="block text-white text-lg font-bold mb-4 mt-8 max-w-3xl">
          Try some examples:
        </div>
        <div className="grid grid-cols-3 gap-4">
          {STRINGS.EXAMPLES.map((example, i) => (
            <button 
              key={i} 
              className="rounded-md border border-black text-center text-md bg-stone-700 px-5 py-5 text-left transition-all duration-75 hover:border-white hover:bg-stone-600 active:bg-gray-50 cursor-pointer"
              onClick={() => {
                setInput(example.content);
                inputRef.current?.focus();
              }}
            >
              {example.title}
            </button>)
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-8'>
        <div>
          <form 
            onSubmit={handleSubmit} 
            className="w-full mt-8"
          >
              <label className="block text-white text-lg font-bold mb-3" htmlFor="username">
                Describe your event here:
              </label>
              <textarea 
                  ref={inputRef}
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
              {isLoading ? ButtonLoading : "Generate Positivity"}
            </button>
          </form>
        </div>
        <div className="flex flex-col w-full pt-8">
          <div className="block text-white text-lg font-bold mb-3">See the bright side here:</div>
          <div className="h-full max-h-[346px] overflow-scroll bg-stone-800 rounded py-3 px-4">
            {messages[messages.length - 1]?.role === "user" ? <LoadingCircle/> : 
              <ReactMarkdown
                  className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // open links in new tab
                    a: (props) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {messages[messages.length - 1]?.role === "assistant" ? messages[messages.length - 1]?.content : ''}
              </ReactMarkdown>
            }
          </div>
          <button className="bg-blue-500 w-full hover:bg-blue-400 mt-[18px] text-white font-bold py-2 px-4 border-b-4 border-blue-700 opacity-50 cursor-not-allowed rounded">
            Save
          </button>
        </div>
      </div>
      <History />
      
    </main>
  );
}
