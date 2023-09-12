# Development Environment on macOS

I've had the opportunity to test different development environment solutions on macOS. For a while, I worked with MAMP (https://www.mamp.info/en/mamp-pro/mac/), and later, when Herd Laravel (https://herd.laravel.com/) was released, I also worked with it. However, I encountered various issues with handling extensions, modifying php.ini, managing native PHP systems without a framework, problems with unexpected server responses, and issues with OpenSSL, among others.

Due to these challenges, I decided to use the best method that has worked for me on macOS to date. Below, I'll provide instructions for setting up an Apache + PHP + MySQL environment on macOS, which is easy to configure and, above all, very efficient and functional.

While this document may seem lengthy, it has been detailed to make the process as clear as possible. In reality, it's quite simple.

## APACHE INSTALLATION

### XCode Command Line Tools
Install XCode Command Line Tools:

```bash
xcode-select --install
```

### Homebrew Installation
This process heavily depends on the macOS package manager called Homebrew. With the `brew` command, you can easily add powerful functionality to your Mac, but first, you need to install it. Open your Terminal application (`/Applications/Utilities/Terminal`) and enter the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Simply follow the Terminal prompts and enter your password when prompted. This may take a few minutes.

If it's a fresh installation and your path isn't configured correctly, you can either follow the customized "next steps" during installation or manually add the following lines to your .bashrc or .zshrc:

```bash
eval "$(/usr/local/bin/brew shellenv)"
```

You can now test your installation to ensure that brew has been installed correctly. Simply type:

```bash
brew --version
```

The response should be something similar to this: `Homebrew 4.1.10`

You should also run the following command to ensure everything is set up correctly; this will let you know if anything needs fixing:

```bash
brew doctor
```

### Install OpenSSL
Simply run:

```bash
brew install openssl
```

### Install Apache2
If you already have the built-in Apache running, you need to stop it and remove any automatic loading scripts. It's not harmful to run all these commands in order, even if it's a fresh installation:

```bash
sudo apachectl stop
sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null
```

Now, we need to install the new version provided by Brew:

```bash
brew install httpd
```

Without options, httpd won't need to be compiled from source, so it installs quite quickly. Upon completion, you should see a message like: `🍺  /usr/local/Cellar/httpd/2.4.54_1: 1,662 files, 31.9MB`

Now, we just need to configure things so that our new Apache server starts automatically.

```bash
brew services start httpd
```

Now you've installed Apache using Homebrew and configured it to start automatically with elevated privileges. It should already be running, so you can try accessing your server in a browser by pointing it to `http://localhost:8080`. You should see a simple header saying "It works!"

![Apache](https://getgrav.org/user/pages/03.blog/macos-ventura-apache-multiple-php-versions/it-works.png)

**Troubleshooting Tips**
If you get a message saying that the browser can't connect to the server, first check if the server is running:

```bash
ps -aef | grep httpd
```

You should see some httpd processes if Apache is running. Try restarting Apache with:

```bash
brew services restart httpd
```

You can view Apache's error log in a new Terminal tab/window during a restart to see if anything is invalid or causing an issue:

```bash
tail -f /usr/local/var/log/httpd/error_log
```

Apache is controlled through the `brew services` command, so some useful commands to use are:

```bash
brew services stop httpd
brew services start httpd
brew services restart httpd
```

### Install VSCode
You can use HomeBrew to install VSCode and its accompanying CLI `code` command in one go:

```bash
brew install --cask visual-studio-code
```

If you already have Visual Studio Code installed, you can easily create a symbolic link for `code` with:

```bash
ln -s /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code /usr/local/bin/code
```

### Apache Configuration
Now that we have a web server up and running, we want to make some configuration changes to make it work better as a local development server.

In the latest version of Brew, you need to manually set the default listening port to 8080 instead of 80. To do this, you'll need to edit the Apache configuration file at `/usr/local/etc/httpd/httpd.conf`.

If you've followed the previous instructions, you should be able to use Visual Studio Code to edit your files using the `code` Terminal command:

```bash
code /usr/local/etc/httpd/httpd.conf
```

![httpd](https://getgrav.org/user/pages/03.blog/macos-ventura-apache-multiple-php-versions/vsc.png?)

Search for the line that says `Listen 8080` and change it to `Listen 80`.

Next, we'll configure it to use a different document root for Apache. This is the folder from which Apache looks to serve files. By default, the document root is set to `/usr/local/var/www`. Since this is a development machine, let's assume you want to change the document root to a folder in your own home directory.

Look for the `DocumentRoot` term and you should see the following line:

```bash
DocumentRoot "/usr/local/var/www"
```

Change this to point to your user directory where `your_user` is your actual user account name:

```bash
DocumentRoot "/Users/your_user/Sites"
```

You should also change the `<Directory>` reference right below the `DocumentRoot` line to point to the new document root as well:

```bash
<Directory "/Users/your_user/Sites">
```

In that same `<Directory>` block, you'll find an `AllowOverride` setting, which should be changed to:

```bash
#
# AllowOverride controls what directives may be placed in .htaccess files.
# It can be "All", "None", or any combination of the keywords:
#   AllowOverride FileInfo AuthConfig Limit
#
AllowOverride All
```

Additionally, we should enable mod_rewrite, which is commented out by default. Look for `mod_rewrite.so` and uncomment the line by removing the `#` at the beginning:

```bash
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
```

### Configure User Group
Now we have Apache configured to point to a `Sites` folder in your home directory. However, there's still an issue. By default, Apache runs as the user `_www` and group `_www`. This can cause permission issues when trying to access files in your home directory. About a third of the `httpd.conf` file, you'll find two settings for configuring `User` and `Group`. Change them to match your user account (replace

 `your_user` with your actual username), with a group of `staff`:

```bash
User your_user
Group staff
```

### Server Name
Apache likes to have a server name in the configuration, but it's disabled by default, so look for:

```bash
#ServerName www.example.com:8080
```

Uncomment it and change it to:

```bash
ServerName localhost
```

### Sites Folder
Now, you need to create a `Sites` folder in the root of your home directory. You can do this in your terminal or Finder. In this new `Sites` folder, create a simple `index.html` file and place some dummy content like: `<h1>My User Web Root</h1>`.

```bash
mkdir ~/Sites
echo "<h1>My User Web Root</h1>" > ~/Sites/index.html
```

Restart Apache to ensure that the configuration changes take effect:

```bash
brew services stop httpd
brew services start httpd
```

When you point your browser, it should display your new message. If that works, we can proceed!

![LocalHost](https://getgrav.org/user/pages/03.blog/macos-ventura-apache-multiple-php-versions/sites-webroot.png)

## PHP INSTALLATION

Until late March 2018, all PHP-related brews were handled via `Homebrew/php` taps, but those have become outdated. We now use what's available in the `Homebrew/core` package, which is better maintained but less comprehensive.

Brew officially supports PHP 8.0 to 8.1, but these also need to be compiled, which can be quite slow. For the latest version of our guide, we will use the new `shivammathur` tap (https://github.com/shivammathur/homebrew-php), as it has many prebuilt versions, including PHP 8.2.

```bash
brew tap shivammathur/php
```

We will proceed to install various PHP versions and use a simple script to switch between them as needed. Feel free to exclude any version you don't want to install.

```bash
brew install shivammathur/php/php@7.4
brew install shivammathur/php/php@8.0
brew install shivammathur/php/php@8.1
brew install shivammathur/php/php@8.2
```

You may also need to modify the PHP configuration as needed. Common changes include memory settings or the `date.timezone` configuration. The `php.ini` files for each PHP version can be found in the following directories:

```bash
/usr/local/etc/php/7.4/php.ini
/usr/local/etc/php/8.0/php.ini
/usr/local/etc/php/8.1/php.ini
/usr/local/etc/php/8.2/php.ini
```

**At this point, I recommend closing ALL terminal tabs and windows. You will need to open a new terminal to continue with the next step. This is highly recommended because existing terminals can sometimes cause strange path issues.**

We've installed but not linked these PHP versions. To switch to PHP 8.1, for example, you can use:

```bash
brew unlink php && brew link --overwrite --force php@8.1
```

A quick check to ensure we're on the right version:

```bash
php -v

# PHP 8.1.0 (cli) (NTS)
# Copyright (c) The PHP Group
# Zend Engine v4.2.0, Copyright (c) Zend Technologies
#     with Zend OPcache v8.1.0, Copyright (c), by Zend Technologies
```

To switch to PHP 8.2, for example:

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

## APACHE CONFIGURATION
You've successfully installed your PHP versions, but we need to tell Apache to use them. Again, you'll need to edit the `/usr/local/etc/httpd/httpd.conf` file and scroll to the end of the `LoadModule` entries.

If you've followed this guide correctly, the last entry should be your `mod_rewrite` module:

```shell
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
```

Below this, add the following `libphp` modules for each PHP version you want to use:

```shell
#LoadModule php7_module /usr/local/opt/php@7.4/lib/httpd/modules/libphp7.so
#LoadModule php_module /usr/local/opt/php@8.0/lib/httpd/modules/libphp.so
#LoadModule php_module /usr/local/opt/php@8.1/lib/httpd/modules/libphp.so
LoadModule php_module /usr/local/opt/php@8.2/lib/httpd/modules/libphp.so
```

You can only have one PHP module processing at a time, so for now, we've left our `php@8.2` entry uncommented while all others are commented. This tells Apache to use `PHP 8.2` to handle PHP requests. (We'll add the ability to switch PHP versions later.)

You should also explicitly configure directory indexes for PHP. Search for this block:

```xml
<IfModule dir_module>
    DirectoryIndex index.html
</IfModule>
```

Replace it with this:

```xml
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

Save the file and stop Apache, then start it again now that we've installed PHP:

```shell
brew services stop httpd
brew services start httpd
```

## DYNAMIC PHP VERSION SWITCHING
We've coded Apache to use PHP 8.2, but we really want to be able to switch between versions. Fortunately, some hardworking folks have already done the heavy lifting for us and written a very useful PHP switching script.

We'll install the `sphp` script in the standard Brew location `/usr/local/bin`:

```shell
curl -L https://raw.githubusercontent.com/rhukster/sphp.sh/main/sphp.sh > /usr/local/bin/sphp
chmod +x /usr/local/bin/sphp
```

### Testing PHP Version Switching
After completing these steps, you should be able to change your PHP version using the `sphp` command followed by a two-digit value for the PHP version:

```shell
sphp 8.1
```

You'll likely need to enter your admin password, and it should provide you with some feedback:

```shell
# Switch to a specific version
sphp 8.1

# Verify the new version
php -v

PHP 8.1.13 (cli) (built: Dec  7 2022 23:32:13) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.13, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.13, Copyright (c), by Zend Technologies
```

## INSTALLING MYSQL
To install MySQL

 on macOS using Homebrew, you can follow these steps:

1. Open a terminal on your Mac. You can find Terminal in the "Utilities" folder within the "Applications" directory.

2. Install MySQL using Homebrew:

```shell
brew install mysql
```

Homebrew will download and install MySQL along with its dependencies.

3. After the installation, you can start the MySQL server with the following command:

```shell
brew services start mysql
```

This will start the MySQL server and configure it to start automatically on boot.

4. You can verify that MySQL is running correctly by using the following command:

```shell
mysql -V
```

This should display the installed version of MySQL.

5. Now you can access MySQL by running the following command and following the instructions to set a password for the MySQL "root" user:

```shell
mysql_secure_installation
```

This will allow you to configure basic MySQL security settings.