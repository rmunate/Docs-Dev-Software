---
title: BP - Exports en Laravel
outline: deep
---

# Exports en Laravel

Los exportables dentro de nuestros sistemas deben cumplir con las siguientes consideraciones:

- Es importante que las consultas que se ejecuten dentro de los exportables estén alineadas con los permisos o niveles de acceso de cada usuario. Por ejemplo, si el usuario solo puede exportar sus propios POST, debe existir la condición en la fuente de datos para evitar exportar datos no permitidos.
- Todos los métodos adicionales que se creen dentro de la clase deben ser de tipo "privado" y nunca de tipo "estático".
- Las propiedades que se creen dentro del objeto deben ser de tipo "privado". Solo en casos estrictamente obligatorios y justificados donde se deba retornar a la instancia un valor a través de una propiedad, podremos emplear una propiedad pública.

### 1. Usar Laravel Excel Package

Para facilitar la creación de exports en Laravel, utilizaremos la biblioteca Laravel Excel. Esta biblioteca proporciona una interfaz sencilla para generar exports en diversos formatos. Puedes instalarla mediante Composer:

```
composer require maatwebsite/excel
```

### 2. Clase Export

Se debe crear una clase dedicada para cada export en lugar de definir la lógica de exportación en los controladores. Cada clase de export debe extender la clase `Maatwebsite\Excel\Concerns\FromCollection` (o la interfaz adecuada según el tipo de export que estés realizando).

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithEvents;

class UsuariosExport implements FromCollection, WithHeadings, WithMapping, WithTitle, ShouldAutoSize, WithStyles, WithEvents
{
    // ...
}
```

### 3. Implementar el método `collection`

En la clase del export, asegúrate de implementar el método `collection()`, que devolverá la colección de datos que deseas exportar. Puedes obtener los datos desde el modelo Eloquent o usando Query Builder. No debes usar sentencias propias de SQL.

```php
use Illuminate\Support\Collection;

public function collection()
{
    // Ejemplo con el modelo User, puedes ajustarlo según tus necesidades.
    return User::all(); 
}
```

### 4. Implementar el método `map($row)`

El método `map($row)` se utiliza para personalizar cada fila del export con transformaciones o formato especial antes de que se agregue al archivo de exportación. Esto te permite modificar el contenido de las celdas o agregar datos adicionales. Desde este método, debemos garantizar que el formato de salida sea el esperado por el usuario de la plataforma.

```php
public function map($row): array
{
    return [
        $row->id,
        $row->name,
        $row->email,
        // Agregar más columnas según tus necesidades.
    ];
}
```

### 5. Encabezados y formato

Agrega encabezados a las columnas del export para facilitar la comprensión de los datos. Puedes hacerlo mediante el método `headings()` en la clase del export. Debes mantener una escritura Capital Case en los encabezados y garantizar que sea el nombre adecuado de acuerdo al valor.

```php
use Maatwebsite\Excel\Concerns\WithHeadings;

public function headings(): array
{
    return [
        'ID',
        'Nombre',
        'Email',
        // Agrega más encabezados según las columnas de tu export.
    ];
}
```

### 6. Aplicación De Estilos y Filtros (Opcional)

Antes de realizar la exportación del archivo, puedes aplicar algunas características para que los encabezados bajen con negrita y con el filtro aplicado. Esto es opcional y no es una característica necesaria para que la salida sea la esperada.

```php
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

public function registerEvents(): array
{
    return [
        AfterSheet::class => function (AfterSheet $event) {
            
            $event->sheet->getStyle('A1:' . $event->sheet->getDelegate()->getHighestColumn() . '1')
                            ->getAlignment()
                            ->setHorizontal('center')
                            ->setVertical('center');

            $event->sheet->getDelegate()
                            ->setAutoFilter('A1:' . $event->sheet->getDelegate()->getHighestColumn() . '1')
                            ->getRowDimension('1')
                            ->setRowHeight(30);
        },
    ];
}
```

```php
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

public function styles(Worksheet $sheet)
{
    $ultFila = $sheet->getHighestColumn() . $sheet->getHighestRow();
    $rango = 'A1:' . $ultFila;

    return [
        1 => [
            'font' => ['bold' => true],
        ],

        $rango => [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => 'thin',
                    'color' => ['rgb' => '808080'],
                ],
            ],
        ],
    ];
}
```

### 7. Llamado en el controlador

Para llamar la clase de exportación desde el controlador, debes crear un código similar al siguiente:

```php
use App\Exports\ClaseExport;
use Maatwebsite\Excel\Facades\Excel;

return Excel::download(new ClaseExport(), 'Nombre.xlsx');
```

### 8. Envío de datos a la clase Export

En algunos casos, deberás enviar valores como filtros recibidos en el request o tal vez datos ya preparados para exportar, entre muchos otros posibles escenarios. En esos casos, podrás enviar la data a través del constructor para evitar hacer consultas repetitivas o adiciones en la clase export.

```php
// Envío de variable necesaria dentro de la clase Export.
use App\Exports\ClaseExport;
use Maatwebsite\Excel\Facades\Excel;

return Excel::download(new ClaseExport($data), 'Nombre.xlsx');

// Recibir la variable en la clase Export.
private $data;

public function __construct($data) {
    $this->data = $data;
}

// Ahora dentro de la clase Export, vas a poder usar el valor simplemente usando 
$this->data;
```

> **Recuerda**: Las peticiones para descargar el Excel deben ser enviadas **directamente al servidor**. Evitemos el uso de métodos como "AJAX, FETCH, AXIOS, etc.", ya que aunque pueden parecer una opción para descargar el documento, requieren que primero se renderice el archivo y se guarde en una ruta de la carpeta pública. 

Así podrás crear exports en Laravel de manera organizada, fácil de mantener y con una excelente experiencia para el usuario.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>