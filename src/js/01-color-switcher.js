const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

// Функція для генерації випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

// Функція для зміни кольору фону
function changeBackgroundColor() {
  body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener('click', () => {
  // Забороняємо багаторазове натискання кнопки "Start"
  startButton.disabled = true;

  intervalId = setInterval(changeBackgroundColor, 1000); // Запускаємо зміну кольору кожну секунду
});

stopButton.addEventListener('click', () => {
  // Дозволяємо натискання кнопки "Start" знову
  startButton.disabled = false;

  clearInterval(intervalId); // Зупиняємо інтервал для зміни кольору
});
