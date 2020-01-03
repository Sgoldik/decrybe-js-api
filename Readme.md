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

### Аргументы функции:
- data - объект с данными (name, bio, avatar и т.д.) (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
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

### Возможные ошибки:
- Если юзер уже зарегистрирован, то вернется ошибка **"User already exist"**

## Изменение состояния
После вызова функции в хранилище записывается следующее:
- ключ **bio_{user}** и значение **data**
- ключ **user_blk_{user}** и значение текущей высоты блоков (height)
- ключ **user_sts_{user}** и значение **registered**

## createTask
Функция создания задания

### Аргументы функции:
- uuid - уникальный id (string)
- expiration - время, через которое задание истечен с минутах (int)
- data - информация о задании (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)
- price - плата за выполнение задания (комиссия decrybe берется сразу из этой цены)

### Пример использования:
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

### Возможные ошибки:
- Если используется не waves в качестве оплаты, то оплата не пройдет (параметр currency в объекте data не считается). Ошибка **"Can use waves only at the moment"**
- Если оплата = 0, то функция не пройдет. Ошибка **"Amount must be higher then 0"**
- Если задание с таким uuid уже есть, то вернется ошибка **"Task already exist"**
- Если юзер, вызывающий функцию не зарегистрирован, то вернется ошибка **"User not signup"**

### Изменение состояния
В хранилище записываются следующие значения:
- ключ **author_{uuid}** и значение адреса, вызывающего пользователя
- ключ **block_{uuid}** и значение текущей высоты при вызыве функции
- ключ **expiration_block_{uuid}** и значение истекающего блока (дедлайна)
- ключ **bank_{uuid}** и значение суммы оплаты без коммиссии декрайба
- ключ **status_{uuid}** и значение **featured**
- ключ **datajson_{uuid}** и значение **data**, передаваемое в функцию
- ключ **decrybe_balance** и значение, получаемое по формуле:
`let payment = ((pmtAmount / (1*WAVESLET + DECRYBEFEE)) * WAVESLET) - payment`
, прибавленное к текущему балансу decrybe
- ключ **task_rating_{uuid}** и значение 0

## taskUpdate
Функция, обновляющая информацию о задании

### Аргументы функции:
- taskid - уникальный id (string)
- expiration - время, через которое задание истечен с минутах (int)
- data - информация о задании (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
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

### Возможные ошибки:
- Если юзер не зарегистрирован, то ошибка будет вида **"User not signup"**
- Если задания с таким uuid не существует, то **"Task doesnt exist"**
- Если юзер, вызывающий функцию не автор, то **"You're not author"**
- Если статус задания != featured, то **"Editing tasks is not available after hiring a freelancer"**

### Изменение состояния
После вызова функции, сообщение с ключом **datajson_{uuid}** и значеним **data** перезаписывается

## userUpdate
Функция, обновляющая информацию о пользователе, который её вызывает

### Аргументы функции:
- data - информация о пользователе (object)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
let data = {
    name: "Погодаич",
    avatar: "",
    bio: "Пар-машина"
}
decrybe.userUpdate(data, nodeUrl, seed, dAppAddress)
```

### Возможные ошибки:
- Если пользователь не зарегистрирован, то **"User not signup"**

### Изменение состояния
После вызова функции сообщение с ключом **user_bio_{user}** перезаписывыается

## hireFreelancer
Функция для найма фрилансеров из числа тех, кто привязался к заданию

### Аргументы функции:
- taskId - id задания (string)
- freelancer - адрес фрилансера (string)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let freelancer = "3M5zqsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let taskId = "9cc4e627-2126-41a7-a7ce-e3ca4748c705"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
decrybe.hireFreelancer(taskId, freelancer, nodeUrl, seed, dAppAddress)
```

### Возможные ошибки
- Если задание не существует, то **"Task doesnt exist"**
- Если пользователь не зарегистрирован, то **"Customer not signup"**
- Если фрилансер не зарегистрирован, то **"Freelancer not signup"**
- Если вызывающий функцию не автор задания, то ***"You're not author"**
- Если фрилансер не требуется, то **"Freelancer is no longer required"**
- Если в качестве параметра freelancer используется адрес вызывающего, то **"You can't hire yourself"**
- Если фрилансер не привязывался к заданию (не отправлял сообщения заказчику), то **"The freelancer was not attached to the task"**

### Изменение состояния
После вызова функции в хранилище записывается сообщение с ключом **freelancer_{taskId}** и значением **freelancer**
Статус заявки меняется с **featured** на **in progress**

## reportCompleteTask
Функция для сообщения фрилансером о выполнении работы, данной заказчиком

### Аргументы функции:
- taskId - id задания (string)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let taskId = "9cc4e627-2126-41a7-a7ce-e3ca4748c705"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
decrybe.reportCompleteTask(taskId, nodeUrl, seed, dAppAddress)
```

### Возможные ошибки:
- Если пользователь, вызывающий функцию не зарегистрирован, то **"User not signup"**
- Если пользователь, вызывающий функцию - это автор задания, то **"You are author"**
- Если пользователь, вызывающий функцию не фрилансер этого задания, то **"You are not freelancer"**
- Если статус заявки != in progress, то **"Status must be in progress, now: + status"** (featured, in dispute, pending, completed)
- Если фрилансер не нанян, то **"Task freelancer doesnt exist"**

### Изменение состояния
После вызова функции в хранилище записывается сообщение с ключем **rc_{task}_{freelancer}_stage:{id}** и значением кол-ва сообщений от фрилансера
После вызова статус заявки меняется с **in progress** на **pending**

## acceptWork
Функция для принятия выполненной работы заказчиком

### Аргументы функции:
- taskId - id задания (string)
- complete - true, если работа выполнена, false, если нет (boolean)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let taskId = "9cc4e627-2126-41a7-a7ce-e3ca4748c705"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
let complete = true;
decrybe.acceptWork(taskId, complete, nodeUrl, seed, dAppAddress)
```

### Возможные ошибки
- Если пользователь, который вызывает функцию не зарегистрирован, то **"Sender not signup"**
- Если задания не существует, то **"Task doesnt exist"**
- Если пользователь, который вызывает функцию не автор, то **"You are not author"**
- Если статус заявки != pending, то **"Freelancer doesnt complete the task"**

### Изменение состояния
Если передается в качестве параметра complete **true**, то:
- статус задания изменится с **pending** на **completed**
- рейтинг фрилансера повысится на 1 (ключ **user_rating_{freelancer}**, значение +1)
- будет создано сообщение **user_vote_{customer}_{freelancer}** со значением **positive**
- значение **bank_{task}** изменится на 0

## moveDeadline
Функция для изменения дедлайна

### Аргументы функции:
- taskId - id задания (string)
- deadline - новая высота (int)
- nodeUrl - адрес ноды (string)
- seed - сид юзера, вызывающего функцию (string)
- dAppAddress - адрес dApp decrybe (string)

### Пример использования:
```js
let decrybe = require("decrybe-js-api")
let nodeUrl = "https://pool.testnet.wavesnodes.com"
let dAppAddress = "3MzSNsJLeYj6Eh6u2QzJrbByPCySgFoCbWC"
let taskId = "9cc4e627-2126-41a7-a7ce-e3ca4748c705"
let seed = "snack wife small wrap answer uncle twin knife citizen sock episode bargain";
let deadline = 1000000;
decrybe.acceptWork(taskId, deadline, nodeUrl, seed, dAppAddress)
```

### Возможные ошибки
- Если статус задания == **completed**, то **"The task is completed"**
- Если статус задания == **in dispute**, то **"You can't change the deadline at this time"**
- Если **deadline** < **height**, то **"The deadline must be > the current block"**
- Если **deadline** < предыдущего дедлайна, то **"The deadline can only be moved forward"**

### Изменение состояния
- для сообщения с ключом **expiration_block_{taskId}** будет задано новое значение - **deadline**

