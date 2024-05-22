---
title: Comandos
---

# Guía de Comandos para Administración del Servidor

Este README proporciona una lista de descripciones de procesos comunes y los comandos correspondientes que puedes utilizar para administrar un servidor web en un entorno Linux.

## Reiniciar la Versión de PHP

Para reiniciar la versión de PHP en tu servidor, utiliza el siguiente comando:

```bash
service php8.0-fpm restart
```

## Reiniciar Apache

Si necesitas reiniciar el servidor web Apache, puedes hacerlo con el siguiente comando:

```bash
systemctl restart apache2
```

## Ver Versiones de PHP

Si deseas ver las versiones de PHP disponibles en tu sistema y seleccionar una específica, utiliza el siguiente comando:

```bash
update-alternatives --config php
```

## Acceder a la Ruta de Archivos de Virtual Host

Para acceder a la ruta donde se encuentran los archivos de configuración de Virtual Host en Apache, puedes usar el siguiente comando:

```bash
cd /etc/apache2/sites-available/
```

## Cambiar el Propietario de un Repositorio

Si necesitas cambiar el propietario de un directorio o repositorio, utiliza el siguiente comando, asegurándote de reemplazar "Repositorio" con la ubicación de tu repositorio:

```bash
chown -R www-data:www-data Repositorio
```

## Utilizar gsutil para Google Cloud Storage

### Autenticación y Copia de Archivos

Para autenticarte en Google Cloud y copiar archivos utilizando gsutil, sigue estos pasos:

1. Inicia sesión en Google Cloud:

```bash
gcloud auth login
```

2. Copia un archivo desde Google Cloud Storage:

```bash
gsutil cp gs://lola-web/storage_apls/Contratos/facebook-circle-colored.png .
```

### Configurar permisos de acceso público

Para configurar permisos de acceso público en Google Cloud Storage, utiliza el siguiente comando, reemplazando la URL con la ubicación de tus archivos:

```bash
gsutil -m acl set -R -a public-read gs://lola-web/storage_apls/creditos_serdan/solicitudes/
```

## PHP INI

Para obtener información sobre la configuración de PHP, puedes ejecutar cualquiera de los siguientes comandos:

```bash
php -i | grep php.ini
php --ini | grep "Loaded Configuration File"
```

Estos comandos te proporcionarán detalles sobre la ubicación del archivo de configuración de PHP en tu sistema.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>