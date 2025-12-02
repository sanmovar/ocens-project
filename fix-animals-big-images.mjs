// fix-animals-big-images.mjs
import fs from 'node:fs';

const FILE_PATH = 'public/assets/content.json'; // ← тут укажи свой файл

const raw = fs.readFileSync(FILE_PATH, 'utf8');
const data = JSON.parse(raw);

if (Array.isArray(data.animalsBySea)) {
  data.animalsBySea.forEach((entry) => {
    // у обычных "морей" есть animals, у последнего объекта с id: "animal" — нет
    if (Array.isArray(entry.animals)) {
      entry.animals.forEach((animal) => {
        if (animal.bigImage && typeof animal.bigImage.src === 'string') {
          const oldSrc = animal.bigImage.src;

          // меняем только bigImage: папку и расширение
          let newSrc = oldSrc
            .replace('assets/images/animals/', 'assets/images/animals-big/')
            .replace(/\.png$/i, '.jpg');

          animal.bigImage.src = newSrc;
        }
      });
    }
  });
}

fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

console.log('Готово: bigImage.src обновлён для всех животных.');
