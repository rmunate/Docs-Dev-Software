# Ambiente De Desarrollo MAC OS
He tenido la oportunidad de probar diferentes soluciones de ambientes de desarrollo en MAC OS, durante un tiempo trabaje con MAMP (https://www.mamp.info/en/mamp-pro/mac/) y luego cuando salio Herd Laravel (https://herd.laravel.com/) tambien trabajé con este, sin embargo he tenido diversos inconvenientes con manejo de extensiones, modificaciones al php.ini, manejo de sistemas en PHP nativo sin framework, problemas con respuestas inesperadas de parte del servidor, inasistencia a temas de OpenSSL, etc.
Debido a esto decidi emplear la mejor manera que a la fecha me ha servido para trabjar sobre IOS, a continuacion relaciono el manual de instalacion del ambiente de Apache + PHP + MySQL en IOS, una manera facil, sencilla de configurar y sobre todo muy eficiente y funcional.

Aunque se vea largo el documento solo es porque se ha buscado detallar lo mejor posible el proceso pero es muy simple de hacerlo.

## INSTALACION DE APACHE

### Herramientas de línea de comandos de XCode
Herramientas de línea de comandos de XCode

```bash
xcode-select --install
```

### Instalacion de Homebrew
Este proceso depende en gran medida del administrador de paquetes de macOS llamado Homebrew . Con el brewcomando puedes agregar fácilmente una potente funcionalidad a tu Mac, pero primero tenemos que instalarla. Este es un proceso simple, pero debe iniciar su aplicación Terminal ( /Applications/Utilities/Terminal) y luego ingresar:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Simplemente siga las indicaciones del terminal e ingrese su contraseña cuando sea necesario. Esto puede tomar unos pocos minutos.

Si se trata de una instalación nueva y no tiene la ruta configurada correctamente, puede seguir los "próximos pasos" de instalación que ya están personalizados para usted, o puede agregar manualmente las siguientes rutas a su .bashrco .zshrc:

```bash
eval "$(/usr/local/bin/brew shellenv)"
```

Ahora puede probar su instalación para asegurarse de que la haya instalado brewcorrectamente, simplemente escriba:

```bash
brew --version
```
La respuesta deberá ser algo similar a esto `Homebrew 4.1.10`

Probablemente también deberías ejecutar el siguiente comando para asegurarte de que todo esté configurado correctamente, esto le indicará si necesita corregir algo.:

```bash
brew doctor
```

### Instalar OpenSSL

Simplemente ejecute esto ahora:

```bash
brew install openssl
```

### Instalar Apache2

Si ya tiene el Apache integrado ejecutándose, primero deberá apagarlo y eliminar todos los scripts de carga automática. Realmente no está de más ejecutar todos estos comandos en orden, incluso si se trata de una instalación nueva:

```bash
sudo apachectl stop
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null
```

Ahora necesitamos instalar la nueva versión proporcionada por Brew:

```bash
brew install httpd
```

Sin opciones, httpd no será necesario compilarlo desde el código fuente, por lo que se instala con bastante rapidez. Al finalizar deberías ver un mensaje como: `🍺  /usr/local/Cellar/httpd/2.4.54_1: 1,662 files, 31.9MB`

Ahora solo necesitamos configurar cosas para que nuestro nuevo servidor Apache se inicie automáticamente.

```bash
brew services start httpd
```

Ahora ha instalado Apache de Homebrew y lo ha configurado para que se inicie automáticamente con una cuenta privilegiada. Ya debería estar ejecutándose, así que puedes intentar acceder a tu servidor en un navegador apuntándolo a , deberías ver un encabezado simple que dice "¡Funciona!". `http://localhost:8080`

![Apache](https://getgrav.org/user/pages/03.blog/macos-ventura-apache-multiple-php-versions/it-works.png)

**Consejos para solucionar problemas**
Si recibe un mensaje que indica que el navegador no puede conectarse al servidor, primero verifique que el servidor esté activo.

```bash
ps -aef | grep httpd
```

Debería ver algunos procesos httpd si Apache está en funcionamiento.
Intente reiniciar Apache con:

```bash
brew services restart httpd
```

Puede ver el registro de errores de Apache en una nueva pestaña/ventana de Terminal durante un reinicio para ver si algo no es válido o está causando un problema:

```bash
tail -f /usr/local/var/log/httpd/error_log
```

Apache se controla mediante el brew servicescomando, por lo que algunos comandos útiles para usar son:

```bash
brew services stop httpd
brew services start httpd
brew services restart httpd
```

### Instalar VSCode
Podemos hacer uso de HomeBrew e instalar VSCode y el codecomando CLI que lo acompaña de una sola vez con:

```bash
brew install --cask visual-studio-code
```

Si ya tiene instalado Visual Studio Code, puede crear fácilmente un codeenlace simbólico con:

```bash
ln -s /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code /usr/local/bin/code
```

### Configuracion de Apache
Ahora que tenemos un servidor web en funcionamiento, lo que queremos hacer es realizar algunos cambios de configuración para que funcione mejor como servidor de desarrollo local.

En la última versión de Brew, debe configurar manualmente el puerto de escucha predeterminado a 8080, 80por lo que necesitaremos editar el archivo de configuración de Apache /usr/local/etc/httpd/httpd.conf.

Si siguió las instrucciones anteriores, debería poder usar Visual Studio Code para editar sus archivos usando el codecomando Terminal.

```bash
code /usr/local/etc/httpd/httpd.conf
```

![httpd](https://getgrav.org/user/pages/03.blog/macos-ventura-apache-multiple-php-versions/vsc.png?)

Busca la línea que dice `Listen 8080` y cambiala a `Listen 80`

A continuación lo configuraremos para usar para cambiar la raíz del documento para Apache. Esta es la carpeta desde donde Apache busca servir el archivo. De forma predeterminada, la raíz del documento está configurada como /usr/local/var/www. Como se trata de una máquina de desarrollo, supongamos que queremos cambiar la raíz del documento para que apunte a una carpeta en nuestro propio directorio de inicio.

Busque el término DocumentRooty debería ver la siguiente línea:

```bash
DocumentRoot "/usr/local/var/www"
```

Cambie esto para que apunte a su directorio de usuarios donde `your_user` sea el nombre de su cuenta de usuario:

```bash
DocumentRoot "/Users/your_user/Sites"
```

También debe cambiar la `<Directory>` referencia de la etiqueta justo debajo de la línea `DocumentRoot`. Esto también debería cambiarse para que apunte a la nueva raíz del documento:

```bash
<Directory "/Users/your_user/Sites">
```

En ese mismo `<Directory>` bloque encontrarás una `AllowOverride` configuración, esta se debe cambiar de la siguiente manera:

```bash
#
# AllowOverride controls what directives may be placed in .htaccess files.
# It can be "All", "None", or any combination of the keywords:
#   AllowOverride FileInfo AuthConfig Limit
#
AllowOverride All
```

Además, ahora deberíamos habilitar mod_rewrite, que está comentado de forma predeterminada. Busque `mod_rewrite.so` y descomente la línea eliminando el encabezado #.

```bash
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
```

### Configurar grupo de usuario
Ahora tenemos la configuración de Apache apuntando a una Sitescarpeta en nuestro directorio de inicio. Sin embargo, todavía existe un problema. De forma predeterminada, Apache se ejecuta como usuario `_www` y grupo `_www`. Esto causará problemas de permisos al intentar acceder a archivos en nuestro directorio de inicio. Aproximadamente en un tercio del h`ttpd.conf` archivo hay dos configuraciones para configurar `User` y `Group`. Cámbielos para que coincidan con su cuenta de usuario (reempláce `your_user` con su nombre de usuario real), con un grupo de `staff`:

```bash
User your_user
Group staff
```

### Nombre del servidor
A Apache le gusta tener un nombre de servidor en la configuración, pero está deshabilitado de forma predeterminada, así que busque:

```bash
#ServerName www.example.com:8080
```

A Apache le gusta tener un nombre de servidor en la configuración, pero está deshabilitado de forma predeterminada, así que busque:

```bash
ServerName localhost
```

### Carpeta de sitios
Ahora, necesita crear una `Sites` carpeta en la raíz de su directorio de inicio. Puedes hacer esto en tu terminal o en Finder. En esta nueva `Sites` carpeta, cree una carpeta simple `index.html` y coloque contenido ficticio como: `<h1>My User Web Root</h1>`.

```bash
mkdir ~/Sites
echo "<h1>My User Web Root</h1>" > ~/Sites/index.html
```

Reinicie Apache para asegurarse de que los cambios de configuración hayan surtido efecto:

```bash
brew services stop httpd
brew services start httpd
```

Al apuntar su navegador debería mostrar su nuevo mensaje. Si eso funciona, ¡podemos seguir adelante!

![LocalHost](https://getgrav.org/user/pages/03.blog/macos-ventura-apache-multiple-php-versions/sites-webroot.png)

## INSTALACION DE PHP

Hasta finales de marzo de 2018, todas las elaboraciones relacionadas con PHP se manejaban mediante `Homebrew/php` pestañas, pero eso ha quedado obsoleto, por lo que ahora usamos lo que está disponible en el `Homebrew/core` paquete. Este debería ser un conjunto de paquetes mejor mantenido, pero mucho menos completo.

Brew solo admite oficialmente PHP 8.0 a 8.1 , pero estos también deben compilarse, lo cual es bastante lento. Para la última versión de nuestra guía usaremos el nuevo toque de @shivammahtur (https://github.com/shivammathur/homebrew-php) ya que hay muchas versiones (incluida la última PHP 8.2) prediseñadas.

```bash
brew tap shivammathur/php
```

Procederemos instalando varias versiones de PHP y usando un script simple para cambiar entre ellas según sea necesario. No dudes en excluir cualquier versión que no quieras instalar.

```bash
brew install shivammathur/php/php@7.4
brew install shivammathur/php/php@8.0
brew install shivammathur/php/php@8.1
brew install shivammathur/php/php@8.2
```

Además, es posible que necesite modificar la configuración de PHP según sus necesidades. Algo común que se debe cambiar es la configuración de la memoria o la `date.timezone` configuración. Los `php.ini` archivos para cada versión de PHP se encuentran en los siguientes directorios:

```bash
/usr/local/etc/php/7.4/php.ini
/usr/local/etc/php/8.0/php.ini
/usr/local/etc/php/8.1/php.ini
/usr/local/etc/php/8.2/php.ini
```

__En este punto, recomiendo cerrar TODAS las pestañas y ventanas de su terminal. Esto supondrá abrir una nueva terminal para continuar con el siguiente paso. Esto es muy recomendable porque pueden surgir algunos problemas de ruta realmente extraños con los terminales existentes.__

Hemos instalado pero no vinculado estas versiones de PHP. Para cambiar a PHP `8.1` por ejemplo podemos escribir:

```bash
brew unlink php && brew link --overwrite --force php@8.1
```

Prueba rápida de que estamos en la versión correcta:

```bash
php -v

# PHP 8.1.0 (cli) (NTS)
# Copyright (c) The PHP Group
# Zend Engine v4.2.0, Copyright (c) Zend Technologies
#     with Zend OPcache v8.1.0, Copyright (c), by Zend Technologies
```

y para cambiar a 8.2 por ejemplo:

```bash
brew unlink php && brew link --overwrite --force php@8.2
```

```bash
php -v

# PHP 8.2.0 (cli) (NTS)
# Copyright (c) The PHP Group
# Zend Engine v4.2.0, Copyright (c) Zend Technologies
#     with Zend OPcache v8.2.0, Copyright (c), by Zend Technologies
```

## CONGIGURACIÓN APACHE
Ha instalado correctamente sus versiones de `PHP`, pero debemos indicarle a Apache que las use. Nuevamente deberá editar el `/usr/local/etc/httpd/httpd.conf` archivo y desplazarse hasta el final de las `LoadModule` entradas.

Si ha seguido esta guía correctamente, la última entrada debería ser su `mod_rewrite` módulo:

```shell
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
```

Debajo de esto agregue los siguientes libphpmódulos:

```shell
#LoadModule php7_module /usr/local/opt/php@7.4/lib/httpd/modules/libphp7.so
#LoadModule php_module /usr/local/opt/php@8.0/lib/httpd/modules/libphp.so
#LoadModule php_module /usr/local/opt/php@8.1/lib/httpd/modules/libphp.so
LoadModule php_module /usr/local/opt/php@8.2/lib/httpd/modules/libphp.so
```

Solo podemos tener un módulo procesando `PHP` a la vez, así que por ahora hemos dejado nuestra `php@8.2` entrada sin comentar mientras que todos los demás están comentados. Esto le indicará a Apache que use `PHP 8.2` para manejar las solicitudes de `PHP`. ( Agregaremos la capacidad de cambiar de versión de PHP más adelante ).

También debes configurar los índices de directorio para PHP explícitamente, así que busca este bloque:

```xml
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
```

y reemplazarlo con esto:

```xml
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

Guarde el archivo y detenga Apache, luego comience nuevamente , ahora que hemos instalado PHP:

```shell
brew services stop httpd
brew services start httpd
```

## CAMBIAR DINAMICAMENTE DE VERSION DE PHP
Codificamos Apache para usar PHP 8.2 , pero realmente queremos poder cambiar entre versiones. Afortunadamente, algunas personas trabajadoras ya hicieron el trabajo duro por nosotros y escribieron un pequeño `script` de `conmutación PHP` muy útil .

Instalaremos el `sphp` script en el estándar de Brew `/usr/local/bin`:

```shell
curl -L https://raw.githubusercontent.com/rhukster/sphp.sh/main/sphp.sh > /usr/local/bin/sphp
chmod +x /usr/local/bin/sphp
```

### Probando el cambio de PHP
Después de haber completado estos pasos, debería poder cambiar su versión de PHP usando el comando sphpseguido de un valor de dos dígitos para la versión de PHP:

```shell
sphp 8.1
```

Probablemente tendrás que ingresar tu contraseña de administrador, y debería darte algunos comentarios:

```shell
#Cambiar a una version especifica
sphp 8.1

#Validar nueva versión
php -v

PHP 8.1.13 (cli) (built: Dec  7 2022 23:32:13) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.13, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.13, Copyright (c), by Zend Technologies
```

## INSTALAR MYSQL
Para instalar MySQL en macOS utilizando Homebrew, puedes seguir estos pasos:
- Abre una terminal en tu Mac. Puedes encontrar la Terminal en la carpeta "Utilidades" dentro de la carpeta "Aplicaciones".

```shell
brew install mysql
```
Homebrew descargará e instalará MySQL y sus dependencias.

- Después de la instalación, puedes iniciar el servidor MySQL usando el siguiente comando:

```shell
brew services start mysql
```

Esto iniciará el servidor MySQL y lo configurará para que se inicie automáticamente en el arranque.

- Puedes verificar que MySQL se está ejecutando correctamente utilizando el siguiente comando:

```shell
mysql -V
```

Esto debería mostrar la versión de MySQL instalada.

- Ahora puedes acceder a MySQL ejecutando el siguiente comando y siguiendo las instrucciones para establecer una contraseña para el usuario "root" de MySQL:

```shell
mysql_secure_installation
```

Esto te permitirá configurar la seguridad básica de MySQL.