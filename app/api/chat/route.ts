import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const PLANETSCALE_API_KEY = 'your_planetscale_api_key_here';
// const DATABASE_NAME = 'your_database_name';
// const TABLE_NAME = 'your_table_name';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}