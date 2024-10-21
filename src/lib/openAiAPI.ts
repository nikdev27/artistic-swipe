import { Message } from '@/utils/types';

export const fetchChips = async (messages: Message[]) => {
  if (!messages.length) {
    throw new Error('No messages found.');
  }

  try {
    const response = await fetch('/api/open-ai', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    });
    const json = await response.json();
    const reply = json?.reply;
    const jsonString = reply
      ? reply.replaceAll('```', '').replaceAll('```', '').replaceAll('\n', '').replaceAll('json', '')
      : '{}';
    return JSON.parse(jsonString);
  } catch (error) {
    throw error;
  }
};

export const getMessages = () => {};
