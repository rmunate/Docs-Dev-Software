---
title: BP - Helpers en Laravel
outline: deep
---

## Introducción

Hemos orientado todo el uso de Helpers a clases y lo mas importante, hemos centralizado los ayudantes ya existentes en Laravel a traves de las categorias de este paquete, incluimos las funcionalidades nativas de Laravel accecibles a traves de clases como lo son `Str::` y `Arr::` los demas ayudantes que no se acceden con clases sino como funciones, se deberán seguir usando de la forma como lo presenta la documentacion oficial de Laravel.

Es hora de estandarizar cómo crear y usar ayudantes en nuestros proyectos.

## Instalación

Para instalar la dependencia a través de **composer**, ejecuta el siguiente comando:

```shell
composer require rmunate/laravel_helpers
```

Esto descargará la última versión disponible del paquete.
Desde la version +2.0 se inicio con la consolidacion de diversas nuevas soluciones que a la fecha no estan incluidas en el codigo fuente del marco. Tambien puedes aportar tus Helpers, de acuerdo al apartado de como aportar.

## Uso

### Cargar Categorias Por Defecto

Después de instalar la dependencia en tu proyecto, puedes generar la estructura inicial de los ayudantes ejecutando el siguiente comando:

```shell
php artisan helpers:init
```

Esto creará una carpeta llamada `Helpers` dentro de la carpeta `app\`, donde encontrarás clases estándar sugeridas para la creación de tus propios ayudantes.
La estructura de la carpeta `Helpers` será la siguiente:

```css
app/
└── Helpers/
    └── DateTime.php
    └── File.php
    └── General.php
    └── Html.php
    └── Security.php
    └── Strings.php
    //...
```

Cada clase representa una categoría de ayudantes.
Estas clases traeran por defecto la importacion de dos `traits`, los cuales permitiran usar los helpers ya existentes en el marco de Laravel, asi como los nuevos ayudantes que ofrezcamos como paquete.
En estas clases, podrás iniciar a definir los metodos que serán propios de tu aplicacion, luego podras invocar su uso de una manera muy simple.

### Crear Una Nueva Categoria

Si deseas crear una nueva categoría de ayudantes, ejecuta el siguiente comando:

```shell
php artisan helpers:create NombreCategoria
```

Reemplaza `NombreCategoria` con el nombre deseado para la nueva categoría. Este nombre no podrá contener números, acentos o caracteres especiales.
Esto creará un nuevo archivo en la ruta `App\Helpers\NombreCategoria.php` donde podras empezar a definir los metodos que desees.

### Estandar Creación Nuevo Helper
A continuacion crearemos un ayudante de ejemplo para que puedas tener un mejor entendimiento del estandar que manejaremos en las creaciones de tus propias soluciones.
- Los metodos deben ser `public`.
- No se sugiere definir metodos `static`
- No se sugiere definir metodos `protected`
- No se sugiere definir constantes o propiedades dentro de la clase ya que los metodos seran de uso independiente.
- El nombre del metodo siempre debe ir con la primer palabra en minuscula y desde la segunda iniciar con mayuscula sin caracteres especiales.

```php
class DateTime extends BaseHelpers
{
    use NativeHelpersDateTime, AdditionalHelpersDateTime;
    
    /**
     * Este ejemplo de Helper, servirá para saber si una fecha dada es perteneciente al dia Lunes.
     *
     * @param string $fecha
     * @return bool
     */
    public function esLunes($fecha)
    {
      return date('N', strtotime($fecha)) == 1;
    }
}
```

### Llamada De Ayudantes

Para llamar a los ayudantes desde cualquier lugar de tu aplicación, utiliza la siguiente sintaxis:

**Primer Palabra:** `nombre completo de la clase en minuscula` | **Desde La Segunda Palabra:** `nombre del metodo iniciando cada palabra en mayuscula` `Helper::categoriaNombreMetodo();`

**Controladores o Clases:**
```php
/* Por ejemplo, para invocar el metodo de ejemplo de este manual */
use Helper;

Helper::datetimeEsLunes('2023-08-14'); //true
Helper::datetimeEsLunes('2023-08-16'); //false
```

**Vistas o Componentes:**
```php
{{ Helper::categoriaNombreMetodo() }}
// {{ Helper::datetimeEsLunes('2023-08-14') }}
```

También puedes importar y utilizar directamente la clase de la categoría que requieras, para esto utilizaremos el metodo `helpers()` o `helper()`. Por ejemplo:

```php
use App\Helpers\DateTime;

// Con helper()
DateTime::helper()->esLunes('2023-08-14'); //true
DateTime::helper()->esLunes('2023-08-15'); //false

// Con helpers() alias helper()
DateTime::helpers()->esLunes('2023-08-14'); //true
DateTime::helpers()->esLunes('2023-08-15'); //false
```

### Invocar los metodos ya disponibles en Laravel
Si requieres emplear cualquiera de las soluciones actualmente vigentes en la documentacion oficial de laravel (https://laravel.com/docs/10.x/helpers) y/o (https://laravel.com/docs/10.x/strings), podras hacerlo de la siguiente forma:

*Ten presente que solo se tiene acceso a los metodos que se invocan a traves de clases Str:: y Arr::*

**Ejemplo Uso Ayudantes De Arreglos Nativos De Laravel** 
[Metodos Disponibles](https://laravel.com/docs/10.x/helpers)

```php
$array = [
  'name' => 'Taylor Otwell',
  'age' => 37
];

/* Forma nativa de laravel */
use Illuminate\Support\Arr;

Arr::exists($array, 'name');    //true
Arr::exists($array, 'salary');  //false

/* Metodo a traves de la clase de Helpers */
use App\Helpers\Arrays;

Arrays::helper()->exists($array, 'name');   //true
Arrays::helper()->exists($array, 'salary'); //false

/* Metodo suministrado para estandarizar el llamado desde cualquier lugar */
use Helper;

Helper::arraysExists($array, 'name');   //true
Helper::arraysExists($array, 'salary'); //false

/* En vistas blade */
{{ Helper::arraysExists($array, 'salary') }}
```

**Ejemplo Uso Ayudantes De Strings** 
[Available Methods](https://laravel.com/docs/10.x/strings)

```php
/* Forma nativa de laravel */
use Illuminate\Support\Str;

Str::camel('foo_bar');                  // fooBar
Str::contains('This is my name', 'my'); // true

/* Metodo a traves de la clase de Helpers */
use App\Helpers\Strings;

Strings::helper()->camel('foo_bar');                  // fooBar
Strings::helper()->contains('This is my name', 'my'); // true

/* Metodo suministrado para estandarizar el llamado desde cualquier lugar */
use Helper;

Helper::stringsCamel('foo_bar'); // fooBar
Helper::stringsContains('This is my name', 'my'); // true

/* En vistas Blade */
{{ Helper::stringsCamel('foo_bar') }}
```

## Nuevos Ayudantes Por Categoria

### Cadenas De Texto

#### Metodo: `isAlphanumeric()`
Chequea si todos los caracteres en la string entregada, son alfanuméricos.

```php
Helper::stringIsAlphanumeric('AbCd1zyZ9'); //true
Helper::stringIsAlphanumeric('foo!#$bar'); //false

Strings::helpers()->isAlphanumeric('AbCd1zyZ9'); //true
Strings::helpers()->isAlphanumeric('foo!#$bar'); //false
```

#### Metodo: `isAlpha()`
Verifica si todos los caracteres en la string entregada, son alfabéticos `[A-Za-z]`.

```php
Helper::stringIsAlpha('KjgWZC'); //true
Helper::stringIsAlpha('arf12'); //false

Strings::helpers()->isAlpha('KjgWZC'); //true
Strings::helpers()->isAlpha('arf12'); //false
```

#### Metodo: `isControl()`
Verifica si todos los caracteres en la string entregada, son caracteres de control. Los caracteres de control son, por ejemplo, la alimentación de línea, el tabulador, escape.

```php
Helper::stringIsControl("\n\r\t"); //true
Helper::stringIsControl('arf12'); //false

Strings::helpers()->isControl("\n\r\t"); //true
Strings::helpers()->isControl('arf12'); //false
```

#### Metodo: `isDigit()`
Verifica si todos los caracteres en la string entregada, son numéricos.

```php
Helper::stringIsDigit('10002'); //true
Helper::stringIsDigit('1820.20'); //false
Helper::stringIsDigit('wsl!12'); //false

Strings::helpers()->isDigit('10002'); //true
Strings::helpers()->isDigit('1820.20'); //false
Strings::helpers()->isDigit('wsl!12'); //false
```

#### Metodo: `isGraph()`
Verifica si todos los caracteres en la string entregada, text, generan una salida visible.

```php
Helper::stringIsGraph('arf12'); //true
Helper::stringIsGraph('LKA#@%.54'); //true
Helper::stringIsGraph("asdf\n\r\t"); //false

Strings::helpers()->isGraph('arf12'); //true
Strings::helpers()->isGraph('LKA#@%.54'); //true
Strings::helpers()->isGraph("asdf\n\r\t"); //false
```

#### Metodo: `isLower()`
Verifica si todos los caracteres en la string entregada, son letras minúsculas.

```php
Helper::stringIsLower('qiutoas'); //true
Helper::stringIsLower('aac123'); //false
Helper::stringIsLower('QASsdks'); //false

Strings::helpers()->isLower('qiutoas'); //true
Strings::helpers()->isLower('aac123'); //false
Strings::helpers()->isLower('QASsdks'); //false
```

#### Metodo: `isPrint()`
Devuelve `true` si cada caracter del texto genera realmente alguna salida (incluyendo los espacios). Devuelve `false` si el texto incluye caracteres de control o caracteres que no producen ninguna salida ni realizan función de control alguna después de todo.

```php
Helper::stringIsPrint('arf12'); //true
Helper::stringIsPrint('LKA#@%.54'); //true
Helper::stringIsPrint("asdf\n\r\t"); //false

Strings::helpers()->isPrint('arf12'); //true
Strings::helpers()->isPrint('LKA#@%.54'); //true
Strings::helpers()->isPrint("asdf\n\r\t"); //false
```

#### Metodo: `isPunct()`
Verifica si todos los caracteres en la string entregada, son caracteres de puntuación.

```php
Helper::stringIsPunct('*&$()'); //true
Helper::stringIsPunct('!@ # $'); //false
Helper::stringIsPunct('ABasdk!@!$#'); //false

Strings::helpers()->isPunct('*&$()'); //true
Strings::helpers()->isPunct('!@ # $'); //false
Strings::helpers()->isPunct('ABasdk!@!$#'); //false
```

#### Metodo: `isSpace()`
Verifica si todos los caracteres en la string entregada, crean espacios en blanco. Devuelve `true` si cada caracter del string genera cierto tipo de espacio en blanco, o `false` de lo contrario. Junto con el caracter regular de espacio en blanco, también se consideran espacios a los caracteres de tabulación, tabulación vertical, avance de línea, retorno de carro y avance de formulario.

```php
Helper::stringIsSpace("\n\r\t"); //true
Helper::stringIsSpace("\narf12"); //false
Helper::stringIsSpace('\n\r\t'); //false // note las comillas simples

Strings::helpers()->isSpace("\n\r\t"); //true
Strings::helpers()->isSpace("\narf12"); //false
Strings::helpers()->isSpace('\n\r\t'); //false // note las comillas simples
```

#### Metodo: `isUpper()`
Verifica si todos los caracteres en la string entregada, son letras minúsculas.

```php
Helper::stringIsUpper('LMNSDO'); //true
Helper::stringIsUpper('AKLWC139'); //false
Helper::stringIsUpper('akwSKWsm'); //false

Strings::helpers()->isUpper('LMNSDO'); //true
Strings::helpers()->isUpper('AKLWC139'); //false
Strings::helpers()->isUpper('akwSKWsm'); //false
```

#### Metodo: `isHex()`
Verifica si todos los caracteres de la string entregada, son 'dígitos' hexadecimales.

```php
Helper::stringIsUpper('AB10BC99'); //true
Helper::stringIsUpper('ab12bc99'); //true
Helper::stringIsUpper('AR1012'); //false

Strings::helpers()->isUpper('AB10BC99'); //true
Strings::helpers()->isUpper('ab12bc99'); //true
Strings::helpers()->isUpper('AR1012'); //false
```

#### Metodo: `isAlphanumeric()`
Chequea si todos los caracteres en la string entregada, son alfanuméricos.

```php
Helper::stringIsAlphanumeric('AbCd1zyZ9'); //true
Helper::stringIsAlphanumeric('foo!#$bar'); //false

Strings::helpers()->isAlphanumeric('AbCd1zyZ9'); //true
Strings::helpers()->isAlphanumeric('foo!#$bar'); //false
```

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>