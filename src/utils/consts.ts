import { Message } from '@/utils/types';
import { MessageRoles } from '@/utils/enums';

export const promptMessage: Message = {
  id: '1',
  role: MessageRoles.SYSTEM,
  content:
    'I am going to get good chips to get more LIKE images and less DISLIKE images. I will provide you the title and original url of liked images and disliked images. You must return only answer as json format with "chips" field of 1 ~ 3 chip values. These chips should be helpful for my search.',
};
