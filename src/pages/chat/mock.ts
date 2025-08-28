import type { TChatData } from '../../blocks/chatList/chatItem/types';

export function getMockChatItems(): TChatData[] {
    const names = [
        'kotikocich',
        'ubludich',
        'alex_programmer',
        'maria_designer',
        'john_doe',
        'super_user',
        'cool_cat',
        'tech_guru',
        '111001011001001',
        'PUPA_LUPA',
    ];

    const avatars = [
        'https://distribution.faceit-cdn.net/images/ac1344a1-b569-4a71-b3f7-4942a0436292.jpeg',
        'https://i.pinimg.com/originals/c0/2d/11/c02d11b807f28927def41b6346cb6da0.jpg',
        'https://i.ytimg.com/vi/QABe9JRzgHU/maxresdefault.jpg',
        'https://s1.pearlcdn.com/RU/Upload/Community/6516d8c837d20250704014438211.png',
        'https://avatars.mds.yandex.net/i?id=f6c3956d492e1316ea28735ee079a66f_l-13305210-images-thumbs&n=13',
        'https://i.pinimg.com/originals/42/d5/76/42d576804ac5a5a41b76c6b56c4a0fb3.jpg',
    ];

    const messages = [
        'Привет! Как дела?',
        'Кайф!!!',
        'Короткий посыл',
        'Текст сообщения и бла-бла-бла длинный типо',
        'Увидимся завтра',
        'Отправил тебе файлы',
        'Спасибо за помощь!',
        'Что планируешь на выходные?',
        'Классная идея!',
        'Согласен полностью',
        'Нужно обсудить детали',
        'Всё готово к запуску',
        'Проверь последний коммит',
        'Отличная работа!',
    ];

    const getRandomElement = <T>(array: T[]): T => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const generateRandomTime = (): string => {
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        return `${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`;
    };

    const generateRandomUnreadCount = (): number | undefined => {
        const shouldHaveUnread = Math.random() < 0.4; // 40% вероятность
        return shouldHaveUnread
            ? Math.floor(Math.random() * 20) + 1
            : undefined;
    };

    const generateRandomIsOwn = (): boolean => {
        return Math.random() < 0.3; // 30% вероятность собственного сообщения
    };

    const minChatCount = 30;
    const maxChatCount = 40;
    const chatCount =
        Math.floor(Math.random() * (maxChatCount - minChatCount + 1)) +
        minChatCount;
    const chats: TChatData[] = [];

    for (let i = 0; i < chatCount; i++) {
        const isOwn = generateRandomIsOwn();

        chats.push({
            id: (i + 1).toString(),
            name: getRandomElement(names),
            avatar: getRandomElement(avatars),
            lastMessage: getRandomElement(messages),
            time: generateRandomTime(),
            unreadCount: isOwn ? undefined : generateRandomUnreadCount(),
            isOwn,
        });
    }

    return chats;
}
