Microsoft ODBC 17

To install Microsoft ODBC driver 17 for SQL Server on macOS, run the following commands:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql17 mssql-tools
```

**Important**
If you installed the v17 `msodbcsql` package that was briefly available, you should remove it before installing the `msodbcsql17` package. This will avoid conflicts. The `msodbcsql17` package can be installed side by side with the `msodbcsql` v13 package.


PHP should now be in your path. Run php -v to verify that you are running the correct version of PHP. If PHP is not in your path or it is not the correct version, run the following commands:

```bash
brew link --force --overwrite php@8.1
```

If using Apple M1 ARM64, you might need to set the path:

```bash
export PATH="/opt/homebrew/bin:$PATH"
```

In addition, you may need to install the GNU make tools:

```bash
brew install autoconf automake libtool
```

Install the PHP drivers for Microsoft SQL Server (macOS)

```bash
sudo pecl install sqlsrv
sudo pecl install pdo_sqlsrv
```

If using Apple M1 ARM64, do the following instead:

```bash
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl install sqlsrv
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl install pdo_sqlsrv
```

```bash
brew services restart httpd
```