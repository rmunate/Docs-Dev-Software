---
title: Almacenamiento en Google Cloud Storage para Laravel ^9.0
outline: deep
---

# Google Cloud Storage | Laravel ^9.0

## Instalación 

Para utilizar Google Cloud Storage en Laravel ^9.0, debes seguir estos pasos de instalación.

A partir de la versión 9.0 de Laravel, el paquete `Superbalist` ya no es compatible con la conexión a Google Cloud Storage. En su lugar, se utiliza la versión de Spatie. Para instalarla, ejecuta el siguiente comando en la consola:

```bash
composer require spatie/laravel-google-cloud-storage
```

## Configuración del sistema de archivos

1. Abre el archivo de configuración `filesystems.php`, ubicado en la carpeta `config`.

2. Copia y pega el siguiente código, que contiene la configuración necesaria:

```php
'disks' => [

    'gcs' => [
        'driver' => 'gcs',
        'key_file_path' => env('GOOGLE_CLOUD_KEY_FILE'),
        'key_file' => [
            'type' => env('GOOGLE_CLOUD_ACCOUNT_TYPE'),
            'private_key_id' => env('GOOGLE_CLOUD_PRIVATE_KEY_ID'),
            'private_key' => env('GOOGLE_CLOUD_PRIVATE_KEY'),
            'client_email' => env('GOOGLE_CLOUD_CLIENT_EMAIL'),
            'client_id' => env('GOOGLE_CLOUD_CLIENT_ID'),
            'auth_uri' => env('GOOGLE_CLOUD_AUTH_URI'),
            'token_uri' => env('GOOGLE_CLOUD_TOKEN_URI'),
            'auth_provider_x509_cert_url' => env('GOOGLE_CLOUD_AUTH_PROVIDER_CERT_URL'),
            'client_x509_cert_url' => env('GOOGLE_CLOUD_CLIENT_CERT_URL')
        ],
        'project_id' => env('GOOGLE_CLOUD_PROJECT_ID'),
        'bucket' => env('GOOGLE_CLOUD_STORAGE_BUCKET'),
        'storage_api_uri' => env('GOOGLE_CLOUD_STORAGE_API_URI'),
        'visibility' => env('GOOGLE_CLOUD_VISIBILITY'),
        'base_url' => env('GOOGLE_CLOUD_PUBLIC_URL'),
        'metadata' => [
            'cacheControl' => 'public,max-age=86400'
        ],
    ],

    // ... otros discos ...

],
```

## Configuración del archivo .ENV

Agrega las siguientes variables de entorno al archivo `.env`, al final del mismo. Estos datos son confidenciales y no deben ser visibles desde el repositorio Git:

```env
GOOGLE_CLOUD_KEY_FILE=null
GOOGLE_CLOUD_ACCOUNT_TYPE="service_account"
GOOGLE_CLOUD_PRIVATE_KEY_ID="<<SOLICITARLA AL ADMINISTRADOR>>"
GOOGLE_CLOUD_PRIVATE_KEY="<<SOLICITARLA AL ADMINISTRADOR>>"
GOOGLE_CLOUD_CLIENT_EMAIL="lola-forms@vise-192912.iam.gserviceaccount.com"
GOOGLE_CLOUD_CLIENT_ID="<<SOLICITARLA AL ADMINISTRADOR>>"
GOOGLE_CLOUD_AUTH_URI="https://accounts.google.com/o/oauth2/auth"
GOOGLE_CLOUD_TOKEN_URI="https://oauth2.googleapis.com/token"
GOOGLE_CLOUD_AUTH_PROVIDER_CERT_URL="https://www.googleapis.com/oauth2/v1/certs"
GOOGLE_CLOUD_CLIENT_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/lola-forms%40vise-192912.iam.gserviceaccount.com"
GOOGLE_CLOUD_PROJECT_ID="vise-192912"
GOOGLE_CLOUD_STORAGE_BUCKET="lola-web"
GOOGLE_CLOUD_STORAGE_API_URI=null
GOOGLE_CLOUD_VISIBILITY=public
GOOGLE_CLOUD_PUBLIC_URL="/storage_apls/<<FOLDER APLICACION>>/"
```

Nota: Los valores marcados como `<<SOLICITARLA AL ADMINISTRADOR>>` deben ser proporcionados por el administrador de GCP.

## Uso de Storage

### Cargar un archivo

Para cargar un archivo en el directorio correspondiente dentro del bucket de GCP, sigue este ejemplo de código. Observe cómo se obtiene la base URL del bucket mediante la función `config('filesystems.disks.gcs.base_url')` para mantener un estándar en todo el sistema y evitar valores codificados:

```php
$file = $request->file('file');
$name = $file->getClientOriginalName();

$file->move(public_path('uploads'), $name);

$disk = Storage::disk('gcs');
$fileBits = fopen(public_path('uploads/' . $name), 'r');
$disk->put(config('filesystems.disks.gcs.base_url') . $name, $fileBits, 'public');

@unlink(public_path('uploads/' . $name));
```

### Eliminar un archivo en GCP

Eliminar un archivo del bucket es sencillo y se puede hacer con una sola línea de código. Ten en cuenta que la eliminación puede depender de la configuración actual del bucket y de si se están realizando copias de seguridad. Consulta esto con el administrador de GCP:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->delete(config('filesystems.disks.gcs.base_url') . $archivo);
```

### Validar la existencia de un archivo

Si necesitas verificar si un archivo existe en el bucket, puedes hacerlo con el siguiente código:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->exists(config('filesystems.disks.gcs.base_url') . $archivo);
```

### Obtener la fecha de carga o actualización

Puedes obtener la fecha de la última modificación realizada en un archivo del bucket:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->lastModified(config('filesystems.disks.gcs.base_url') . $archivo);
```

### Copiar un archivo dentro del bucket

Si necesitas crear copias de archivos dentro del bucket, puedes utilizar el siguiente código:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->copy(
    config('filesystems.disks.gcs.base_url') . $archivo,        // Origen
    config('filesystems.disks.gcs.base_url_nueva') . $archivo   // Destino
);
```

### Mover un archivo dentro del bucket

Si en lugar de copiar, necesitas mover un archivo a una ubicación diferente dentro del bucket, puedes utilizar el siguiente código:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->move(
    config('filesystems.disks.gcs.base_url') . $archivo,        // Origen
    config('filesystems.disks.gcs.base_url_nueva') . $archivo   // Destino
);
```

### Obtener la URL del archivo

Puedes obtener la URL de un archivo o una URL temporal de un archivo del bucket con los siguientes métodos:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->url(config('filesystems.disks.gcs.base_url') . $archivo);
Storage::disk('

gcs')->temporaryUrl(config('filesystems.disks.gcs.base_url') . $archivo, now()->addMinutes(30));
```

### Cambiar la visibilidad de un archivo

Si deseas cambiar la visibilidad de un archivo dentro del bucket de privado a público o viceversa, puedes utilizar el siguiente método:

```php
$archivo = 'archivo.pdf';
Storage::disk('gcs')->setVisibility(config('filesystems.disks.gcs.base_url') . $archivo, 'public');
```

Este manual debería proporcionar una guía completa y corregida sobre cómo utilizar Google Cloud Storage en Laravel.
Asegúrate de seguir las instrucciones y ajustar la configuración según tus necesidades específicas.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>