"use client";

import History from "./history";
import { useState, useRef } from "react";
import { useChat, Message } from "ai/react";
import { LoadingCircle, VercelIcon } from "./icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { STRINGS } from "./strings.js"

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [originalInput, setOriginalInput] = useState('');
  const [showResponsePlaceholder, setShowResponsePlaceholder] = useState(true);

  const initialMessages: Message[] = [
    {
      id: '1', 
      role: 'user', 
      content: 'For each following journal entry I send you, please provide the most relevant quote from a famous philosopher, scientist, inventor, writer, artist, musician, activist, comedian, or other historical figure that may provide some guidance and a positive outlook for this specific situation. Please include any supporting comments that are specific to the event described. Please include terminology from the original journal entry in your response. In your response, please provide reassurance and a possible silver lining. Please return the quote in bolded text. Please avoid using first person in your response. If the provided text is not a journal entry, please respond with "Please provide your input in the form of a journal entry."', 
    },
    {
      id: '2',
      role: 'assistant', 
      content: '', 
    },
  ];

  const { messages, input, setInput, handleSubmit, isLoading} = useChat({
    initialMessages: initialMessages,
    onResponse(response) {
      console.log('response:', response);
    },
    onError(err:Error) {
      console.log('error:', err);
    },
    onFinish(message: Message) {
      console.log('message:', message);
    }
  });

  console.log("messages:", messages);

  const ButtonLoading = (
    <div className="flex gap-x-2 justify-center items-center">
      <p>Loading</p>
      <LoadingCircle /> 
    </div>
  );

  const ResponsePlaceholder = (
    <div className="h-[400px] max-h-[400px] bg-zinc-800 rounded py-3 px-4">
      <p className="text-neutral-500">A positive response tailored to your specific situation will appear here.</p>
    </div>
  );

  return (
    <main className="px-16">
      <div className="flex flex-col max-w-[880px] m-auto">
        <div className="flex flex-col justify-center items-center w-full py-12 border-b-2">
          <h1 className="font-mono font-bold mb-5 text-center text-5xl">AI Positivity Journal</h1>
          <p className="font-sans max-w-sm text-center">Built with Next.js, Tailwind CSS, PlanetScale DB, OpenAI streaming, and Vercel AI SDK</p>
        </div>
        <div className="block text-white text-lg mb-16 mt-8 max-w-3xl">
          {STRINGS.INTRO}
        </div>
        <div className="flex flex-col">
          <div className="block text-white text-lg font-bold mb-4 max-w-3xl">
            Try some examples:
          </div>
          <div className="grid grid-cols-2 auto-rows-fr gap-4 sm:grid-cols-3">
            {STRINGS.EXAMPLES.map((example, i) => (
              <button 
                key={i} 
                className="rounded-md border border-black text-center text-md bg-zinc-700 px-5 py-5 text-left transition-all duration-75 hover:border-white hover:bg-zinc-600 active:bg-gray-50 cursor-pointer"
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
        <div>
          <form 
            onSubmit={handleSubmit} 
            className="w-full mt-9"
          >
              <label className="block text-white text-lg font-bold mb-3" htmlFor="username">
                Describe your life event here:
              </label>
              <textarea 
                  ref={inputRef}
                  className="bg-white text-gray-700 w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none" 
                  id="grid-first-name" 
                  rows={8}
                  placeholder={"Ex: “This morning, my car wouldn't start, making me late for an important meeting. As I waited for the tow truck, frustration and anxiety washed over me. It seemed like the day was set to be a disaster from the start.”"}
                  value={input}
                  required
                  onChange={(e) => setInput(e.target.value)}
              />
            <button 
              onClick={() => {
                setOriginalInput(input);
                setShowResponsePlaceholder(false);
              }} 
              className="flex justify-center items-center bg-blue-500 w-full hover:bg-blue-400 mt-3 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              {isLoading ? ButtonLoading : "Generate Positivity"}
            </button>
          </form>
        </div>
        <div className='grid grid-cols-1 mt-9 md:grid-cols-2'>
          <div className="flex flex-col w-full md:pr-6 md:border-r border-zinc-500">
            <div className="block text-white text-lg font-bold mb-3">Original Entry:</div>
            <div className="">
              <div className="h-[400px] max-h-[400px] bg-zinc-800 rounded py-3 px-4">
                {originalInput ? originalInput : <p className="text-neutral-500">Your original journal entry will appear here.</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pt-8 md:pl-6 md:pt-0 ">
            <div className="block text-white text-lg font-bold mb-3">Positive Response:</div>
            {showResponsePlaceholder ? ResponsePlaceholder :
              <div className="h-[400px] max-h-[400px] overflow-auto bg-zinc-800 rounded py-3 px-4">
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
            }
          </div>
          {/* <button className="bg-blue-500 w-full hover:bg-blue-400 mt-[18px] text-white font-bold py-2 px-4 border-b-4 border-blue-700 opacity-50 cursor-not-allowed rounded">
            Save Results
          </button> */}
        </div>
        {/* <History /> */}
        <div className="flex justify-center items-center gap-2 mb-12 mt-16">
          <p>Deployed with <b>Vercel</b></p>
          <VercelIcon />
        </div>
      </div>
    </main>
  );
}
