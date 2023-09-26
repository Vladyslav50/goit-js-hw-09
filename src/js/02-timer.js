import flatpickr from 'flatpickr'; // Описаний в документації
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
import Notiflix from 'notiflix'; // Імпорт бібліотеки Notiflix

// Отримуємо посилання на HTML-елементи з DOM
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Змінна для збереження інтервалу таймера
let countdownInterval;

// Функція для додавання лідируючого нуля до чисел < 10
const addLeadingZero = value => (value < 10 ? `0${value}` : value);

// Функція для оновлення таймера
const updateTimer = () => {
  // Отримуємо кінцеву дату та поточну дату
  const targetDate = new Date(datetimePicker.value);
  const currentDate = new Date();
  const timeDifference = targetDate - currentDate;
  // Перевіряємо, чи таймер дійшов до кінцевої дати
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    return;
  }

  // Розраховуємо кількість днів, годин, хвилин і секунд залишилось
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  // Оновлюємо відображення таймера з урахуванням лідируючих нулів
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
};

// Обробник події для кнопки "Start"
startButton.addEventListener('click', () => {
  // Спочатку очищаємо попередній інтервал (якщо є)
  clearInterval(countdownInterval);
  // Запускаємо таймер, встановлюючи оновлення кожну секунду
  countdownInterval = setInterval(updateTimer, 1000);
});

// Ініціалізуємо flatpickr для вибору кінцевої дати
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  minDate: 'today',
  onClose(selectedDates) {
    // Обробляємо вибрану дату після закриття вікна вибору дати
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      // alert('Please choose a date in the future.');
      Notiflix.Notify.failure('Please choose a valid future date!'); // Відображення повідомлення за допомогою Notiflix

      // Повідомляємо користувача, якщо обрана дата в минулому
      datetimePicker.value = '';
      startButton.disabled = true;
    } else {
      // Активуємо кнопку "Start", якщо дата в майбутньому
      startButton.disabled = false;
      updateTimer();
    }
  },
});

// Функція для конвертації мілісекунд в дні, години, хвилини і секунди
const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
