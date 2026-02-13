---
sidebar_position: 1
---
import AsciinemaWidget from '/src/components/AsciinemaWidget';


# Procesos
## Introducción
Los sistemas operativos más utilizados, como Microsoft Windows, macOS y GNU/Linux, son multitarea y multiusuario. 
Por tanto, el sistema operativo trabaja de forma concurrente con todas las tareas y usuarios al mismo tiempo. 
En realidad, el sistema operativo asigna pequeños espacios de tiempo a cada tarea y usuario, para así atenderlos 
y crear la sensación de trabajo con todos ellos a la vez.   

Las instancias de los programas en ejecución, también llamados tareas o procesos, son administrados por el sistema 
operativo como un recurso más. Dependiendo de los privilegios de los usuarios sobre el sistema, estos podrán modificar 
la planificación de procesos gracias a comandos específicos.

## Procesos
El sistema operativo gestiona todos los procesos mediante operaciones de creación, comunicación, compartición y 
finalización de procesos. El módulo del sistema operativo encargado de realizar estas tareas es el planificador de procesos.   

Los procesos pueden pasar por distintos estados. El planificador de procesos se encarga de establecer 
el estado de cada proceso y de modificarlo, atendiendo a un algoritmo de planificación. 
La mayoría de los algoritmos de planificación asignan un tiempo de ejecución o cuantum a aquellos procesos
que están ocupando la CPU (se están ejecutando). Pasado el cuantum, se genera una interrupción de reloj, 
haciendo que el sistema operativo recupere el control. A continuación, el planificador toma el siguiente 
proceso de la cola de listos, según su algoritmo de planificación. 
Con esto se consigue favorecer la multitarea y evitar que se apoderen de la CPU aquellos procesos 
que necesitan ocupar mucho tiempo de CPU.

## Identificación y administración.
Los procesos disponen de un identificador único llamado **PID** (**ID**entificador de *P*roceso). 
El PCB de cada proceso almacena información esencial, como:   
- Identificación del proceso (PID).
- Identificación del proceso padre (PPID), es decir, el PID del proceso que lo creó.
- Usuario propietario.
- Valores del estado del procesador en el momento de producirse el cambio de contexto.
- Estado.Valores de referencia de memoria RAM.
- Ficheros abiertos.
- Buffers de memoria utilizados.

:::info
El superusuario o aquellos usuarios con potestad para administrar el sistema son los únicos que disponen de privilegios 
para administrar los procesos del sistema operativo y, por tanto, son los responsables de mantener un control 
del conjunto de procesos. No obstante, cada usuario puede gestionar sus propios procesos.
:::

## Comandos para visualizar procesos 
### Comando `ps`
#### Síntaxis
```bash
ps [modificadores]
```
#### Descripción
**`ps`** (Process status, estado de procesos en inglés) es un comando asociado al sistema operativo linux, 
que permite visualizar el estado de un proceso.   
Ejecutar el comando `ps` sin opciones, sólo nos muestra los procesos del usuario y terminal en ese momento.
#### Opciones
* **`-e`**: Vista simplificada de todos los procesos (columnas básicas)
* **`-u`**: Muestra los procesos de un usuario en concreto
* **`-aux`**: Vista ampliada de todos los procesos del sistema
* **`-F`**: Vista ampliada de los procesos activos en la actual sessión de terminal
* **`-p PID l`**: Muestra la información de un proceso PID en concreto.
* **`ps aux | grep comando/programa`**: Realiza una búsqueda filtrando por el comando/programa indicado

<figure>
  <img src="/img/procesos/ps.png" alt="ps" width="300" />
    <figcaption>Descripción de la cabecera comando `ps`</figcaption>
</figure>

### Comando `pstree`
#### Síntaxis
```bash
pstree [modificadores]
```
#### Descripción
**`pstree`** (Process status tree, arbol de estado de procesos) permite visualizar de forma de arbol, 
todos los procesos en ejecución, es decir, muestra los procesos en una relación padre-hijo. 
El proceso padre es el proceso generador, que crea todos los procesos hijos por debajo de él.
#### Opciones
* **`-p`**: Vista en arbol de todos los procesos, incluyendo su PID.
* **`usuario`**: Muestra los procesos de un usuario concreto. Ej.: `pstree damx`, muestra los procesos del usuario damx.

### Comando `top/htop`
* **`top`**: Es una herramienta de línea de comandos que muestra una lista dinámica de los procesos en 
ejecución en el sistema, junto con información sobre el uso de recursos como CPU, memoria y tiempo de 
ejecución.

* **`htop`**: Es una alternativa avanzada a top, que también muestra una lista de procesos y su uso 
de recursos. Sin embargo, ofrece una interfaz más fácil de usar y más funcionalidades, 
como la capacidad de desplazarse y ordenar los procesos de manera interactiva, así como 
representaciones visuales más detalladas del uso de CPU y memoria.

<figure>
  <img src="/img/procesos/ps.png" alt="htop" width="300" />
</figure>

## Finalizar procesos (matar procesos).
Matar procesos es un aspecto importante en la gestión del sistema operativo, especialmente en entornos Unix y Linux.   
A veces es necesario detener un proceso que se está ejecutando, ya sea porque está consumiendo demasiados recursos,
no responde o por otras razones.

### Como matar un proceso.
#### 1. **Identificar el PID del proceso**
Si tenemos localizado el PID de nuestro proceso a finalizar, podemos hacer uso del comando `kill`.
Por ejemplo, si nuestro proceso tiene el PID 12345:
```bash
kill 12345
```
Este comando por defecto envía una señal de tipo 15 (SIGTERM) que intenta finalizar de forma ordenada el proceso en cuestión.   
En caso de que el proceso no finalice podemos enviar la señal 9 (SIGKILL), que finalizaría el proceso de forma inmediata.
```bash
kill -9 12345
```

#### 2. **A partir del nombre del programa**
Una solución rápida para finalizar un proceso si conocemos el nombre del programa (binario), es utilizar el comando `pkill`.
Si por ejemplo queremos finalizar Visual Studio, sabiendo que su nombre ejecutable es `code`, podemos finalizar el programa con:
```bash
pkill code
```
De igual forma que con el comando `kill`, en caso de no finalizar el proceso podemos utilizar la señal -9:
```bash
pkill -9 code
```
:::note NOTA
En caso de que el proceso no finalice, es posible que pertenezca al usuario **`root`** por lo que deberemos ejecutar
el comando **`sudo`** previo a los comandos **`kill/pkill`**
:::

## Primer y segundo plano
Cuando un usuario ejecuta un comando desde la shell, este crea una subshell que ejecuta dicho comando. 
El usuario ha de esperar para recuperar el control del intérprete de comandos durante el tiempo que pasa desde 
que el programa es lanzado hasta que termina, volviendo a mostrar la terminal. Los comandos que se ejecutan de 
esta forma, se dice que lo hacen en ***primer plano o en foreground***.   

Existe una alternativa para evitar que el propio usuario tenga que esperar a la terminación de una tarea para poder 
continuar con la ejecución de otras nuevas, denominada ***ejecución en segundo plano o background***. Consiste en añadir 
al final de la línea de comandos, el símbolo **“&”**. De esta manera, la terminal se devolverá inmediatamente, 
sin esperar la terminación de la tarea recién lanzada.

### Ejemplo segundo plano.
Si queremos abrir desde terminal nuestro **Visual Studio Code**, podemos ejecutar el comando:
```bash
code &
```
De esta forma podremos seguir utilizando nuestra terminal. Al ejecutar el comando veremos algo de este estilo:   
`[1] 24744` que corresponde al identificador de trabajo. El identificador de trabajo es un número que la shell asigna a cada
tarea en segundo plano. **NO CONFUNDIR CON PID**.   
Para matar el proceso (cerrar Visual Studio) podriamos utilizar el comando `pkill`:
```bash
pkill code
```

### Ejemplo primer plano.
Si queremos abrir desde terminal nuestra **calculadora**, podemos ejecutar el comando:
```bash
kcalk
```
Si no tienes `kcalc` puedes instalarla usando: 
```bash
sudo apt install kcalc
```
- Pero también puedes usar otro programa de tu sistema.   
- Como puedes ver no se puede introducir nada a la línea de comandos, ya que la terminal la ocupa en primer plano el programa `kcalc`.
- Para finalizar el proceso pulsaremos las teclas `Control+C`
- Si pulsamos `Control+Z` no finalizamos el proceso.
:::info EJERCICIO PROPUESTO UT4_1

Programa un script con **YAD / ZENITY** dónde el usuario debe adivinar el identificador
de proceso PID del script lanzado en cuestión.
Cada vez que el usuario falle, se debe ir sumando a un contador de
Fallos (y mostrarlo), y se tiene que indicar si el PID introducido es más alto o más bajo que el PID del proceso del script.
Si el PID es adivinado, avisar de ello al usuario.
- Nota: la variable PID del proceso es $$
- Para usar YAD añade al inicio de tu script:

````shell
#!/bin/bash

export GDK_BACKEND=x11
````

- YAD inicia su propio proceso, por lo que si lo quieres controlar puedes asignarle un nombre de la siguiente manera:
````shell
exec -a nombreProceso yad --title="MENU" \ ... resto del yad MIRA EL EJERCICIO 4_2
````

<details>
  <summary>Haz clic para mostrar ver la solución en script **SIN YAD/ZENITY**</summary>

```bash
#!/bin/bash

# -lt / Menor que
# -eq / Igual que
# -gt / Mayor que
# Por ejemplo:
# if [[ $numero_a -lt $numero_b ]]; then
#   Si el numero_a es menor que el b
#   entrará aquí
# fi

contador_fallos=0
pid_script=$$

while [[ $contador_fallos -lt 10 ]]; do
    clear
    echo "#####################"
    echo " ADIVINA EL PID ❓ 😱"
    echo "#####################"
    echo ""
    read -p "Indica un número: PISTA: $pid_script: " numero
    if [[ $pid_script -eq $numero ]]; then
        clear
        echo "🎉🎉 ENHORABUENA 🎉🎉"
        echo "HAS ADIVINADO EL NÚMERO"
        read -p "Sólo has tenido $contador_fallos fallos"
        break
    elif [[ $pid_script -lt $numero ]]; then
        clear
        echo "UPS! HAS FALLADO!"
        read -p "EL NÚMERO QUE BUSCAS ES MENOR 👇"       
    elif [[ $pid_script -gt $numero ]]; then
        clear
        echo "UPS! HAS FALLADO!"
        read -p "EL NÚMERO QUE BUSCAS ES MAYOR 👆"
    fi
    contador_fallos=$(( contador_fallos+1 ))
    echo "Llevas $contador_fallos fallos de 10"
done
clear
echo "Gracias por usar nuestras APPS 😜"
```
</details>
:::


:::info EJERCICIO PROPUESTO UT4_2
A partir del siguiente diagrama de flujo, diseña un script que permita iniciar / finalizar 2 procesos definidos.   
Aquí te dejo un ejemplo del menú:
<figure>
  <img src="/img/procesos/menuyad.png" alt="ps" width="300" />
</figure>

````shell
#!/bin/bash

export GDK_BACKEND=x11
clear
exec -a menuPIDS yad --title="MENU" \
	--form \
	--no-buttons \
	--columns="1" \
	--text="Elige una opción: " \
    --field="ABRIR/CERRAR CALCULADORA 🔢":fbtn "llamar a script1" \
    --field="ABRIR/CERRAR EDITOR ✏️":fbtn 'echo "llamar a script2"' \
    --field="SALIR":fbtn "ejecutar matar proceso" \
    --heigth=200 --width=400 \
````

## **PASO 1: VISUALIZAR PROCESOS ACTIVOS**

### Concepto:
Un proceso activo es cualquier programa o tarea que se está ejecutando en el sistema.

### Prueba en la terminal:
```bash
ps aux
```
**Observa**: Se listan todos los procesos en ejecución.

**Ver procesos en tiempo real:**
```bash
top
```
**Observa**: Se muestran los procesos con su consumo de CPU y memoria en tiempo real.

📌 **Alternativa más avanzada:**
```bash
htop
```
(Si no tienes `htop`, instálalo con `sudo apt install htop`)

Para salir, presiona `q`.

---

## PASO 2: PROCESOS EN SEGUNDO PLANO

### Prueba en la terminal:
```bash
sleep 30 &
```
**Observa**: El proceso sigue ejecutándose, pero la terminal queda libre.

**Ver procesos en segundo plano:**
```bash
jobs
```
**Traerlo al primer plano:**
```bash
fg %1
```

 **Otra forma de enviar un proceso al fondo:**
```bash
Ctrl + Z  # Pausa el proceso
bg %1  # Lo reanuda en segundo plano
```

---

## PASO 3: DETENER Y MATAR PROCESOS

### Prueba en la terminal:
Ejecuta:
```bash
sleep 100 &
```
Verifica su PID:
```bash
ps aux | grep sleep
```
Mata el proceso:
```bash
kill PID
```
Si no muere, usa:
```bash
kill -9 PID
```
**Observa**: El proceso desaparece de la lista de procesos activos.

**¿Cómo suspender un proceso sin matarlo?**
```bash
kill -STOP PID
```
**¿Cómo reanudarlo?**
```bash
kill -CONT PID
```

---

##  PASO 4: PROCESOS ZOMBIES Y HUÉRFANOS

### Prueba en la terminal:
Ejecuta:
```bash
bash -c 'sleep 30 & exit'
```
Verifica:
```bash
ps aux | grep defunct
```
**Observa**: Aparece como `defunct`, lo que significa que es un **proceso zombie**.

**¿Qué es un proceso huérfano?**
```bash
bash -c 'sleep 100 & disown'
```
**Observa**: El proceso sigue ejecutándose aunque el padre haya terminado.

🔒 **Conclusión:**
- **Zombie**: Un proceso que ha terminado, pero cuyo padre no ha recogido su estado.
- **Huérfano**: Un proceso cuyo padre ha terminado antes que él.

---

## PASO 5: CREAR PROCESOS HIJOS

### Prueba en la terminal:
```bash
bash -c "sleep 10 & sleep 20 & sleep 30 &"
```
Verifica:
```bash
ps aux | grep sleep
```

**Ver la jerarquía de procesos:**
```bash
pstree -p
```
**Observa**: Los procesos hijos aparecen debajo del proceso padre.

---

## PASO 6: PRIORIZACIÓN DE PROCESOS (NICE & RENICE)

**Ver prioridad de un proceso:**
```bash
ps -eo pid,ni,comm | grep nano
```

**Cambiar la prioridad de un proceso:**
```bash
renice -n 10 -p PID
```
**Ejecutar un proceso con menor prioridad:**
```bash
nice -n 10 nano
```

**Observa**: `nice` asigna una prioridad inicial a un proceso, mientras que `renice` la cambia en tiempo real.

---

## PASO 7: MONITOREO DE PROCESOS AVANZADO

### Monitoreo con `watch`
```bash
watch -n 1 ps aux | grep firefox
```
**Observa**: Se actualiza cada segundo mostrando solo procesos de Firefox.

### Ver estadísticas detalladas de un proceso
```bash
pidstat -p PID
```
(Si no tienes `pidstat`, instálalo con `sudo apt install sysstat`)

---

## **🔹 PASO 8: AUTOMATIZACIÓN DE PROCESOS**

**Ejecutar un proceso programado con `cron`**
```bash
crontab -e
```
Añadir esta línea para ejecutar un script cada 5 minutos:
```bash
*/5 * * * * /home/usuario/miscript.sh
```

**Observa**: `cron` ejecutará `miscript.sh` cada 5 minutos.

**Ver trabajos programados:**
```bash
crontab -l
```

**Ejecutar una tarea única con `at`**
```bash
echo 'echo Hola' | at now + 1 minute
```
**Observa**: El mensaje se mostrará en 1 minuto.

---

## **🔹 CONCLUSIÓN**

| Tema | Comando | Explicación |
|------|---------|-------------|
| **Ver procesos** | `ps aux` | Lista todos los procesos |
| **Ver en tiempo real** | `top` / `htop` | Muestra los procesos activos |
| **Ejecutar en segundo plano** | `sleep 30 &` | No bloquea la terminal |
| **Ver trabajos en segundo plano** | `jobs` | Lista procesos en background |
| **Traer un proceso de vuelta** | `fg %1` | Recupera un proceso en background |
| **Matar un proceso** | `kill PID` | Finaliza un proceso manualmente |
| **Suspender y reanudar procesos** | `kill -STOP PID` / `kill -CONT PID` | Pausar y continuar procesos |
| **Ver procesos en árbol** | `pstree -p` | Muestra la jerarquía de procesos |
| **Cambiar prioridad** | `nice` / `renice` | Modifica el uso de CPU |
| **Automatizar tareas** | `cron` / `at` | Ejecuta tareas programadas |


