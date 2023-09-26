import Notiflix from 'notiflix'; // Імпорт бібліотеки Notiflix

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Функція для створення промісу з заданою затримкою
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Функція для обробки події сабміту форми
function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    // Створюємо проміс зі збільшенням затримки для кожного наступного промісу
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        // Виводимо повідомлення про виконаний проміс
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // Виводимо повідомлення про відхилення промісу
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

// Додаємо обробник події сабміту форми
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
