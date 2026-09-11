---
sidebar_position: 3
---

# Ejemplo de scripts para lanzar tareas con `crontab`

##  Copias de seguridad

````shell
#!/bin/bash

# Directorio origen (todo tu home)
ORIGEN="$HOME"

# Carpeta destino (puedes cambiarla si quieres otra ubicación)
DESTINO="$HOME/backup"

# Crear la carpeta de destino si no existe
mkdir -p "$DESTINO"

# Nombre del archivo de backup con fecha
ARCHIVO="backup_home_$(date +%F_%H-%M-%S).tar.gz"

# Crear el backup
tar -czf "$DESTINO/$ARCHIVO" "$ORIGEN"

echo "Copia de seguridad completa creada en: $DESTINO/$ARCHIVO"
````

## Ejemplo para comprobar si un servicio está activo

````shell
#!/bin/bash
if systemctl is-active --quiet ssh; then
  echo "El servicio SSH está activo"
else
  echo "SSH no está activo"
fi

````

## Verificar si un programa está funcionando por nombre
````shell
pidof firefox
if [[ $? == 0 ]]; then
    echo "firefox está abierto"
else
    echo "firefox está cerrada"
fi
````

## Abrir o cerrar un programa por nombre

````shell
pidof firefox
if [[ $? == 0 ]]; then
    echo "firefox está abierto, lo cerramos"
    pkill -9 firefox
else
    echo "firefox está cerrada, lo abrimos"
    firefox marca.com
fi
````

---

## Tarea 1: Control de Usuario (firefox y calculadora)

### Objetivo
Comprobar si el navegador Firefox está abierto y actuar en consecuencia:

1. **Si Firefox está abierto**:
    - Mostrar un aviso al usuario: "No puedes estar navegando en esta franja horaria".
    - Cerrar Firefox automáticamente.
    - Abrir la **calculadora** y mostrar un **mensaje motivador** 

2. **Si Firefox está cerrado y la calculadora también**:
    - Abrir la **calculadora**.
    - Mostrar el **mensaje motivador**.

3. **Si Firefox está cerrado y la calculadora está abierta**:
    - Mostrar el mensaje: "**Ya has trabajado suficiente por hoy**".
    - Cerrar la **calculadora**.
    - Abrir **Firefox**.

---

## Tarea 2: Copia de seguridad de proyectos

###  Objetivo
1. Crear las carpetas necesarias si no existen:
   - `$HOME/proyectos`
   - `$HOME/copias`

2. Realizar una copia de seguridad de la carpeta `proyectos` hacia una ruta pasada como parámetro.

3. Mostrar una notificación al terminar la copia.

4. Abrir el explorador de archivos en la carpeta de copias.

---

##  Recomendaciones

- Asegúrate de que los scripts sean ejecutables:
```bash
chmod +x control_usuario.sh
chmod +x backup_proyectos.sh
```

- Usa rutas absolutas en los scripts y en `crontab`.
- Utiliza `crontab -e` para editar y `crontab -e` para verificar las entradas de tarea.
- Mantener el archivo del `crontrab` lo más limpio posible.

---
