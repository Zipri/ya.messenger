const fakeNavigate = (page: string) => {
  // Создаем временную невидимую кнопку для навигации
  const tempButton = document.createElement('button');
  tempButton.setAttribute('data-page', page);
  tempButton.style.position = 'absolute';
  tempButton.style.left = '-9999px';
  tempButton.style.opacity = '0';

  // Добавляем в DOM, кликаем, удаляем
  document.body.appendChild(tempButton);
  tempButton.click();
  document.body.removeChild(tempButton);
};

export default fakeNavigate;
