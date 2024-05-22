---
title: SQLServer Drivers en Mac
---
# Instalar Drivers SQLServer en Mac OS

Para instalar el controlador Microsoft ODBC 17 para SQL Server en macOS, sigue estos comandos:

1. Abre una terminal en tu macOS.

2. Ejecuta el siguiente comando para instalar Homebrew si aún no lo tienes instalado:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

3. Agrega el repositorio de Microsoft SQL Server a Homebrew:

```bash
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
```

4. Actualiza Homebrew:

```bash
brew update
```

5. Asegúrate de aceptar el Acuerdo de Licencia de Microsoft antes de instalar los paquetes:

```bash
HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql17 mssql-tools
```

Esto instalará el controlador ODBC 17 y las herramientas SQL Server.

6. Si anteriormente habías instalado el paquete `msodbcsql` v17, asegúrate de desinstalarlo para evitar conflictos. Puedes desinstalarlo con el siguiente comando:

```bash
brew uninstall msodbcsql
```

El paquete `msodbcsql17` se puede instalar junto al paquete `msodbcsql` v13.

7. Verifica que PHP esté en tu ruta (path). Ejecuta el siguiente comando para verificar que estás utilizando la versión correcta de PHP:

```bash
php -v
```

Si PHP no está en tu ruta o no es la versión correcta, ejecuta los siguientes comandos:

```bash
brew link --force --overwrite php@8.1
```

Si estás utilizando una Mac con Apple M1 ARM64, es posible que necesites establecer la ruta:

```bash
export PATH="/opt/homebrew/bin:$PATH"
```

8. Además, es posible que necesites instalar las herramientas GNU Make:

```bash
brew install autoconf automake libtool
```

9. Instala los controladores PHP para Microsoft SQL Server:

```bash
sudo pecl install sqlsrv
sudo pecl install pdo_sqlsrv
```

Si estás utilizando una Mac con Apple M1 ARM64, utiliza estos comandos en su lugar:

```bash
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl install sqlsrv
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl install pdo_sqlsrv
```

10. Finalmente, reinicia Apache si lo estás utilizando:

```bash
brew services restart httpd
```

Con estos pasos, deberías tener el controlador ODBC 17 de Microsoft SQL Server y los controladores PHP necesarios instalados en tu sistema macOS. Esto te permitirá conectarte a una base de datos SQL Server desde tu aplicación PHP.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>