// Импортируем Schema и model из библиотеки mongoose для создания схемы и модели
const {Schema, model} = require('mongoose')

// Создаем новую схему с именем 'schema'
const schema = new Schema ({
 // Определяем поле 'title' с типом String и делаем его обязательным
 title: {
    type: String,
    required: true
 },
 // Определяем поле 'completed' с типом Boolean и устанавливаем его значение по умолчанию как false
 completed: {
    type: Boolean,
    default: false
 }
})

// Экспортируем модель 'Todo', созданную на основе схемы 'schema'
module.exports = model ('Todo', schema)