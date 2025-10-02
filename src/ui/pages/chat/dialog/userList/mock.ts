import type { TUserItem } from './userItem';

export const mockUsers: TUserItem[] = [
  {
    id: '123',
    name: 'Вася Пупкин',
    avatar:
      'https://ya-praktikum.tech/api/v2/resources/02c3855a-a536-4a64-9008-2c5a08cef4af/34b2a8d1-d7f6-45a4-a82f-2d0c1b4f3b79_12.png',
    isOwn: true,
  },
  {
    id: '456',
    name: 'Петя Иванов',
    avatar:
      'https://ya-praktikum.tech/api/v2/resources/02c3855a-a536-4a64-9008-2c5a08cef4af/34b2a8d1-d7f6-45a4-a82f-2d0c1b4f3b79_12.png',
  },
  {
    id: '789',
    name: 'Катя Петрова',
    avatar:
      'https://ya-praktikum.tech/api/v2/resources/02c3855a-a536-4a64-9008-2c5a08cef4af/34b2a8d1-d7f6-45a4-a82f-2d0c1b4f3b79_12.png',
  },
];
