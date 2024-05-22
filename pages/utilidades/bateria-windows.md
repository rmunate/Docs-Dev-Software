---
title: Control Bateria Windows
outline: deep
---

# Control Bateria Windows

## Script Control Bateria

Si quieres cuidar el estado de la bateria de tu PC, puedes crear un simple archivo de extension `vbs` que se encargue de monitorearla por ti:

```shell
set oLocator = CreateObject("WbemScripting.SWbemLocator")
set oServices = oLocator.ConnectServer(".","root\wmi")
set oResults = oServices.ExecQuery("select * from batteryfullchargedcapacity")
for each oResult in oResults
iFull = oResult.FullChargedCapacity
next

while (1)
set oResults = oServices.ExecQuery("select * from batterystatus")
for each oResult in oResults
iRemaining = oResult.RemainingCapacity
bCharging = oResult.Charging
next
iPercent = ((iRemaining / iFull) * 100) mod 100
if bCharging and (iPercent > 95) Then msgbox "Ingeniero Raul la bateria llego a " & iPercent & "%",vbInformation, "Monitor de bateria"
wscript.sleep 30000 ' 5 minutes
wend
```

Puedes modificar el mensaje que te lanzara en la pantalla y definir en que momento hacerlo en esta linea: 
`if bCharging and (iPercent > 95) Then msgbox "Ingeniero Raul la bateria llego a " & iPercent & "%",vbInformation...`

## Crear Script Ejecutable

1. Abre un editor de texto como el Bloc de notas de Windows.

2. Copia y pega el código VBScript en el editor de texto.

3. Guarda el archivo con una extensión ".vbs". Por ejemplo, puedes llamarlo "MonitorBateria.vbs". Asegúrate de guardar el archivo en una ubicación conveniente en tu sistema.

4. Para ejecutar el script y monitorear continuamente la batería, haz doble clic en el archivo ".vbs" que has creado.

El script utilizará Windows Script Host (WSH) para ejecutarse y monitorear la batería. Si la batería alcanza más del 95% de carga mientras se está cargando, mostrará un mensaje emergente indicando que la batería ha alcanzado ese nivel. El script se ejecutará en un bucle infinito, comprobando el estado de la batería cada 5 minutos (como se especifica en `wscript.sleep 30000`).

Es importante destacar que este script funcionará en sistemas Windows y requerirá que WSH esté habilitado. Asegúrate de no tener otras aplicaciones o scripts que monitoreen la batería al mismo tiempo, ya que podría causar conflictos.

## Iniciar Script Con Windows

1. Abre el "Programador de tareas". Puedes buscarlo en el menú Inicio o usar el atajo "Win + R" para abrir el cuadro de diálogo "Ejecutar" y luego escribir `taskschd.msc` y presionar Enter.

2. En el "Programador de tareas", haz clic con el botón derecho en "Biblioteca del Programador de tareas" en el panel de la izquierda y selecciona "Crear carpeta". Puedes nombrar la carpeta como desees.

3. Haz clic con el botón derecho en la carpeta que creaste y selecciona "Crear tarea básica".

4. Aparecerá el "Asistente para la creación de tareas básicas". Dale un nombre a la tarea, por ejemplo, "Monitor de Batería".

5. Selecciona la opción "Iniciar la tarea al iniciar el equipo" y haz clic en "Siguiente".

6. Elije la opción "Iniciar un programa" y haz clic en "Siguiente".

7. En la siguiente pantalla, debes especificar el programa o script a ejecutar. Haz clic en "Examinar" y selecciona el archivo ".vbs" que creaste anteriormente (por ejemplo, "MonitorBateria.vbs"). Luego, haz clic en "Siguiente".

8. Revisa la configuración de la tarea y, si todo está correcto, haz clic en "Finalizar".

Ahora, el script se ejecutará automáticamente cada vez que inicies el sistema operativo.

<Autor 
  imagen="https://avatars.githubusercontent.com/u/91748598?v=4" 
  nombre="Raul Mauricio Uñate Castro" 
  rol="Desarrollador Full Stack"
  git="https://github.com/rmunate"
/>