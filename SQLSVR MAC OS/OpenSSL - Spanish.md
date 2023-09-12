## OpenSSL

En algunos casos, para poder conectarte a bases de datos SQL Server desde macOS, es posible que necesites realizar ciertos cambios en OpenSSL. Aquí está el proceso que debes seguir:

Puedes encontrarte con un problema de compatibilidad SSL con el cliente.

1. Primero, valida la versión de OpenSSL que tienes instalada. Si tienes la versión 1.1, puedes continuar y crear el enlace simbólico. Si no es así, debes ejecutar el siguiente comando:

2. Instala OpenSSL@1.1 utilizando Homebrew:

   ```bash
   brew install openssl@1.1
   ```

   Esto instalará OpenSSL@1.1 en la siguiente ubicación: `/usr/local/etc/openssl@1.1`.

3. Navega hasta esta ubicación y abre el archivo `openssl.cnf`. Agrega las siguientes configuraciones al archivo.

   Al principio del archivo, agrega:

   ```bash
   openssl_conf = openssl_init
   ```

   Al final del archivo, agrega:

   ```bash
   [openssl_init]
   ssl_conf = ssl_sect

   [ssl_sect]
   system_default = system_default_sect

   [system_default_sect]
   CipherString = DEFAULT@SECLEVEL=1
   ```

4. Ahora, revisemos el enlace simbólico. Este enlace debe estar ubicado en:

   ```shell
   /usr/local/opt/openssl
   ```

   Si, por alguna razón, este enlace ya existe pero apunta a una versión diferente, considera cambiarle el nombre. Por ejemplo, puedes nombrarlo como `openssl_old`. Es mejor no eliminarlo, ya que podría ser útil más adelante. Después de eso, simplemente reinicia tu Mac y deberías poder conectar tu entorno PHP con SQL Server.