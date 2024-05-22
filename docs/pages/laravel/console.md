---
title: BP - Comandos Laravel
outline: deep
---

# Creación de Comandos en Laravel

Al crear un nuevo comando en Laravel, es importante tener en cuenta los siguientes puntos para garantizar que cumpla con los requisitos mínimos.

### Precondiciones para que sea un comando

Los comandos deben contener funcionalidades que aporten al núcleo del sistema y no deben utilizarse para tareas simples que apoyen al desarrollador. Por ejemplo, no se deben crear comandos para procesos como:

- Ajustar la base de datos (realizar operaciones de inserción, actualización, etc.).
- Mostrar alertas de escritorio.
- Sobrescribir comandos ya existentes.
- Ejecutar pruebas que no sean de tipo unitarias o Pest.

### 1. Estructura del comando

Mantén la estructura del comando simple y coherente. Un comando de Laravel debe extender la clase `Illuminate\Console\Command` y tener un nombre descriptivo. Por ejemplo:

```php
namespace App\Console\Commands;

use Illuminate\Console\Command;

class MiComando extends Command
{
    // ...
}
```

### 2. Descripción clara

Proporciona una descripción clara, completa y concisa para tu comando utilizando la propiedad `$description`. Esto ayudará a otros desarrolladores a entender rápidamente la función del comando.

```php
protected $description = 'Descripción del comando aquí.';
```

### 3. Argumentos y opciones

Si tu comando necesita argumentos u opciones adicionales, asegúrate de definirlos en el método `configure()`. Esto mejorará la usabilidad y permitirá a los usuarios personalizar el comportamiento del comando según sus necesidades.

```php
protected function configure()
{
    $this->setName('mi-comando')
         ->setDescription('Descripción del comando aquí.')
         ->addArgument('nombre', InputArgument::REQUIRED, 'Descripción del argumento aquí.')
         ->addOption('opcion', 'o', InputOption::VALUE_OPTIONAL, 'Descripción de la opción aquí.');
}
```

### 4. Lógica del comando

Coloca la lógica principal del comando en el método `handle()`. Mantén este método limpio y conciso. Si el comando realiza tareas complejas, considera dividir la lógica en métodos adicionales para mantener el código más organizado. Los métodos creados para segmentar la lógica del comando deben ser privados (no usar métodos estáticos); el ideal es que el uso sea a través de "$this" y no a través de "self".

```php
protected function handle()
{
    $nombre = $this->argument('nombre');
    $opcion = $this->option('opcion');

    // Lógica del comando aquí...

    $this->info('Comando ejecutado exitosamente.');
}
```

### 5. Mensajes de salida

Utiliza los métodos `info()`, `error()`, `comment()`, entre otros, para proporcionar mensajes de salida adecuados durante la ejecución del comando. Esto mejorará la experiencia del usuario y facilitará la comprensión de lo que está sucediendo.

### 6. Validación de entrada

Si el comando requiere validación de entrada, asegúrate de implementarla para garantizar que los valores proporcionados por el usuario sean adecuados para su procesamiento. En caso de ser necesario, puedes implementar métodos de confirmación.

```php
if ($this->confirm('¿Deseas continuar?')) {
    // ...
}
```

### Norma PSR-4

Para cumplir con la norma PSR-4, debemos tener cuidado al nombrar el archivo, el cual debe tener el nombre del comando en PascalCase.

Ejemplo:

```shell
Comando `php artisan import:background`

Clase: ImportBackground

Archivo: ImportBackground.php
```

Siguiendo estas prácticas, podrás crear comandos en Laravel que sean más fáciles de mantener, entender y utilizar tanto para ti como para otros desarrolladores. ¡Buena suerte en tu desarrollo!

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>