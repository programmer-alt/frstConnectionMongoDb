// Импортируем Router из библиотеки express для создания маршрутов
const { Router } = require('express');
// Импортируем модель Todo из файла Todo.js
const Todo = require('../models/Todo');
// Создаем экземпляр роутера
const router = Router();

// Определяем маршрут GET для корневого URL ('/')
router.get('/', async (req, res) => {
    // Используем асинхронную функцию для обработки запроса
    // Получаем все документы из коллекции Todo в базе данных
    const todos = await Todo.find({});
    
    // Отправляем ответ с рендером страницы 'index' и передаем данные в шаблон
    res.render('index', {
        // Заголовок страницы
        title: 'Todo List',
        // Флаг, указывающий, что это главная страница
        isIndex: true,
        // Передаем полученные задачи в шаблон
        todos
    });
});

// Определяем маршрут GET для URL '/create'
router.get('/create', (req, res) => {
    // Отправляем ответ с рендером страницы 'create' и передаем данные в шаблон
    res.render('create', {
        // Заголовок страницы
        title: 'Create todo',
        // Флаг, указывающий, что это страница создания новой задачи
        isCreate: true
    });
});

router.post('/create', async (req, res) => {
    // Создаем новый экземпляр модели Todo с данными из запроса
    console.log(req.body)
    const todo = new Todo ({
        title: 'azazaaza', // Заголовок задачи берется из тела запроса
        
    })
    // Сохраняем созданный объект в базе данных
    await todo.save()
    // Перенаправляем пользователя на главную страницу после успешного сохранения
    res.redirect('/')
})
// Экспортируем созданный роутер для использования в других частях приложения
module.exports = router;