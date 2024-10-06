const fs = require("fs");
const path = require("path");

// Función recursiva para encontrar archivos JSON en subdirectorios
function findJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Si es una carpeta, llamamos recursivamente a la función
      findJsonFiles(filePath, fileList);
    } else if (file.endsWith(".json")) {
      // Si es un archivo JSON, lo añadimos a la lista
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Función para verificar si un archivo JSON contiene la llave 'red-social'
function hasRedSocialKey(filePath) {
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return Object.prototype.hasOwnProperty.call(jsonData, "red-social");
}

// Test
describe('Verificar si los archivos JSON contienen la llave "red-social"', () => {
  const folderPath = path.join(__dirname, "../public/data"); // Ruta a tu carpeta de JSON
  const jsonFiles = findJsonFiles(folderPath); // Buscar todos los archivos JSON

  jsonFiles.forEach((file) => {
    test(`Verificar el archivo ${file}`, () => {
      const result = hasRedSocialKey(file);
      expect(result).toBe(true); // El test pasará si la llave 'red-social' está presente
    });
  });
});
