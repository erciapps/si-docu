---
sidebar_position: 2
---

# Crontab en Python

## Introducción
`crontab` es una herramienta en sistemas Unix/Linux que permite programar tareas automáticas en intervalos de tiempo definidos. Con la librería `python-crontab`, podemos gestionar tareas programadas directamente desde un script en Python.

Esta guía explica **desde cero** cómo utilizar `python-crontab`, desde la instalación hasta la creación y gestión de tareas en `crontab`.

---


## Instalación de `python-crontab`

:::warning
Ejecutar la instalación en el entorno virtual
:::

Para instalar la librería, ejecuta el siguiente comando:

```bash
pip install python-crontab
```

Verifica que `cron` esté instalado en tu sistema:
```bash
crontab -l
```
Si no está instalado, en Ubuntu puedes hacerlo con:
```bash
sudo apt install cron -y
```
---

## Comandos Básicos de `crontab`
Antes de ver Python, es importante conocer los comandos básicos de `crontab`:

| Comando | Descripción |
|---------|-------------|
| `crontab -l` | Lista las tareas programadas del usuario actual. |
| `crontab -e` | Abre el editor para agregar o modificar tareas. |
| `crontab -r` | Elimina todas las tareas del usuario. |
| `crontab -u usuario -l` | Lista las tareas de otro usuario (requiere `sudo`). |

---

## Primer Script con `python-crontab`

### Crear una tarea en `crontab`
El siguiente script añade una tarea que ejecuta un script de Python cada minuto:

```python
from crontab import CronTab

# Crear objeto crontab para el usuario actual
cron = CronTab(user=True)

# Crear nueva tarea
job = cron.new(command='python3 /home/user/miscript.py')

# Configurar para que se ejecute cada minuto
job.minute.every(1)

# Guardar cambios
cron.write()

print("Tarea programada con éxito.")
```

**Explicación:**
- Crea una nueva tarea (`job`) que ejecuta `miscript.py`.
- Se configura para ejecutarse **cada minuto**.
- Se guarda la configuración con `cron.write()`.

---

### Programar una tarea diaria a las 3:30 AM
```python
job.setall('30 3 * * *')
cron.write()
```
**Explicación:**
- `30 3 * * *` → Ejecuta la tarea **todos los días a las 03:30 AM**.

---

### Ejecutar un script solo los lunes y miércoles a las 14:00
```python
job.setall('0 14 * * 1,3')
cron.write()
```
**Explicación:**
- `0 14 * * 1,3` → Lunes (`1`) y miércoles (`3`) a las **14:00**.

---

### Listar todas las tareas de `crontab`
```python
for job in cron:
    print(job)
```
🔹 **Muestra todas las tareas programadas en el `crontab` del usuario**.

---

### Modificar una tarea existente
Si quieres cambiar una tarea que ejecuta `miscript.py` y hacer que se ejecute cada 5 minutos:
```python
for job in cron:
    if 'miscript.py' in job.command:
        job.minute.every(5)

cron.write()
print("Tarea actualizada.")
```
**Busca una tarea con `miscript.py` y cambia su frecuencia a cada 5 minutos.**

---

### Eliminar una tarea específica
```python
for job in cron:
    if 'miscript.py' in job.command:
        cron.remove(job)

cron.write()
print("Tarea eliminada.")
```
**Elimina la tarea que ejecuta `miscript.py`.**

---

### Ejecutar una tarea cada 10 segundos (Solo en `cron` del sistema, no en `crontab`)
El `crontab` **no permite periodos menores a 1 minuto**, pero puedes usar `watch` o `while` en un script de bash:
```bash
while true; do python3 /home/user/miscript.py; sleep 10; done
```
Luego, puedes programarlo con `python-crontab`:
```python
job = cron.new(command='bash -c "while true; do python3 /home/user/miscript.py; sleep 10; done"')
cron.write()
```
**Esto ejecuta el script cada 10 segundos dentro de un bucle infinito.**

---

### Redirigir salida de un script a un archivo de log
```python
job = cron.new(command='python3 /home/user/miscript.py >> /home/user/log.txt 2>&1')
job.setall('*/10 * * * *')  # Ejecutar cada 10 minutos
cron.write()
```
**Guarda la salida del script en `log.txt` para depuración.**

---

### Programar mostrar recordatorio en escritorio Ubuntu
Configuraremos un recordatorio automático en Ubuntu utilizando `cron` y `dunstify` para mostrar notificaciones en el escritorio.

Si no tienes `dunst` y `zenity / yad` instalado, puedes hacerlo con:
````shell
sudo apt install dunst
sudo apt install zenity
sudo apt install yad
````

#### Paso 1: Crear el Script de Notificación   
Crea un archivo llamado recordatorio.sh con el siguiente contenido:

````shell title='recordatorio.sh'
#!/bin/bash
export DISPLAY=:0
export XDG_RUNTIME_DIR=/run/user/$(id -u)
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus
dunstify -u critical --icon="info" --appname="Nombre del proceso" "Título" "$1"

zenity --info --title="Mensaje informativo" --text="$1"

````

Explicación:

- `export DISPLAY=:0` → Permite que la notificación se muestre en el escritorio.
- `export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus` → Necesario para interactuar con la sesión gráfica.
- `dunstify -u critical --icon="info" --appname="Recordatorio" "Recordatorio" "$1"` → Muestra el mensaje emergente.

:::tip

Para añadir permisos de ejecución al script manteniendo el resto de permisos, utiliza la expresión:   
**`chmod +x` recordatorio.sh**

:::

---

#### Paso 2: Programar el Recordatorio con Python y Cron
Podemos automatizar la ejecución de este script usando Python y cron.

```python
# Obtiene la ruta absoluta del script
script_path = os.path.join(os.getcwd(), "recordatorio.sh")

# Crea una nueva tarea en cron
job = cron.new(command=f'{script_path} "{evento}"', comment=f'Recordatorio: {evento}')
cron.write()
```

---


## Conclusión
- `python-crontab` permite **gestionar tareas programadas en cron** de forma sencilla.
- Puedes **crear, modificar, listar y eliminar tareas** con Python.
- **Si usas tiempos menores a 1 minuto**, debes hacer un bucle en un script bash.
