---
title: Llave PEM
---

# Crear llave PEM para VSCode

Para crear una clave PEM en tu servidor Ubuntu como root y autorizar una conexión desde Visual Studio Code (VSCode), puedes seguir estos pasos:

1. **Accede al servidor**: 

Inicia sesión en tu servidor Ubuntu como usuario root o utilizando `sudo` si tienes permisos de administrador. Puedes conectarte a través de SSH desde tu terminal local si estás fuera del servidor.

2. **Genera una clave SSH en el servidor**:

Utiliza el siguiente comando para generar una clave SSH en el servidor. Puedes especificar una ubicación diferente y un nombre de archivo si lo deseas. El comando generará una clave RSA de 2048 bits en formato PEM:

```bash
ssh-keygen -t rsa -b 2048 -f /ruta/a/llave.pem
```

Asegúrate de reemplazar "/ruta/a/llave.pem" con la ubicación y el nombre de archivo que desees.

3. **Protege la clave generada (opcional)**:

Puedes agregar una contraseña para proteger la clave generada si lo deseas. Esto proporcionará una capa adicional de seguridad. Utiliza el siguiente comando y sigue las instrucciones para establecer una contraseña:

```bash
openssl rsa -aes256 -in /ruta/a/llave.pem -out /ruta/a/llave-asegurada.pem
```

Reemplaza "/ruta/a/llave.pem" y "/ruta/a/llave-asegurada.pem" según tus preferencias.

4. **Asegura los permisos de la clave**:
Asegúrate de que la clave tenga los permisos adecuados para garantizar su seguridad. Utiliza el siguiente comando para establecer los permisos:

```bash
chmod 400 /ruta/a/llave.pem
```

5. **Autoriza la clave en el servidor remoto**:

Para autorizar la clave en el servidor remoto, debes agregar la clave pública correspondiente al archivo ".ssh/authorized_keys" en el directorio home del usuario al que deseas permitir el acceso. Utiliza el siguiente comando para agregar la clave pública al archivo authorized_keys:

```bash
cat /ruta/a/llave.pem.pub >> ~/.ssh/authorized_keys
```

Esto permitirá que el usuario correspondiente se conecte utilizando la clave privada que has generado.

6. **Verifica la configuración SSH en VSCode**:

- Abre Visual Studio Code y asegúrate de que la extensión "Remote - SSH" esté instalada.
- En la paleta de comandos, utiliza "Remote-SSH: Connect to Host" (Conectar a host) para establecer la conexión SSH utilizando la clave privada que has creado.

Con estos pasos, habrás generado una clave PEM en tu servidor Ubuntu y autorizado la conexión desde Visual Studio Code utilizando esa clave. 

::: warning ASEGURA LA CLAVE
Asegúrate de proteger adecuadamente la clave privada y de mantenerla segura.
:::

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>