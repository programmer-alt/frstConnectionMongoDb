// Импортируем модуль Express и сохраняем его в переменную express
const express = require('express');
const exphbs = require('express-handlebars')

// Импортируем модуль Mongoose и сохраняем его в переменную mongoose
const mongoose = require('mongoose');
const TodoRoutes = require ('./routes/todos')

// Определяем переменную PORT, которая будет использоваться для прослушивания порта сервера.
// Если в окружении установлена переменная среды PORT, используем ее значение, иначе используем  3000.
const PORT = process.env.PORT ||  3000;

// Создаем новый экземпляр приложения Express и сохраняем его в переменную app
const app = express();
const hbs = exphbs.create ({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(TodoRoutes)

// Функция start асинхронно выполняет подключение к базе данных MongoDB с помощью Mongoose
async function start () {
    try {
        // Подключаемся к MongoDB с пустым URL, что некорректно и должно быть исправлено
        await mongoose.connect('mongodb+srv://tom:vadim1988@cluster0.tw0doh9.mongodb.net/todos', {
            // Включаем новый парсер URL для обработки строк подключения
            useNewUrlParser: true,
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