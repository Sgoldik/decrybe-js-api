# Decrybe-js-api
Decrybe-js-api - репозиторий для работы с функциями смарт-контракта Decrybe.

Функции следующие:
- signUp - функция регистрации
- createTask - функция создания задания
- taskUpdate - функция обновления информации о задании
- userUpdate - функция обновления информации о пользователе
- hireFreelancer - функция найма фрилансера
- reportCompleteTask - функция доклада о выполнении работы
- acceptWork - функция одобрения/отклонения выполненной работы
- moveDeadline - функция смещения дедлайна
- voteTask - функция изменения рейтинга таска
- reportUser - репорт пользователя
- openTaskDispute - открытие диспута
- voteTaskDispute - голосование в диспуте
- taskDisputeMessage - оставление сообщений в диспуте
- cancelTask - отмена таска (закрытие)

## signUp
Функция регистрации

Аргументы функции:
- data - объект с данными (name, bio, avatar и т.д.) (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
let data = {
    name: "Адиль Сырберг",
    avatar: "",
    bio: "Сам по себе Олег"
}
decrybe.signUp(data, nodeUrl, seed, dAppAddress)
```
Если в консоли мы получаем id транзакции, то транзакция прошла успешно.
Если же в консоли сообщение об ошибке с детальным описанием, то транзакция не попала в блокчейн. Нужно логи смотреть.

Возможные ошибки:
- Если юзер уже зарегистрирован, то вернется ошибка "User already exist"

## createTask
Функция создания задания

Аргументы функции:
- uuid - уникальный id (string)
- expiration - время, через которое задание истечен с минутах (int)
- data - информация о задании (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)
- price - плата за выполнение задания (комиссия decrybe берется сразу из этой цены)

Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
let uuid = "9cc4e627-2126-41a7-a7ce-e3ca4748c705"
let data = {
    title: "Название",
    createTime: 1577983311510,
    expireTime: 1577983311511, // timestamp
    currency: "Waves", // валюта
    brief: "Краткое описание",
    uuid: uuid,
    tags: ["pleg", "test"],
    updatedAt: 1577983311510, // timestamp можно юзать Data.now(),
    description: "Описание",
    category: 1 // категория от 1 до 6
}
let price = 1 // по итогу фрилансер получит 0,98, т.к. decrybe 2% забирает
let expiration = "3600"
decrybe.createTask(uuid, expiration, data, nodeUrl, seed, dAppAddress, price)
```

Возможные ошибки:
- Если используется не waves в качестве оплаты, то оплата не пройдет (параметр currency в объекте data не считается)
- Если оплата = 0, то функция не пройдет
- Если задание с таким uuid уже есть, то вернется ошибка
- Если юзер, вызывающий функцию не зарегистрирован, то вернется ошибка

## taskUpdate
Функция, обновляющая информацию о задании

Аргументы функции:
- taskid - уникальный id (string)
- expiration - время, через которое задание истечен с минутах (int)
- data - информация о задании (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
let uuid = "9cc4e627-2126-41a7-a7ce-e3ca4748c705"
let data = {
    title: "Обновленное Название",
    createTime: 1577983311510, // timestamp
    expireTime: 1577983311511, // timestamp
    currency: "Waves", // валюта
    brief: "Краткое описание",
    uuid: uuid,
    tags: ["pleg", "test"],
    updatedAt: Date.now(),
    description: "Описание",
    category: 1 // категория от 1 до 6
}
decrybe.taskUpdate(uuid, data, nodeUrl, seed, dAppAddress)
```

Возможные ошибки:
- Если юзер не зарегистрирован, то ошибка будет вида "User not signup"
- Если задания с таким uuid не существует, то "Task doesnt exist"
- Если юзер, вызывающий функцию не автор, то "You're not author"
- Если статус задания != featured, то "Editing tasks is not available after hiring a freelancer"

