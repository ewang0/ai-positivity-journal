"use client";

import { useState, useRef } from "react";
import { useChat, Message } from "ai/react";
import { LoadingCircle, VercelIcon } from "./icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { STRINGS } from "./strings.js"

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [originalInput, setOriginalInput] = useState('');
  const [showResponsePlaceholder, setShowResponsePlaceholder] = useState(true);

  const initialMessages: Message[] = [
    {
      id: '1', 
      role: 'user', 
      content: STRINGS.REQUEST_PROMPT, 
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

  const ButtonLoading = (
    <div className="flex justify-center items-center gap-x-2">
      <p>Loading</p>
      <LoadingCircle /> 
    </div>
  );

  const ResponsePlaceholder = (
    <div className="h-[400px] max-h-[400px] bg-zinc-800 rounded py-3 px-4">
      <p className="text-neutral-500">{STRINGS.RESPONSE_PLACEHOLDER}</p>
    </div>
  );

  return (
    <main className="px-8 sm:px-16 md:px-24">
      <div className="flex flex-col max-w-[880px] m-auto">
        <div className="flex flex-col justify-center items-center w-full py-12 border-b">
          <h1 className="font-mono font-bold mb-5 text-center text-5xl">{STRINGS.TITLE}</h1>
          <p className="font-sans max-w-sm text-center">{STRINGS.BUILT_WITH}</p>
        </div>
        <div className="block text-white text-lg mb-16 mt-8 max-w-3xl">
          {STRINGS.INTRO}
        </div>
        <div className="flex flex-col">
          <div className="block text-white text-lg font-bold mb-4 max-w-3xl">
            {STRINGS.EXAMPLES_HEADER}
          </div>
          <div className="grid grid-cols-2 auto-rows-fr gap-4 sm:grid-cols-3">
            {STRINGS.EXAMPLES.map((example, i) => (
              <button 
                key={i} 
                className="rounded-md border border-neutral-900 text-center text-md bg-zinc-700 p-5 text-left transition-all duration-75 cursor-pointer hover:border-white hover:bg-zinc-600 active:bg-gray-50"
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
                {STRINGS.DESCRIBE_EVENT_HEADER}
              </label>
              <textarea 
                  ref={inputRef}
                  className="bg-white text-gray-700 w-full overflow-y-auto border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white resize-none" 
                  id="grid-first-name" 
                  rows={8}
                  placeholder={STRINGS.DESCRIBE_EVENT_PLACEHOLDER}
                  value={input}
                  required
                  onChange={(e) => setInput(e.target.value)}
              />
            <button 
              onClick={() => {
                setOriginalInput(input);
                setShowResponsePlaceholder(false);
              }} 
              className="flex justify-center items-center w-full rounded text-white font-bold mt-3 py-2 px-4 border-b-4 bg-blue-500 border-blue-700 hover:border-blue-500 hover:bg-blue-400 "
            >
              {isLoading ? ButtonLoading : "Generate Positivity"}
            </button>
          </form>
        </div>
        <div className='grid grid-cols-1 mt-9 md:grid-cols-2'>
          <div className="flex flex-col w-full border-zinc-500 md:pr-6 md:border-r">
            <div className="block text-white text-lg font-bold mb-3">{STRINGS.ORIGINAL_ENTRY_HEADER}</div>
            <div className="">
              <div className="h-[400px] max-h-[400px] overflow-y-auto bg-zinc-800 rounded py-3 px-4">
                {originalInput ? originalInput : <p className="text-neutral-500">{STRINGS.ORIGINAL_ENTRY_PLACEHOLDER}</p>}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full pt-8 md:pl-6 md:pt-0 ">
            <div className="block text-white text-lg font-bold mb-3">{STRINGS.POSITIVE_RESPONSE_HEADER}</div>
            {showResponsePlaceholder ? ResponsePlaceholder :
              <div className="h-[400px] max-h-[400px] overflow-y-auto bg-zinc-800 rounded py-3 px-4">
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
        </div>
        <div className="flex justify-center items-center gap-2 mb-12 mt-16">
          <p>Deployed with <b>Vercel</b></p>
          <VercelIcon />
        </div>
      </div>
    </main>
  );
}
