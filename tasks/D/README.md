[« к списку заданий](../../README.md) · [A](../A/README.md) · [B](../B/README.md) · [C](../C/README.md) · **[D](../D/README.md)** · [E](../E/README.md) · [F](../F/README.md)

----

<a name="task-D"><h2>Задача D. Ход конём (40 баллов)</h2></a>

Геннадий - интеллектуал. Он любит знакомиться с интересными людьми. Но будучи человеком осмотрительным и недоверчивым, делает он это только в интернете. Недавно Геннадий обнаружил, что сопоставимых по IQ собеседников можно отыскать на шахматном форуме, но вот беда - в шахматы играть Геннадий не умеет, а все обучаторы основаны на javascript-е, который Геннадий осмотрительно отключает, чтобы избежать вероятности подцепить вирус.

Чтобы помочь Геннадию - предлагаем сделать обучатор для игры в шахматы без javascript, который будет показывать, как ходит конь. Обучатор должен выглядеть как шахматная доска. Кликаешь по клетке - тебе показывают, куда с этой клетки может пойти конь.

### Формат ввода

html-документ, при загрузке которого рисуется шахматная доска

### Формат вывода

Задание будет протестировано в реальном браузере (Chrome 77).

В браузере будет загружен ваш html-документ. Робот кликает в различные ячейки шахматного поля и снимает скриншоты после кликов.

Скриншоты должны соответствовать эталонным

### Пример

![Шахматная доска](statement-image.png "Шахматная доска")

### Примечание

* Реализация на CSS и HTML. Javascript использовать нельзя.
* Вся верстка должна быть квадратной, без теней, градиентов, скруглений и т.п.
* Ширина и высота ячейки - 30 пикселей
* Шахматное поле находится на странице слева сверху, без отступов
* Цвет выделенной ячейки #ﬀ0000
* Цвет ячейки, на которую может ходить фигура #0000ﬀ
* Цвет светлой ячейки #f4cd8d
* Цвет темной ячейки #745853
* Левая верхняя ячейка светлая
* Изначально ни одна ячейка не выделена
* Выделение происходит по клику в конкретную ячейку и сохраняется до следующего клика

Решение
------
<sup>[Файл с решением](answer/index.html).</sup>

Создаем HTML-разметку шахматной доски. Аттрибут `tabindex="0"` нужен для того, чтобы можно было сфокусироваться на элементе при нажатии на него.

``` html
<div class="table">
  <div class="row">
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
    <div class="cell" tabindex="0"></div>
  </div>
  {... еще 7 таких row-элементов}
</div>

```

Расскраска шахматной доски выполнена с помощью псевдоселекторов (не)четных позиций элементов.

``` css
.table {
  overflow: hidden;
  height: 240px;
  width: 240px;
}
.row {
  display: block;
}
.row::after {
  clear: both;
  display: block;
  content: '';
}
.cell {
  height: 30px;
  width: 30px;
  display: block;
  float: left;
  background: #745853;
}
.row:nth-child(2n + 1) > .cell:nth-child(2n + 1) {
  background: #f4cd8d;
}
.row:nth-child(2n) > .cell:nth-child(2n + 1) {
  background: #745853;
}
.row:nth-child(2n + 1) > .cell:nth-child(2n) {
  background: #745853;
}
.row:nth-child(2n) > .cell:nth-child(2n) {
  background: #f4cd8d;
}
```

Рисовать варианты ходов конем будем с помощью псевдокласса `:focus`. Восемь кваратов рисуем на верхнем слое сфокусированной ячейки `:focus::after`, имеющем соответствующий `background` фон.

``` css
.cell:focus {
  background: red!important;
  outline: none;
  position: relative;
}
.cell:focus::after {
  content: '';
  pointer-events: none;
  height: 150px;
  width: 150px;
  position: absolute;
  top: -60px;
  left: -60px;
  background: linear-gradient(blue, blue) 30px 0 / 30px 30px no-repeat,linear-gradient(blue, blue) 0 30px / 30px 30px no-repeat,linear-gradient(blue, blue) 90px 0 / 30px 30px no-repeat,linear-gradient(blue, blue) 0 90px / 30px 30px no-repeat,linear-gradient(blue, blue) 30px 120px / 30px 30px no-repeat,linear-gradient(blue, blue) 90px 120px / 30px 30px no-repeat,linear-gradient(blue, blue) 120px 90px / 30px 30px no-repeat,linear-gradient(blue, blue) 120px 30px / 30px 30px no-repeat;
}
```
-----

[« к списку заданий](../../README.md) · [A](../A/README.md) · [B](../B/README.md) · [C](../C/README.md) · **[D](../D/README.md)** · [E](../E/README.md) · [F](../F/README.md)