# RGUI
RGUI is a JS Library you can use for quick creation & display of GUI widgets like tables, TextAreas, forms, etc.
All available widgets within this library are described in detail bellow as well as how to use them.
Also, the library itself is contained within a single JS file called RGUI.js <br>
However, in order to use the library properly you must import all the css & js files within the assets folder.
This library uses Bootstrap to position the elements & provide basic formatting. If you aren't comfortable using Bootstrap in
your project this library won't work for you. Also, if you already have Bootstrap & JQuery imported in your project 
you can simply import RGUI.js without importing JQuery and Bootstrap again. However, the css files in the assets/css folder
are custom css developed for this library which you should always import to get the desired results.
<h3>TLDR:</h3>
<p>
This Library is held within a single JS file: RGUI.JS
However, it depends on many other files which you should import as well in order to get the desired results.
<ul>
<li><h4>Bootsrap</h4><p>
A whole folder containing official Bootstrap v4.3.1 used to position all components within the library.
Bootstrap is heavily used by this library so importing it is a must. If you already have Bootstrap imported in your project, 
you can skip this folder.
</p></li>
<li><h4>JQuery</h4><p>
This folder uses jQuery v3.4.1 for proper functionality. In fact, without JQuery this library would not work at all.
Importing JQuery is a must for this library. It is included in the assets folder so you don't need to download it on your own.
However, if you already have JQuery imported in your project you can skip it.
</p></li>
<li><h4>assets/css</h4><p>
This library uses some custom css files on top of Bootstrap for extra formatting. 
This css files are contained in the assets/css folder. Make sure you import them as well for proper formatting.
</p></li>
<li><h4>RGUI.js</h4><p>
The library itself. Make sure to import this file last.
</p></li>
</ul>
</p>
