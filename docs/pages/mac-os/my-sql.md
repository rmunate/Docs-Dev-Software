---
title: MySQL en Mac
---

# Instalar MySQL en Mac OS

Para instalar MySQL en macOS utilizando Homebrew, puedes seguir estos pasos:

1. Abre una terminal en tu Mac. Puedes encontrar la Terminal en la carpeta "Utilidades" dentro de la carpeta "Aplicaciones".

2. Asegúrate de tener Homebrew instalado. Si aún no lo tienes instalado, puedes hacerlo ejecutando el siguiente comando en la Terminal:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

   Esto descargará e instalará Homebrew en tu sistema.

3. Una vez que tengas Homebrew instalado, puedes instalar MySQL ejecutando el siguiente comando:

   ```bash
   brew install mysql
   ```

   Homebrew descargará e instalará MySQL y sus dependencias.

4. Después de la instalación, puedes iniciar el servidor MySQL usando el siguiente comando:

   ```bash
   brew services start mysql
   ```

   Esto iniciará el servidor MySQL y lo configurará para que se inicie automáticamente en el arranque.

5. Puedes verificar que MySQL se está ejecutando correctamente utilizando el siguiente comando:

   ```bash
   mysql -V
   ```

   Esto debería mostrar la versión de MySQL instalada.

6. Ahora puedes acceder a MySQL ejecutando el siguiente comando y siguiendo las instrucciones para establecer una contraseña para el usuario "root" de MySQL:

   ```bash
   mysql_secure_installation
   ```

   Esto te permitirá configurar la seguridad básica de MySQL.

¡Eso es todo! Ahora tienes MySQL instalado y en funcionamiento en tu Mac utilizando Homebrew. Puedes comenzar a usarlo para administrar bases de datos.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>