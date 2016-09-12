# ion.js - Simple ajax-wrapper for Laravel

## Требования

jQuery v1.11.*


## Очень просто!

ion.js - Это простая в использовании оболочка для работы с AJAX-запросами в проектах 
Laravel и не только. Оболочка имеет очень простой интерфейс в виде data-attributes api.

# Подключение

```html
<script src="/js/jquery-1.11.3.min.js"></script>
<script src="/js/ion.js"></script>
<script src="/js/myscript.js"></script>
```

myscript.js
```js
var ion = new Ion();
ion.preloaderSelector = '#Preloader';

$(document).on('mousedown', '[do]', function (){
    ion.cmd($(this).attr('do'));
});
```




## License

ion.js is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).