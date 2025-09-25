export const trim = (str: string, chars?: string) => {
  // Если chars не передан, используем пробельные символы по умолчанию
  if (chars === undefined) {
    // Удаляем все пробельные символы, включая обычные пробелы, табы, переносы строк и \xA0
    return str.replace(/^[\s\xA0]+|[\s\xA0]+$/g, '');
  }

  // Экранируем специальные символы регулярных выражений
  const escapedChars = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Создаем регулярное выражение для удаления указанных символов с начала и конца
  const regex = new RegExp(`^[${escapedChars}]+|[${escapedChars}]+$`, 'g');

  return str.replace(regex, '');
};
