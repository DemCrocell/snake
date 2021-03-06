<h1>Frontend / Тестовое задание</h1>

<h2>Описание задачи</h2>
<p>Разработать игру "Змейка"</p>

<h2>Правила игры</h2>
<ul>
    <li>Игровое поле представляет собой сетку "X" на "Y" клеток</li>
    <li>Игрок управляет "Змейкой", которая может двигаться ортогонально: вверх, вправо, вниз, влево</li>
    <li>Каждая клетка может иметь несколько состояний: Пустая, Занята "Змейкой", Яблоко</li>
    <li>Если "Змейка" попадает на клетку с яблоком, её длина увеличивается на 1 спереди (следующий шаг не смещает змейку полностью).</li>
    <li>Если "Змейка" попадает на границу или на саму себя - игра заканчивается</li>
    <li>По окончанию игры виден счет игрока (количество съеденных яблок)</li>
</ul>

<h2>Способы управления</h2>
<ul>
<li>Старт игры: по нажатию на кнопку. Во время игры кнопка недоступна или скрыта.</li>
<li>Изменение направления: Стрелки клавиатуры или WSAD (в зависимости от религиозных предпочтений)</li>
<li>Доступные для изменения в интерфейсе настройки
    <ol>
        <li>Ширина поля</li>
        <li>Длина поля</li>
        <li>Скорость игры</li>
    </ol>
</li>
</ul>
<h2>Требования к реализации</h2>
<ul>
    <li>Язык программирования: TypeScript</li>
    <li>Стек технологий: React</li>
    <li>Bundler: На ваше усмотрение</li>
</ul>
<h2>Реализация по желанию (будет плюсом)</h2>
<ul>
    <li>Язык программирования: TypeScript</li>
    <li>Стек технологий: React + Redux</li>
    <li>Bundler: Webpack</li>
    <li>Игру можно начать по нажатию пробела.</li>
    <li>Змейка может проходить сквозь стены, то есть игра заканчивается только при попытке съесть саму себя.</li>
</ul>
<h2>Требования к приемке</h2>
<ul>
    <li>Тестовое задание высылается ссылкой на github и запускается командой `npm start`</li>
    <li>Проверяться будет работоспособность змейки (отсутствие явных багов и ошибок в консоли), а так же общее качество кода.</li>
</ul>

<h2>Пожелания и напутствие</h2>
<p>Мы не смотрим на графическое оформление задачи, но если у вас есть эстетическое видение и хочется красоты - нам будет
приятно</p>
<p>За рамками требований к реализации вы вольны использовать любые модули/плагины и паттерны разработки</p>