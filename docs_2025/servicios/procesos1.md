---
sidebar_position: 1
---
import AsciinemaWidget from '/src/components/AsciinemaWidget';

# Procesos

## Introducción
Los sistemas operativos más utilizados, como Microsoft Windows, macOS y GNU/Linux, son multitarea y multiusuario.
Esto significa que pueden gestionar múltiples tareas y usuarios de forma concurrente. En sistemas de un solo núcleo,
la sensación de simultaneidad se consigue asignando pequeños intervalos de tiempo de CPU a cada proceso (planificación por cuantum).
En sistemas multinúcleo, además, puede existir ejecución realmente paralela.

Las instancias de los programas en ejecución, también llamadas tareas o procesos, son administradas por el sistema operativo como un recurso más.
Dependiendo de los privilegios del usuario, se podrá consultar, modificar la prioridad o finalizar procesos mediante comandos específicos.

## Procesos
El sistema operativo gestiona los procesos mediante operaciones como creación, planificación, sincronización/comunicación y finalización.
El **planificador de procesos** es el componente encargado de decidir qué proceso utiliza la CPU en cada momento y durante cuánto tiempo.

Los procesos pueden pasar por distintos estados. El planificador se encarga de seleccionar procesos de la cola de listos,
atendiendo a un algoritmo de planificación. Muchos algoritmos asignan un tiempo de ejecución o **cuántum** al proceso que ocupa la CPU.
Cuando este tiempo termina, una interrupción de reloj devuelve el control al sistema operativo, que decide qué proceso se ejecutará a continuación.
Con ello se favorece la multitarea y se evita que un único proceso monopolice la CPU.

## Estados de un proceso
De forma simplificada, un proceso puede encontrarse en alguno de los siguientes estados:

- **Nuevo**: el proceso está siendo creado.
- **Listo**: el proceso está preparado para ejecutarse y espera turno de CPU.
- **En ejecución**: el proceso está usando la CPU.
- **Bloqueado / en espera**: el proceso espera un evento (por ejemplo, una operación de entrada/salida).
- **Terminado**: el proceso ha finalizado.

En Linux, algunos estados pueden observarse con `ps` en la columna `STAT`:

- **R**: running (en ejecución)
- **S**: sleeping (reposo/interrumpible)
- **D**: espera no interrumpible (normalmente E/S)
- **T**: detenido (stopped)
- **Z**: zombie

## Identificación y administración
Los procesos disponen de un identificador único llamado **PID** (*Process ID*).
Cada proceso tiene asociado un **PCB** (*Process Control Block* o bloque de control de proceso), que almacena información esencial, como:

- Identificación del proceso (PID).
- Identificación del proceso padre (PPID), es decir, el PID del proceso que lo creó.
- Usuario propietario.
- Estado del proceso.
- Valores del estado del procesador en el momento del cambio de contexto.
- Información de memoria (regiones, referencias, etc.).
- Ficheros abiertos.
- Buffers de memoria utilizados.

:::info
El superusuario, o aquellos usuarios con privilegios de administración, son quienes pueden gestionar procesos de otros usuarios y del sistema.
No obstante, cada usuario puede administrar sus propios procesos.
:::

## Comando `ps`

### Sintaxis
```bash
ps [opciones]
```

---

### Descripción
**`ps`** (*process status*) es un comando de GNU/Linux que permite visualizar información sobre procesos.
Si se ejecuta sin opciones, normalmente muestra los procesos asociados al usuario y terminal actual.

---

### Opciones frecuentes
- **`ps`**: muestra procesos de la sesión/terminal actual.
- **`ps aux`**: vista ampliada de procesos del sistema (formato BSD).
- **`ps -ef`**: vista ampliada de procesos del sistema (formato POSIX/System V).
- **`ps -u usuario`**: muestra procesos de un usuario concreto.
- **`ps -p PID`**: muestra un proceso concreto por PID.
- **`ps -fp PID`**: muestra información detallada de un PID concreto.
- **`ps -o pid,ppid,cmd,%mem,%cpu -p PID`**: salida personalizada con columnas específicas.

### Ejemplos prácticos
```bash
ps
ps aux
ps -ef
ps -u root
ps -p 1234
ps -fp 1234
ps -o pid,ppid,cmd,%mem,%cpu -p 1234
```

### Búsqueda de procesos
```bash
ps aux | grep code
pgrep code
pgrep -a code
```

<figure>
  <img src="/img/procesos/ps.png" alt="ps" width="300" />
  <figcaption>Descripción de la cabecera del comando <code>ps</code></figcaption>
</figure>

## Comando `pstree`

### Instalación (Debian)
```bash
sudo apt update
sudo apt install psmisc
```

---

### Sintaxis
```bash
pstree [opciones] [usuario|PID]
```

---

### Descripción
**`pstree`** permite visualizar los procesos en forma de **árbol**, mostrando la relación padre-hijo entre ellos.
Resulta muy útil para entender qué procesos han sido lanzados por otros.

---

### Opciones frecuentes
- **`-p`**: muestra los PIDs junto al nombre de cada proceso.
- **`-a`**: muestra argumentos de línea de comandos.
- **`-u`**: muestra cambios de usuario asociados a procesos.
- **`usuario`**: muestra los procesos de un usuario concreto. Ejemplo: `pstree damx`.
- **`PID`**: muestra el árbol a partir de un proceso concreto. Ejemplo: `pstree -p 1`.

### Ejemplos prácticos
```bash
pstree
pstree -p
pstree -a
pstree -p 1
pstree tu_usuario
```

## Comando `top` / `htop`

### Descripción
- **`top`**: herramienta de línea de comandos que muestra una lista dinámica de procesos en ejecución y su consumo de recursos (CPU, memoria, tiempo, etc.).
- **`htop`**: alternativa más visual e interactiva a `top`, con opciones de búsqueda, ordenación y acciones sobre procesos de forma más cómoda.

### Instalación de `htop` (Debian)
```bash
sudo apt update
sudo apt install htop
```

### Acciones útiles en `top`
- **`q`**: salir.
- **`k`**: finalizar un proceso (solicita PID).
- **`M`**: ordenar por uso de memoria.
- **`P`**: ordenar por uso de CPU.

### Acciones útiles en `htop`
- **`F3`**: buscar.
- **`F6`**: ordenar por una columna.
- **`F9`**: finalizar proceso.
- **`F10`**: salir.

<figure>
  <img src="/img/procesos/htop.png" alt="htop" width="300" />
  <figcaption>Vista general de <code>htop</code></figcaption>
</figure>

## Señales y finalización de procesos
El comando `kill` no siempre "mata" directamente un proceso, sino que **envía señales**.
Algunas señales importantes son:

- **SIGTERM (15)**: petición de finalización ordenada (señal por defecto de `kill`).
- **SIGKILL (9)**: finalización forzosa inmediata (no se puede capturar ni ignorar).
- **SIGINT (2)**: interrupción (habitualmente `Ctrl+C`).
- **SIGSTOP**: detiene (pausa) un proceso.
- **SIGCONT**: reanuda un proceso detenido.

Para ver la lista de señales:

```bash
kill -l
```

## Finalizar procesos
Finalizar procesos es un aspecto importante en la gestión del sistema operativo, especialmente en entornos Unix y Linux.
A veces es necesario detener un proceso porque consume demasiados recursos, no responde o se ha ejecutado por error.

### Cómo matar un proceso

#### 1. Identificar el PID del proceso
Si conocemos el PID del proceso, podemos usar el comando `kill`.
Por ejemplo, si el proceso tiene el PID `12345`:

```bash
kill 12345
```

Este comando envía por defecto la señal **15 (SIGTERM)**, que intenta cerrar el proceso de forma ordenada.
Si el proceso no finaliza, se puede enviar la señal **9 (SIGKILL)** para forzar su cierre:

```bash
kill -9 12345
```

También se puede usar la forma con nombre de señal (más legible):

```bash
kill -TERM 12345
kill -KILL 12345
```

#### 2. A partir del nombre del programa
Una forma rápida de finalizar procesos si conocemos el nombre del ejecutable es usar `pkill`.
Por ejemplo, para finalizar Visual Studio Code (ejecutable `code`):

```bash
pkill code
```

Si no finaliza, se puede forzar con señal 9:

```bash
pkill -9 code
```

También es posible usar `killall` (con cuidado, ya que puede afectar a varios procesos con el mismo nombre):

```bash
killall code
```

:::note NOTA
Si el proceso pertenece a `root` u otro usuario, puede ser necesario ejecutar `sudo` antes de `kill`, `pkill` o `killall`.
:::

## Primer y segundo plano
Cuando un usuario ejecuta un comando desde la shell, normalmente se crea un nuevo proceso para ejecutar dicho comando.
Si el comando se ejecuta en **primer plano** (*foreground*), la shell espera a que termine para devolver el control (prompt) al usuario.

Existe una alternativa para no esperar a que finalice una tarea: la **ejecución en segundo plano** (*background*).
Consiste en añadir el símbolo **`&`** al final del comando. De este modo, la terminal devuelve el prompt inmediatamente,
aunque el proceso siga ejecutándose.

### Ejemplo de segundo plano
Si queremos abrir desde terminal Visual Studio Code, podemos ejecutar:

```bash
code &
```

De esta forma podremos seguir utilizando la terminal. Al ejecutar el comando, veremos algo similar a:

```bash
[1] 24744
```

- **`[1]`**: identificador de trabajo (*job*) asignado por la shell.
- **`24744`**: PID del proceso.

El identificador de trabajo es un número interno de la shell para gestionar tareas en segundo plano.
No debe confundirse con el PID.

Para cerrar Visual Studio Code, podríamos usar:

```bash
pkill code
```

### Ejemplo de primer plano
Si queremos abrir desde terminal la calculadora `kcalc`, podemos ejecutar:

```bash
kcalc
```

Si no tienes `kcalc`, puedes instalarla con:

```bash
sudo apt update
sudo apt install kcalc
```

También puedes usar otro programa gráfico disponible en tu sistema.
Mientras el programa se ejecuta en primer plano, la terminal queda ocupada y no podremos introducir nuevos comandos en esa misma shell.

- Para interrumpir el proceso, pulsaremos **`Ctrl+C`**.
- Si pulsamos **`Ctrl+Z`**, no finalizamos el proceso: lo **suspendemos**.

## Control de trabajos (`jobs`, `fg`, `bg`)
Cuando trabajamos con procesos en primer y segundo plano, la shell ofrece comandos para gestionar los **trabajos** (*jobs*).

### Comandos principales
- **`jobs`**: muestra los trabajos de la shell actual.
- **`fg %n`**: pasa el trabajo `n` al primer plano.
- **`bg %n`**: reanuda el trabajo `n` en segundo plano.

### Ejemplo práctico
1. Lanzamos un proceso en primer plano:

```bash
sleep 100
```

2. Lo suspendemos con **`Ctrl+Z`**.

3. Consultamos trabajos:

```bash
jobs
```

Salida típica:

```bash
[1]+  Detenido                sleep 100
```

4. Lo reanudamos en segundo plano:

```bash
bg %1
```

5. Lo traemos de nuevo al primer plano:

```bash
fg %1
```

### Ejecutar procesos que continúen tras cerrar la sesión (opcional)
Si queremos que un proceso continúe aunque se cierre la terminal, puede usarse `nohup`:

```bash
nohup comando > salida.log 2>&1 &
```

## Prioridad de procesos (introducción)
En Linux, los procesos pueden tener distinta prioridad de planificación.
De forma básica:

- **`nice`**: lanza un proceso con una prioridad determinada.
- **`renice`**: cambia la prioridad de un proceso ya en ejecución.

### Ejemplos
```bash
nice -n 10 comando
sudo renice -n -5 -p 1234
```

Valores de `nice` más altos suelen indicar menor prioridad de CPU (más "amable" con el sistema).

## Resumen
En la gestión de procesos en GNU/Linux es fundamental saber:

- Identificar procesos (`ps`, `pgrep`, `pstree`).
- Monitorizar consumo (`top`, `htop`).
- Finalizar procesos (`kill`, `pkill`, `killall`).
- Trabajar con primer/segundo plano (`&`, `jobs`, `fg`, `bg`, `Ctrl+Z`, `Ctrl+C`).
- Conocer, al menos de forma básica, las señales y prioridades.

Estos conceptos son la base para la administración del sistema y para entender cómo se ejecutan las aplicaciones en un entorno multitarea.
