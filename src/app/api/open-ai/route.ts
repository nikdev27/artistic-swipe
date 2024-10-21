import { Configuration, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server';
import { Message } from '@/utils/types';

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages) {
    throw new Error('No messages found.');
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4-1106-preview',
      temperature: 0.2,
      top_p: 1,
      stream: false,
      messages: messages.map((message: Message) => ({
        content: message.content,
        role: message.role,
      })),
    });
    const json = await response.json();

    const reply = json?.choices?.[0]?.message?.content;

    return NextResponse.json({ reply });
  } catch (error) {
    throw error;
  }
}
