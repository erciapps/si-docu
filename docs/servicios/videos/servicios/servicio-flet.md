---
sidebar_position: 1
---
import ReactPlayer from 'react-player'

# SERVICIOS DE USUARIO

:::danger MUY IMPORTANTE
Para asegurarnos que un puerto está en escucha podemos usar el siguiente comando
````shell
lsof -i -P -n | grep LISTEN
````

Para dejar el puerto libre podemos matar el proceso, siempre y cuando no sea que quieras liberar
el puerto de un servicio ya en producción, en ese caso usar `systemctl --user stop nombreservicio.service`.   

El siguiente ejemplo mata al proceso con PID `32442`

````shell
kill -9 32442
````

De esta manera el puerto quedará libre. Volver a ejecutar el comando `lsof` para verificar.
:::

## Servicio de usuario con systemd. Descripción.
Este ejemplo muestra cómo crear y ejecutar un servicio de usuario con `systemd` 
en Linux. Los servicios de usuario permiten ejecutar procesos automáticamente cuando 
un usuario inicia sesión, sin necesidad de permisos de superusuario. Son ideales 
para tareas personales, como iniciar una app en segundo plano, lanzar un servidor 
local o una app Python como Flet.

---

## Antes de empezar
Es necesario disponer de un proyecto de ejemplo subido en **github**, en el siguiente vídeo se explica como crear
un proyecto de ejemplo desde 0, sincronizarlo con un repositorio de github, y clonarlo en la máquina.

<ReactPlayer playing={false} controls url='https://youtu.be/3oWS8VFwstc' />

## Pasos detallados para crear el servicio
Los pasos que se exponen están todos reflejados en los siguientes vídeos:

### Vídeo para lanzar servicio de usuario en máquina virtual
<ReactPlayer playing={false} controls url='https://youtu.be/BRQd0V-2rlg' />

### Vídeo para lanzar servicio desde máquina remota
<ReactPlayer playing={false} controls url='https://youtu.be/d0BD_4dXa5c ' />

### 1. Crear la carpeta para los servicios de usuario (si no existe)
```bash
mkdir -p ~/.config/systemd/user
```

### 2. Crear el archivo de servicio
```bash
nano ~/.config/systemd/user/ejemplovideo.service
```

### 3. Contenido del archivo `ejemplovideo.service`

:::danger
Ajusta `/home/damx/venv/ejemplovideo_env/bin/python` a tu 
ruta absoluta en tu entorno virtual, al igual que la ruta absoluta al archivo `main.py`
:::

```ini
[Unit]
Description=Servicio de ejemplo que lanza una app Flet

[Service]
WorkingDirectory=/home/damx/Escritorio/EjemploVideo
ExecStart=/home/damx/venv/ejemplovideo_env/bin/python /home/damx/Escritorio/EjemploVideo/main.py
Restart=always
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=default.target
```

**Explicación rápida**:
- `WorkingDirectory` define desde dónde se ejecuta el programa.
- `Environment=PYTHONUNBUFFERED=1` permite ver los `print()` en tiempo real en logs.

---

## ⚙️ Habilitar y ejecutar el servicio

### Recargar servicios de usuario:
```bash
systemctl --user daemon-reload
```

### Habilitar el servicio (para que arranque automáticamente al iniciar sesión):
```bash
systemctl --user enable ejemplovideo.service
```

Salida esperada:
```
Created symlink /home/damx/.config/systemd/user/default.target.wants/ejemplovideo.service → /home/damx/.config/systemd/user/ejemplovideo.service.
```

### Iniciar el servicio manualmente:
```bash
systemctl --user start ejemplovideo.service
```

### Verificar el estado del servicio:
```bash
systemctl --user status ejemplovideo.service
```

---

## Ejemplo de salida del estado

```
● ejemplovideo.service - Servicio de ejemplo que lanza una app Flet
     Loaded: loaded (/home/damx/.config/systemd/user/ejemplovideo.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2025-03-25 12:14:38 CET; 6s ago
   Main PID: 5151 (python)
      Tasks: 1 (limit: 10971)
     Memory: 22.0M
        CPU: 6.327s
     CGroup: /user.slice/user-1017.slice/user@1017.service/app.slice/ejemplovideo.service
             └─5151 /home/damx/venv/ejemplovideo_env/bin/python /home/damx/Escritorio/EjemploVideo/main.py

mar 25 12:14:38 dam-server systemd[2596]: Started Servicio de ejemplo que lanza una app Flet.
```

---

## 💡 Consejos y buenas prácticas
- Este servicio solo estará activo cuando el usuario haya iniciado sesión.
- Si quieres que se ejecute incluso si el usuario no ha iniciado sesión gráficamente:

```bash
sudo loginctl enable-linger damx
```

Esto permite que `systemd` mantenga servicios activos tras reinicios o sin sesiones gráficas.

---
