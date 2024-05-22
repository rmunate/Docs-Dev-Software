---
title: SupervisorCTL Ubuntu
---

# Instalación SupervisorCTL Ubuntu

Supervisor es una herramienta que se utiliza para controlar y supervisar la ejecución de procesos en sistemas Unix/Linux.
<p style="text-align: justify;">Supervisor permite gestionar procesos en segundo plano de una manera más robusta y confiable. Al instalar Supervisor, puedes definir configuraciones para supervisar y controlar procesos específicos. Esto es especialmente útil en entornos de servidores y aplicaciones en producción, donde es esencial asegurarse de que los procesos se ejecuten de manera continua y se reinicien en caso de que fallen. </p>

## Paso a Paso

1. Abre la Terminal del Unix/Linux.

2. Ejecutamos el siguiente comando en la terminal para poder realizar la instalación del **Supervisor**:

```bash
apt-get install supervisor
```

3. Al culminar la instalación, debemos ir a la ubicación del directorio:

```bash
cd /etc/supervisor/conf.d/
```

4. En este directorio creamos un archivo el cual va tener configuración de **Supervisor** de nuestro aplicación:

```bash
nano <NOMBRE-APLICATIVO>-worker.conf
```
Cambia `<NOMBRE-APLICATIVO>` por el nombre del aplciativo, recuerda que la extención debe ser **.conf**

## Configurar archivo .conf

La estructura que debe llevar internamente el archivo es:

```bash
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /ruta/a/tu/proyecto/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true
user=www-data
numprocs=8
redirect_stderr=true
stdout_logfile=/ruta/a/tu/proyecto/storage/logs/worker.log
```
A continuación explicaremos cada una de las líneas de la configuración:

`[program:laravel-worker]`: Define el nombre del programa que se va a supervisar.

`process_name=%(program_name)s_%(process_num)02d` : Define de forma automatica cómo se deben nombrar los procesos. En este caso, se utiliza una combinación del nombre del programa y un número de proceso con dos dígitos. **NO SE DEBE CAMBIAR**.

`command=php /ruta/a/tu/proyecto/artisan queue:work --sleep=3 --tries=3` : Es el comando que se ejecutará para iniciar el proceso. En este caso, se ejecuta el comando php para ejecutar un trabajador de Laravel que procesa colas. Se especifican opciones como --sleep (Tiempo entre cada ejecución) y --tries (Intentos).

`autostart=true`: Indica que el programa debe iniciarse automáticamente cuando **Supervisor** se inicia.

`autorestart=true`: Especifica que el programa debe reiniciarse automáticamente si se detiene.

`user=www-data`: Define el usuario bajo el cual se ejecutará el programa.

`numprocs=8`: Indica cuántas instancias del programa se deben ejecutar al tiempo.

`redirect_stderr=true`: Redirige la salida de error estándar del programa.

`stdout_logfile=/ruta/a/tu/proyecto/storage/logs/worker.log`: Especifica la ubicación del archivo de registro donde se almacenará la salida estándar del programa.

Guardamos la configuración de nuestro archivo.

**5. Ejecución de comandos para leer los archivos de configuración y apliquen las actualizaciones:**

Lee los archivos de configuración de **Supervisor** en busca de cambios o actualizaciones en el directorio de configuración.
```bash
sudo supervisorctl reread
```

Aplica las actualizaciones y cambios en la configuración a **Supervisor**.
```bash
sudo supervisorctl update
```

Inicia todos los programas supervisados definidos en la configuración.

```bash
sudo supervisorctl start nombre_del_programa
```

O para detener todo y volver a iniciar

```bash
sudo supervisorctl stop all
sudo supervisorctl start all
```

```bash
sudo supervisorctl restart all
```

##  Algunos comandos útiles

Para la administración del **Supervisor** se cuentan con los siguientes comandos que pueden ser útiles:

Iniciar un programa específico.

```bash
sudo supervisorctl start nombre_del_programa
```

Detener un programa específico:

```bash
sudo supervisorctl stop nombre_del_programa
```

Si deseas que **Supervisor** se inicie automáticamente cuando se inicie el sistema, ejecuta el siguiente comando:

```bash
sudo systemctl enable supervisor
```

Para reiniciar **Supervisor**, ejecuta el siguiente comando:

```bash
sudo service supervisor restart
```

<Autor
  imagen="https://avatars.githubusercontent.com/u/52323838?v=4"
  nombre="Wilmer Alonso Sanchez Saez"
  rol="Desarrollador Full Stack"
  git="https://github.com/wilmersaz"
/>

<Autor
  imagen="https://avatars.githubusercontent.com/u/51100789?v=4"
  nombre="John Alejandro Diaz Pinilla"
  rol="Desarrollador Nivel II"
  git="https://github.com/alejandrodiazpinilla"
/>

