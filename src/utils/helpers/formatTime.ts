/** Форматирование времени последнего сообщения */
const formatTime = (time?: string): string => {
  if (!time) return '';

  try {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Сегодня - показываем время
      return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (daysDiff === 1) {
      return 'Вчера';
    } else {
      // Дата
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
      });
    }
  } catch (error) {
    return '';
  }
};

export { formatTime };
