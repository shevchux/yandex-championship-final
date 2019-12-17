[« к списку заданий](../../README.md) · [A](../A/README.md) · **[B](../B/README.md)** · [C](../C/README.md) · [D](../D/README.md) · [E](../E/README.md) · [F](../F/README.md)

-----

<a name="task-B"><h2>Задача B. Будни стажера (15 баллов)</h2></a>

В команде Яндекса работает стажёр Степан. Сроки уже поджимают, а он не успевает с вёрсткой страниц. Помогите Степану сверстать одну из них по макету из этой задачи. 

При вёрстке не должно быть отступов от левого и верхнего края страницы. Также нельзя использовать изображения. Вот макет:

![Макет](statement-image.png "Макет")

Как видите, макет состоит из плиток двух размеров: стандартного и двойного. Стандартная плитка занимает 1/3 ширины экрана, двойная — 2/3. Высота плитки фиксированная - 200px. Расстояние между плитками 20 пикселей.

Цвет бекграунда стандартной плитки `#8a2be2`, цвет двойной `#000`.

В результате у вас должна получиться HTML-страница с вёрсткой для макета. Размер страницы не должен превышать 10 КБ.

### Примечание

В шаблонах можно писать только вёрстку и стили — JavaScript и изображения использовать нельзя.

Решение
------
<sup>[Файл с решением](answer/index.html).</sup>

Решение с помощью гридов.

HTML:

``` html
<div class="wrapper">
  <div class="one"></div>
  <div class="two"></div>
  <div class="three"></div>
  <div class="four"></div>
  <div class="five"></div>
  <div class="six"></div>
  <div class="eight"></div>
</div>
```

CSS:

``` css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(200px, auto);
}
.wrapper>div {
  background: #8a2be2;
}
.two,.three {
  background: #000!important;
}
.one {
  grid-column: 1;
  grid-row: 2;
}
.two { 
  grid-column: 2 / 4;
  grid-row: 2;
}
.three {
  grid-column: 1 / 3;
  grid-row: 3;
}
.four {
  grid-column: 3;
  grid-row: 3;
}
.five {
  grid-column: 1;
  grid-row: 1;
}
.six {
  grid-column: 2;
  grid-row: 1;
}
.eight {
  grid-column: 3;
  grid-row: 1;
}
```
------
[« к списку заданий](../../README.md) · [A](../A/README.md) · **[B](../B/README.md)** · [C](../C/README.md) · [D](../D/README.md) · [E](../E/README.md) · [F](../F/README.md)