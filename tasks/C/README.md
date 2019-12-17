[« к списку заданий](../../README.md) · [A](../A/README.md) · [B](../B/README.md) · **[C](../C/README.md)** · [D](../D/README.md) · [E](../E/README.md) · [F](../F/README.md)

-----

<a name="task-C"><h2>Задача C. Идеальные прямоугольники (40 баллов)</h2></a>

Боб — художник-экспрессионист. Все его работы представляют собой цветные строго вертикальные прямоугольники на белом фоне.

Недавно его работы опубликовали на сайте известного журнала Top Art. Боб решил разглядеть свои полотна поближе, увеличил масштаб страницы и пришел в ужас от расплывшихся углов и нечётких краёв его идеальных прямоугольников.

Будучи человеком обстоятельным, он изучил проблему и решил свои шедевры сконвертировать в HTML, чтобы под любым углом и в любом масштабе линии оставались идеальными. Для выполнения задуманного он выбрал вас.

Напишите для него сервис, который сможет генерировать html из картинок.

### Формат ввода

На вход подаётся строка, которая содержит картинку в base64.

### Формат вывода

Верните функцию **traceImage**, которая на вход принимает ссылку на картинку, а возвращает промис, который резолвится со строкой. В строке должна быть вёрстка, которая повторяет эту картинку.

Отправьте решение в виде:
``` js
/**  
 *  
 * @param {String} imageSrc - base64 картинки, например ’data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...’  
 * @returns {Promise}  
 */  
function traceImage(imageSrc) {  
 // Ваше решение  
}
```
### Примечания
* Картинка может быть любого размера
* Картинка не прозрачная
* Цвет пустых пикселей — белый (r, g, b): (255, 255, 255)
* На картинке изображён 1 цветной непрозрачный прямоугольник
* Все линии горизонтальные или вертикальные
* Код выполняется в браузере

### Пример
Дана картинка строкой в base64 (в том виде, в котором она будет передаваться в функцию): [пример Base64](input-example.txt).

![Картинка](statement-image.png "Картинка")

Для такой картинки можно сгенерировать строку:

``` html
<div>  
    <div style="  
        position: absolute;  
        width: 11px;  
        height: 15px;  
        top: 135px;  
        left: 109px;  
        background-color: rgb(255, 255, 0);  
    "></div>  
</div>
```

Решение
------
<sup>[Файл с решением](answer/index.html).</sup>

``` js
/**  
 * @param {String} imageSrc - base64 картинки, например ’data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...’  
 * @returns {Promise}  
 */  
function traceImage(imageSrc) {
    return getImageData(imageSrc)
        .then(extractRectangle)
        .then(drawHTML);
}
```

Вычисление результата, возвращаемого функцией **traceImage**, состоит из следущих этапов:
1. Получение массива цветов каждого пикселя входного изображения.
``` js
function getImageData(imageSrc) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.setColor
        image.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.height = image.height;
            canvas.width = image.width;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            resolve(ctx.getImageData(0, 0, image.width, image.height));
        }
        image.onerror = reject;
    });
}
```
2. Определение позиции и размеров прямоугольника.
``` js
function extractRectangle({ height, width, data }) {
    function getColor(i, j) {
        const from = (j * width + i) * 4;
        return data.subarray(from, from + 4);
    }

    function isClear(i, j) {
        const from = (j * width + i) * 4;
        return data[from] === 255 && data[from + 1] === 255 && data[from + 2] === 255;
    }

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            if (isClear(i, j)) continue;

            for (var jTo = j; !isClear(i, jTo) && jTo < height; jTo++);
            for (var iTo = i; !isClear(iTo, j) && iTo < width; iTo++);
            
            return { height: jTo - j, width: iTo - i, top: j, left: i, color: getColor(i, j) };
        }
    }

    return { height: 0, width: 0, top: 0, left: 0, color: [0, 0, 0, 0] };
}
```
3. Генерация результирующей HTML-строки.
``` js
function drawHTML({ height, width, top, left, color }) {
    return (
        `<div>  
            <div style="  
                position: absolute;  
                width: ${width}px;  
                height: ${height}px;  
                top: ${top}px;  
                left: ${left}px;  
                background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});  
            "></div>
        </div>`
    );
}
```

-----
[« к списку заданий](../../README.md) · [A](../A/README.md) · [B](../B/README.md) · **[C](../C/README.md)** · [D](../D/README.md) · [E](../E/README.md) · [F](../F/README.md)