# SocialNetwork
Социальная сеть в виде SPA на React и Django

## Функционал
### Авторизация

На сайте используется сессионная авторизация. 

Доступна регистрация и логин.

![](screenshots/1.jpg)
![](screenshots/2.jpg)


### Страница профиля

На странице профиля можно просмотреть личную информацию о своем профиле, свои посты и опубликовать новый пост.

![](screenshots/3.jpg)

### Редактирование профиля

Перейдя по кнопке редактировать на странице профиля, вы можете изменить личную информацию о профиле, аватар и задний фон. Вся эта информация будет видна другим пользователям.

![](screenshots/3.1.png)

### Страница друзей

Нажав на ссылку с надписью "друзья" на странице профиля вы можете попасть на страницу друзей. Здесь будут отображаться запросы в друзья, присланные вам и ваши друзья. Нажав на друга, вы можете перейти на его страницу.

![](screenshots/4.jpg)

### Страница другого человека

Так может выглядеть страница другого человека:

![](screenshots/6.jpg)

### Сообщения

Нажав на кнопку отправить "Отправить сообщение" сервер создаст для вас приватный чат с этим человеком или вернет существующий. Чат использует websocket`ы, поэтому сообщения будут появляться в реальном времени. 

![](screenshots/5.jpg)

### Страница постов
Вы также можете перейти на страницу постов, чтобы посмотреть все посты, которые опубликовали ваши друзья.

![](screenshots/7.png)
