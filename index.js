// Импортируем модуль Express и сохраняем его в переменную express
const express = require('express');
// Импортируем модуль Express Handlebars и сохраняем его в переменную exphbs
const exphbs = require('express-handlebars');

// Импортируем модуль Mongoose и сохраняем его в переменную mongoose
const mongoose = require('mongoose');
// Импортируем маршруты задач (todos) и сохраняем их в переменную TodoRoutes
const TodoRoutes = require('./routes/todos');

// Определяем переменную PORT, которая будет использоваться для прослушивания порта сервера.
// Если в окружении установлена переменная среды PORT, используем ее значение, иначе используем  3000.
const PORT = process.env.PORT ||  3000;

// Создаем новый экземпляр приложения Express и сохраняем его в переменную app
const app = express();
// Создаем новый экземпляр движка шаблонов Express Handlebars с настройками по умолчанию
const hbs = exphbs.create({
    defaultLayout: 'main', // Устанавливаем основной макет для шаблонов
    extname: 'hbs' // Расширение файлов шаблонов
});
// Регистрируем движок шаблонов Express Handlebars в приложении Express
app.engine('hbs', hbs.engine);
// Устанавливаем движок шаблонов Express Handlebars в качестве основного движка шаблонов для приложения Express
app.set('view engine', 'hbs');
// Указываем директорию, где Express будет искать файлы шаблонов
app.set('views', 'views');

// Используем маршруты задач (todos) в приложении Express
app.use(TodoRoutes);

// Функция start асинхронно выполняет подключение к базе данных MongoDB с помощью Mongoose
async function start() {
    try {
        // Подключаемся к MongoDB с помощью строки подключения
        await mongoose.connect('mongodb+srv://tom:vadim1988@cluster0.tw0doh9.mongodb.net/todos', {
            // Включаем новый парсер URL для обработки строк подключения
            useNewUrlParser: true,
            // Отключаем использование устаревшей опции useUnifiedTopology
            useUnifiedTopology: false
            // Отключаем использование метода findAndModify, который может вызвать проблемы совместимости
        });

        // Запускаем сервер на порту, определенном в переменной PORT
        app.listen(PORT, () => {
            // Выводим сообщение в консоль о том, что сервер успешно запущен
            console.log('Сервер запущен.....');
        });
    } catch (error) {
        // Если во время подключения к базе данных или запуска сервера возникнет ошибка,
        // она будет перехвачена и выведена в консоль
        console.log(error);
    }
}

// Вызываем функцию start для начала процесса подключения к базе данных и запуска сервера
start();