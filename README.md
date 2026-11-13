# ДЗ №12 — пошук зображень Pixabay

Проєкт на основі goitacademy/goit-js-hw-template: Vite, Axios, iziToast,
SimpleLightbox та CSS-індикатор із колекції vineethtrv/css-loader.

## Локальний запуск

1. `npm ci`
2. Скопіюйте `.env.example` у `.env` у корені проєкту.
3. Запишіть ключ після `VITE_PIXABAY_API_KEY=` у `.env`.
4. `npm run dev`

Ключ не включено в репозиторій. Vite додає його до клієнтської збірки, тому
відвідувачі опублікованого сайту можуть побачити його в запитах.

## Перевірка

`npm run format:check` та `npm run build`.

Перевірте порожній запит, пошук фотографій, відсутність результатів, помилку
мережі, приховування лоадера й відкриття модального вікна.

## GitHub Pages

У Settings → Secrets and variables → Actions створіть repository secret
`VITE_PIXABAY_API_KEY` зі своїм ключем. У Settings → Pages оберіть Source →
GitHub Actions. Запустіть workflow Build and deploy to GitHub Pages.

Без ключа інтерфейс збирається, але реальний пошук недоступний.

- Репозиторій: https://github.com/MykhailoSlonskyi/goit-js-hw-12
- Адреса після деплою: https://mykhailoslonskyi.github.io/goit-js-hw-12/

## Модуль 12

async/await, по 15 фотографій за запит, Load more, кінець колекції за totalHits
і плавне прокручування. Новий пошук починається зі сторінки 1; після мережевої
помилки можна повторити дозавантаження тієї самої сторінки.
