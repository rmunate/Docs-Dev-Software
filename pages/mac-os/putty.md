---
title: Putty en Mac
---

# Instalar Putty en Mac OS

**Paso 1:** Instala Homebrew (si aún no lo tienes instalado). Abre la Terminal y ejecuta el siguiente comando:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Sigue las instrucciones en pantalla para completar la instalación de Homebrew.

**Paso 2:** Una vez que Homebrew esté instalado, puedes usarlo para instalar PuTTY y obtener la herramienta "puttygen". Ejecuta el siguiente comando:

```bash
brew install putty
```

Esto instalará PuTTY y otras herramientas relacionadas, incluyendo "puttygen".

**Paso 3:** Con "puttygen" instalado, puedes convertir tu clave privada PPK a formato PEM usando el siguiente comando en la Terminal. Asegúrate de reemplazar "tu-archivo.ppk" y "tu-archivo.pem" con los nombres de tus archivos de entrada y salida:

```bash
puttygen tu-archivo.ppk -O private-openssh -o tu-archivo.pem
```

Por ejemplo, si tu archivo se llama "apache-key.ppk" y deseas que el archivo de salida se llame "apache-key.pem", el comando sería:

```bash
puttygen apache-key.ppk -O private-openssh -o apache-key.pem
```

Después de ejecutar este comando, habrás convertido tu clave privada PPK a formato PEM y podrás utilizar el archivo "apache-key.pem" en aplicaciones que requieran una clave privada en formato PEM. Asegúrate de proteger este archivo adecuadamente, ya que contiene información sensible.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>