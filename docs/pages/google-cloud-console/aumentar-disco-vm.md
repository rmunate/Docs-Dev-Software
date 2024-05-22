---
title: Cambiar la Capacidad de Disco de una Instancia en GCP
description: Aprende a cambiar la capacidad de disco de una instancia en Google Cloud Platform (GCP) utilizando la línea de comandos.
---

# Cambiar la Capacidad de Disco de una Instancia en GCP

A veces, es necesario ajustar la capacidad del disco de una instancia en Google Cloud Platform (GCP) para satisfacer las necesidades de tu aplicación. Aquí te mostraremos cómo hacerlo utilizando la línea de comandos.

## Paso 1: Abrir Cloud Shell

Para comenzar, inicia Cloud Shell desde la consola de GCP o mediante una conexión SSH remota. Asegúrate de que estés autenticado correctamente:

```shell
gcloud init
```

## Paso 2: Identificar el Nombre de la Instancia

Para modificar la capacidad de disco de una instancia, primero debes identificarla. Puedes listar todas las instancias disponibles ejecutando el siguiente comando:

```shell
gcloud compute instances list
```

## Paso 3: Detener la Instancia

Antes de realizar cualquier cambio en la capacidad del disco, es necesario detener la instancia. Si el comando anterior te genera un error, asegúrate de indicar la zona de la instancia:

```shell
gcloud compute instances stop <nombre-vm> --zone <zona>
```

## Paso 4: Especificar el Nuevo Tamaño de Disco

El nuevo tamaño del disco debe ser un múltiplo del tamaño actual. Por ejemplo, si el disco actual tiene 100 GB, el nuevo tamaño podría ser 200 GB, 300 GB, 400 GB, y así sucesivamente.

## Paso 5: Listar los Discos de las Instancias

Para ver una lista de los discos de las instancias, ejecuta el siguiente comando:

```shell
gcloud compute disks list
```

## Paso 6: Cambiar el Tamaño del Disco

Ahora, utiliza la siguiente sintaxis para modificar el tamaño del disco:

```shell
gcloud compute disks resize <nombre-disco> --size=<nuevo-tamaño>GB --zone=<zona>
```

Reemplaza los marcadores con los siguientes valores:

- `<nombre-disco>`: El nombre del disco que deseas modificar.
- `<nuevo-tamaño>`: El nuevo tamaño del disco en gigabytes.
- `<zona>`: La zona de Google Cloud donde se encuentra el disco.

Por ejemplo, para cambiar el tamaño de un disco llamado `my-disk` a 200 GB, utiliza el siguiente comando:

```shell
gcloud compute disks resize my-disk --size=200GB --zone=us-east1-d
```

**Espera a que el Disco se Actualice**

El proceso de actualización del disco puede llevar varios minutos. Puedes verificar el estado del disco con el siguiente comando:

```shell
gcloud compute disks describe <nombre-disco>
```

Cuando el estado del disco cambie a "READY," el disco tendrá el nuevo tamaño.

::: warning **Advertencia:**
- No puedes cambiar el tamaño de un disco en uso. Asegúrate de detener la instancia antes de modificar el disco.
- No puedes cambiar el tamaño del disco de arranque. Si necesitas cambiar el tamaño del disco de arranque, debes crear una nueva instancia con el tamaño de disco deseado.
:::

## Paso 7: Iniciar la Instancia

Una vez que hayas modificado el tamaño del disco, puedes reiniciar la instancia:

```shell
gcloud compute instances start <nombre-vm> --zone <zona>
```

¡Eso es todo! Ahora has cambiado con éxito la capacidad del disco de tu instancia en GCP.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>