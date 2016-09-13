# ion.js - Simple ajax-wrapper for Laravel
Version: 1.0.1

## Требования

jQuery v1.11.*
Twitter Bootstrap v2.* (Опционально, для управления модальными окнами)

## Очень просто!

ion.js - Это простая в использовании оболочка для работы с AJAX-запросами в проектах 
Laravel и не только. Оболочка имеет очень простой интерфейс в виде data-attributes api.

# Подключение

```html
<script src="/js/jquery-1.11.3.min.js"></script>
<script src="/js/ion.js"></script>
<script src="/js/myscript.js"></script>

<div id="Preloader">Ждите...</div>

<button ion="ajax=/ajax/url;html=#Container;" >Сделать хорошо!</button>
```

myscript.js
```js
var ion = new Ion();
ion.preloaderSelector = '#Preloader';

$(document).on('mousedown', '[do]', function (){
    ion.cmd($(this).attr('do'));
});
```
Где: #Preloader - Это селектор элемента который появляется если AJAX-запрос будет выполнятся более 0.7 секунды, 
проще говоря прелоадер. Как только запрос завершён прелоадер скрывается.

## API

**DATA** - Источник данных в DOM
```
data=.formlogin
```
> Будут собраны все значения с элементов по селектору $(‘.formlogin’) в массив, где ключи массива name=? а значения value=? или text=?

**AJAX** - Адрес узла
```
ajax=/ajax;
```
> Данные будут отправлены в узел /ajax

**HTML** - Контейнер для вставки данных
```
html=#WS;
```
> Данные будут вставлены в контейнер по селектору $(‘#WS’) в формате html

**APPENDTO** - Добавить данные в конец контейнера.
```
APPENDTO=#WS;
```

**PREPENDTO** - Добавить данные в начало контейнера.
```
PREPENDTO=#WS;
```

**VAL** - Свои переменные которые будут переданы (перекроют DATA при совпадении ключей)
```
val='myvar':'AZAZA','myvar2':123;
```
> Добавить переменные в массив DATA

**RUN** - Запуск объявленной функции
```
run=myfunc();
```
> Запуск JavaScript-функции или кода, используется обычный eval()

**MODAL** - Открывает модальное окно twitter bootstrap (Если оно есть на странице)
```
modal=#MyModal;
```
> Контент возвращённый функцией AJAX вставляется в модальное окно с указанным id (в контейнер ‘.modal-content’)

```
modal=hide;
```
> Все модальные окна (с классом .modal) будут скрыты

**CLEAN** - Очищает значения полей или текст внутри эллеменов по селектору
```
clean=.myfilds;
```

**DEBUG** - Отправляет все возвращённые данные в консоль
```
debug=true;
```
> Режим отладки, всё что возвращает функция AJAX дублируется в консоль

**TYPE** - Определить нестандартный тип запроса
```
type=put;
type=delete;
```
> Возможность для restfull-контроллеров указать тип запроса, по умолчанию post (если нет post-данных то get)

**RELOAD** - Перезагрузить страницу через определённое время
```
reload=2;
```
> Перезагрузит страницу через 2 секунды

#FOR LARAVEL

Для организации CSRF-Защиты запросов, поместите во view следующий тег
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```
В результате чего заголовок каждого запроса с данной страницы будет дополнен csrf-токеном.

## License

ion.js is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
