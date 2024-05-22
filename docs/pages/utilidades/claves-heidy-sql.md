---
title: Recuperar Claves Heidy SQL
outline: deep
---

# Recuperar Contraseñas Heidy SQL

Si se te han olvidado las contraseñas que usas en las diferentes conexiones de Heidy SQL, tiene una excelente y facil forma de recuperarlas.

Simplemente exporta el archivo de configuracion existente en el sistema, luego busca dentro de este archivo las contraseñas que vendran encriptadas. ahora simplemente apoyate del siguiente Script Javascript para poder conocer el valor desencriptado:

```javascript
<script>

    function heidiDecode(hex) {
      var str = '';
      var shift = parseInt(hex.substr(-1));
      hex = hex.substr(0, hex.length - 1);
      for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16) - shift);
      return str;
    }

    //Desencriptar Valores:
    document.write(
      heidiDecode('5B3D7E3A3B393B3A372D9')
      + '<br>' + heidiDecode('3453H5G3H43')
    );

</script>
```

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>