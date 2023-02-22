import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryElements = document.querySelector('.gallery');

let modal; // оголошуємо змінну modal в глобальному контексті

// Формуємо розмітку галереї на основі масиву даних
const createGalleryMarkup = galleryItems => {
    return galleryItems
    .map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
            />
        </a>
        </div>
        `;
    })
    .join('');
};

// Рендеримо розмітку галереї
galleryElements.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

// Відкриваємо модальне вікно з великим зображенням
galleryElements.addEventListener('click', event => {
    event.preventDefault(); // Забороняємо стандартну дію по кліку на посиланні

    // Перевіряємо, що клікнуто на зображенні
    if (event.target.nodeName !== "IMG") {
        return;
    }

    // Отримуємо url великого зображення з data-атрибута
    const originalImageUrl = event.target.dataset.source;

    // Відкриваємо модальне вікно з великим зображенням
    modal = basicLightbox.create(`
        <div>
            <img src="${originalImageUrl}" width="832" height="554" />
        </div>
    `);

    modal.show();

  document.addEventListener('keydown', escapeListener);
  
  // Закриваємо модальне вікно при кліку на велике зображення
modal.element().addEventListener('click', event => {
  if (event.target.nodeName === 'IMG') {
    modal.close();
  }
});

});

// Закриваємо модаль після натискання клавіші Escape
function escapeListener(event) {
  if (event.code === 'Escape' && modal) {
    modal.close();
    document.removeEventListener('keydown', escapeListener);
  }
}

// Закриваємо модальне натискання за межами модального вмісту
if (modal) {
  modal.on('close', () => {
    document.removeEventListener('keydown', escapeListener);
  });
}
