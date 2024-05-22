---
title: GIT en Mac
---

# Instalar Git en Mac OS

Para instalar Git en macOS usando Homebrew, sigue estos pasos:

## Paso a Paso

1. Abre la Terminal en tu Mac. Puedes encontrarla en la carpeta "Utilidades" dentro de la carpeta "Aplicaciones".

2. Asegúrate de que Homebrew esté instalado. Si aún no lo has instalado, puedes hacerlo ejecutando el siguiente comando en la Terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Sigue las instrucciones en pantalla para completar la instalación de Homebrew.

3. Una vez que tengas Homebrew instalado, puedes instalar Git ejecutando el siguiente comando en la Terminal:

```bash
brew install git
```

Homebrew descargará e instalará Git en tu sistema.

4. Para verificar que Git se ha instalado correctamente, puedes ejecutar el siguiente comando en la Terminal:

```bash
git --version
```

Esto debería mostrar la versión de Git que se ha instalado en tu sistema.

¡Eso es todo! Ahora tienes Git instalado en tu Mac utilizando Homebrew. Puedes comenzar a usar Git para gestionar tus proyectos de control de versiones.

## Configurar Ambiente 

Configurar tu cuenta de GitHub en una Mac implica realizar algunos pasos básicos que te permitirán autenticarte y colaborar en proyectos en GitHub desde tu computadora. A continuación, te mostraré cómo hacerlo:

1. **Configura tu nombre y dirección de correo electrónico:**

Abre la Terminal y ejecuta los siguientes comandos para configurar tu nombre de usuario y dirección de correo electrónico. Estos datos se utilizarán para identificar tus contribuciones en GitHub.

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

2. **Genera una clave SSH (opcional):** 

Si deseas autenticarte en GitHub usando SSH en lugar de HTTPS, puedes generar una clave SSH y agregarla a tu cuenta de GitHub. Esto es útil para autenticarse de manera segura sin necesidad de ingresar tu nombre de usuario y contraseña cada vez.

   a. Ejecuta el siguiente comando para verificar si ya tienes una clave SSH:

   ```bash
   ls -al ~/.ssh
   ```

   b. Si no tienes una clave SSH, genera una nueva con el siguiente comando:

   ```bash
   ssh-keygen -t ed25519 -C "tu@email.com"
   ```

   Reemplaza "tu@email.com" con tu dirección de correo electrónico de GitHub.

   c. Presiona "Enter" para confirmar la ubicación predeterminada (~/.ssh/id_ed25519) y establece una contraseña si lo deseas (esto es opcional).

   d. Ahora, agrega la clave SSH a tu agente SSH:

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

   e. Copia la clave SSH pública al portapapeles:

   ```bash
   pbcopy < ~/.ssh/id_ed25519.pub
   ```

   f. Ve a la configuración de tu cuenta de GitHub en la web (https://github.com/settings/keys) y agrega la clave SSH pública que copiaste al portapapeles como una nueva clave SSH.

4. **Clona un repositorio:**

   Para probar tu configuración, puedes clonar un repositorio existente de GitHub en tu Mac. Ve al repositorio en GitHub que desees clonar y copia la URL del repositorio.

   En la Terminal, navega a la ubicación donde desees clonar el repositorio y ejecuta el siguiente comando, reemplazando `<URL_del_repositorio>` con la URL que copiaste:

   ```bash
   git clone <URL_del_repositorio>
   ```

   Esto clonará el repositorio en tu Mac.

Con estos pasos, has configurado Git en tu Mac y puedes empezar a trabajar con repositorios de GitHub. Si utilizaste una clave SSH, deberías poder interactuar con GitHub sin tener que ingresar tu contraseña cada vez que hagas una operación remota.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>