// Импортируем модуль Express и сохраняем его в переменную express
const express = require('express');
// Импортируем модуль Express Handlebars и сохраняем его в переменную exphbs
const exphbs = require('express-handlebars');
const path = require('path')
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
    // Устанавливаем 'main' в качестве основного макета для всех шаблонов
    defaultLayout: 'main',
    // Указываем, что расширение файлов шаблонов должно быть '.hbs'
    extname: 'hbs',
    // Разрешаем доступ к свойствам прототипа объектов по умолчанию
    allowProtoPropertiesByDefault: true,
    // Опции времени выполнения для Handlebars
    runtimeOptions: {
        // Разрешаем доступ к свойствам прототипа объектов по умолчанию
        allowProtoPropertiesByDefault: true,
        // Разрешаем вызов методов прототипа объектов по умолчанию
        allowProtoMethodsByDefault: true
    }
});
// Регистрируем движок шаблонов Express Handlebars в приложении Express
app.engine('hbs', hbs.engine);
// Устанавливаем движок шаблонов Express Handlebars в качестве основного движка шаблонов для приложения Express
app.set('view engine','hbs');
// Указываем директорию, где Express будет искать файлы шаблонов
app.set('views','views');
// Включает поддержку парсинга тела запросов с типом контента application/x-www-form-urlencoded.
// Параметр {extended: true} позволяет использовать расширенный парсинг, который поддерживает более сложные структуры данных,
// такие как вложенные объекты и массивы, в отличие от стандартного парсинга, который может обрабатывать только простые пары ключ-значение.
app.use (express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
// Используем маршруты задач (todos) в приложении Express
app.use(TodoRoutes);

// Функция start асинхронно выполняет подключение к базе данных MongoDB с помощью Mongoose
async function start() {
    try {
        // Подключаемся к MongoDB с помощью строки подключения
        await mongoose.connect('mongodb+srv://tom:vadim1988@cluster0.tw0doh9.mongodb.net/todos', {
          
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