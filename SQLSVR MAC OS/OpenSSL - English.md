## OpenSSL

In some cases, to connect to SQL Server databases from macOS, you may need to make certain changes to OpenSSL. Here's the process you should follow:

You may encounter an SSL compatibility issue with the client.

1. First, validate the version of OpenSSL installed. If you have version 1.1, you can proceed to create the symbolic link. If not, you should execute the following command:

2. Install OpenSSL@1.1 using Homebrew:

   ```bash
   brew install openssl@1.1
   ```

   This will install OpenSSL@1.1 at the following location: `/usr/local/etc/openssl@1.1`.

3. Navigate to this location and open the `openssl.cnf` file. Add the following configurations to it.

   At the beginning of the file, add:

   ```bash
   openssl_conf = openssl_init
   ```

   At the end of the file, add:

   ```bash
   [openssl_init]
   ssl_conf = ssl_sect

   [ssl_sect]
   system_default = system_default_sect

   [system_default_sect]
   CipherString = DEFAULT@SECLEVEL=1
   ```

4. Now, let's check the symbolic link. This link should be located at:

   ```shell
   /usr/local/opt/openssl
   ```

   If, for some reason, this link already exists but points to a different version, consider renaming it. For example, you can name it `openssl_old`. It's better not to delete it, as it might be useful later. After that, simply restart your Mac, and you should be able to connect your PHP environment with SQL Server.