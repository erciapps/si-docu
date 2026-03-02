---
sidebar_position: 1
---
import AsciinemaWidget from '/src/components/AsciinemaWidget';


# Gestión de tareas
## Introducción
La automatización de tareas en Linux se lleva a cabo mediante la ejecución de tareas planificadas para un momento puntual 
o para el lanzamiento recurrente de tareas. Ambas acciones son diferentes, ya que la primera no implica repetición y la 
segunda sí.   

## CRON
En Linux como ya se ha mencionado, se pueden planificar tareas de manera periódica o recurrente, y tareas puntuales gracias 
a cron. Esta utilidad es un demonio (proceso) que permite lanzar órdenes o scripts definidos en un archivo crontab 
(cron table) cuya sintaxis interna ha de establecerse de forma estructurada y donde se especifica su patrón de repetición.   

El archivo `/etc/crontab` se define para el conjunto de acciones planificadas periódicamente sobre todo el sistema sobre 
el que el superusuario es el único capaz de editarlo y el resto de usuarios solo pueden leerlo. No obstante, 
cada usuario puede tener su propio archivo crontab.   

Para la planificación con cron debemos primero:
- Comprobar si cron está instalado mediante `dpkg –l cron`
- Verificar la actividad del demonio cron mediante: `systemctl status cron`. En caso negativo, podemos iniciarlo mediante 
`systemctl start cron`
- Reiniciar el demonio mediante `systemctl restart cron`   


Los ficheros crontab han de especificar las órdenes y su periodicidad mediante los siguientes valores separados por espacios:
Minutos [0..59] Hora [0..23] Día [1..31] Mes [1..12] Día de la se-mana [0..6] orden
<figure>
  <img src="/img/tareas/crontab.png" alt="ejecuciones cron" width="500" />
  <figcaption>Descripción de cada columna en crontab</figcaption>
</figure>

Si un campo se ignora, se especifica mediante un asterisco “*”, indicando cualquier valor válido. Se pueden especificar 
listas mediante comas y sin espacios, mediante sus valores mínimos y máximos separados por “-“, y también mediante 
un valor de inicio y un valor incremental, separados por “/”.

<figure>
  <img src="/img/tareas/cron.png" alt="ejecuciones cron" width="500" />
  <figcaption>Ejemplo ejecuciones con crontab</figcaption>
</figure>

Para editar un fichero crontab, lo más conveniente es mediante la orden `crontab –e`.   
Si nunca hemos entrado a esta configuración, es muy posible que nos salga el siguiente mensaje indicando que editor
deseamos utilizar. Nosotro usaremos la opción `1. /bin/nano`:
```bash
damx@damx:~$ crontab -e
no crontab for damx - using an empty one

Select an editor.  To change later, run 'select-editor'.
1. /bin/nano        <---- easiest
2. /usr/bin/vim.basic
3. /usr/bin/vim.tiny
4. /usr/bin/azuredatastudio
5. /bin/ed

Choose 1-5 [1]:
```

Ello abrirá nuestro editor nano, donde podremos definir las órdenes ajustándolas a la sintaxis crontab para el usuario 
en cuestión. También podemos visualizar el contenido del archivo contrab del usuario mediante `crontab –l` o eliminar la 
orden con `crontab –r`.   

No obstante, podemos crear nuestro propio archivo crontab y lanzarlo, redirigiéndolo al comando crontab. 
Una vez editado el archivo crontab, es recomendable actualizar el demonio cron para que tome los últimos 
cambios (`systemctl restart cron`).

<AsciinemaWidget
  src="https://asciinema.org/a/lEkAEyrjXsv4wga9hatoD6Amj.cast"
  rows={30}
  idleTimeLimit={3}
  preload={true}
/>


Para crear una lista de tareas que sean ejecutadas con cron, debemos crear un archivo que será el encargado de almacenar 
todas las tareas que queremos ejecutar

## Ejemplos básicos

<figure>
  <img src="/img/tareas/crontab.png" alt="ejecuciones cron" width="500" />
  <figcaption>Descripción de cada columna para la tarea</figcaption>
</figure>

### 1. Ejercicio diario:
Programa una tarea que se ejecute todos los días a las 8:00 y que escriba la fecha actual en un archivo de registro.
```bash title="Solución: "
0 8 * * * date >> /ruta/al/archivo.log
```

### 2. Ejercicio semanal:
Programa una tarea que se ejecute cada domingo a las 22:30 y que realice una copia de seguridad de un directorio específico.
```bash title="Solución: "
30 22 * * 0 tar -czf /ruta/backup.tar.gz /ruta/del/directorio
```
En este ejemplo se está utilizando el comando `tar`:   
El comando `tar -czf /ruta/backup.tar.gz /ruta/del/directorio` está utilizando la utilidad `tar` para crear un archivo 
de respaldo comprimido. Aquí está la desglose de las opciones y argumentos utilizados:

- **`tar`**: Es el comando que se utiliza para crear, descomprimir y manipular archivos y directorios.

- **`c`**: Indica que se va a crear un nuevo archivo tar.

- **`z`**: Habilita la compresión gzip. Esto significa que el archivo resultante se comprimirá usando el programa gzip, 
lo que reduce su tamaño.

- **`f`**: Indica el nombre del archivo que se va a crear o manipular. En este caso, `/ruta/backup.tar.gz` es el nombre 
del archivo resultante.

- **`/ruta/backup.tar.gz`**: Es el nombre y la ubicación del archivo que se creará. En este ejemplo, se está creando 
un archivo llamado `backup.tar.gz` en el directorio `/ruta/`.

- **`/ruta/del/directorio`**: Es la ruta del directorio que se va a incluir en el archivo tar. En este caso, 
se está creando un respaldo del contenido del directorio ubicado en `/ruta/del/directorio`.

### 3. Ejercicio mensual:
Programa una tarea que se ejecute el primer día de cada mes a las 14:15 y que imprima "Tarea mensual ejecutada" en un archivo de registro.
```bash title="Solución: "
15 14 1 * * echo "Tarea mensual ejecutada" >> /ruta/al/archivo.log
```

### 4. Ejercicio a intervalos de minutos:
Programa una tarea que se ejecute cada 15 minutos y que escriba la hora actual en un archivo de registro.
```bash title="Solución: "
*/15 * * * * date >> /ruta/al/archivo.log
```

### 5. Ejercicio en días específicos:
Programa una tarea que se ejecute los días 5 y 20 de cada mes a las 7:45 y que elimine archivos temporales de un directorio.
```bash title="Solución: "
45 7 5,20 * * rm /ruta/del/directorio/archivos_temporales/*
```

### 6. Ejercicio a intervalos de horas:
Programa una tarea que se ejecute cada 2 horas y que realice una operación específica en un directorio.
```bash title="Solución: "
0 */2 * * * comando_a_ejecutar /ruta/del/directorio
```

### 7. Ejercicio en días laborables:
Programa una tarea que se ejecute de lunes a viernes a las 18:30 y que realice una operación en un servidor remoto.
```bash title="Solución: "
30 18 * * 1-5 comando_a_ejecutar /ruta/del/servidor_remoto
```

### 8. Ejercicio en días de la semana específicos:
Programa una tarea que se ejecute los miércoles y sábados a las 3:00 y que escriba el estado del sistema en un archivo de registro.
```bash title="Solución: "
0 3 * * 3,6 echo "Estado del sistema" >> /ruta/al/archivo.log
```

### 9. Ejercicio de redirección de salida:
Programa una tarea que se ejecute cada hora y que redireccione la salida estándar de un comando específico a un archivo de registro.
```bash title="Solución: "
0 * * * * comando_especifico >> /ruta/al/archivo.log 2>&1
```

### 10. Ejercicio con ejecución en un minuto específico:
Programa una tarea que se ejecute todos los días a las 12:34 y que imprima un mensaje en la consola.
```bash title="Solución: "
34 12 * * * echo "Mensaje en la consola"
```