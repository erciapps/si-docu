---
sidebar_position: 1
---

# SSH y redirecciones SSH

## Descripción

**SSH (Secure Shell)** es un protocolo de red que permite comunicarse de forma segura con otros dispositivos mediante una conexión cifrada. Se utiliza habitualmente para la administración remota de servidores y equipos de red.

Su importancia radica en que protege la información transmitida, como credenciales, comandos o archivos, incluso cuando la comunicación viaja por redes no seguras.

<figure>
  <img src="/redes/img/ssh.jpg" alt="Esquema general de SSH" width="450" />
</figure>

## Objetivos

- Comprender el funcionamiento de SSH y su importancia en la seguridad de las comunicaciones.
- Instalar y configurar un servidor SSH.
- Permitir el acceso remoto a una máquina mediante autenticación segura.
- Establecer una conexión SSH desde otra máquina.
- Comprobar la autenticación mediante claves públicas y privadas.
- Entender el uso de redirecciones o túneles SSH.

<figure>
  <img src="/redes/img/autenticacionssh.png" alt="Esquema de autenticación SSH" width="520" />
</figure>

## Máquina servidor

La máquina identificada como **server1** será la destinada a recibir las conexiones. En ella instalaremos y configuraremos el servidor SSH.

## Máquina cliente

La máquina **server2** será el cliente desde el que nos conectaremos remotamente a **server1**.

---

# Pautas en el servidor

Realiza estas operaciones en **server1**.

## 1. Instalar OpenSSH Server

Utiliza el gestor de paquetes para instalar el servidor SSH:

```bash
sudo apt update
sudo apt install openssh-server -y
```

## 2. Comprobar el estado del servicio

```bash
sudo systemctl status ssh
```

## 3. Crear un usuario para la conexión SSH

En lugar de permitir el acceso remoto como `root`, es preferible crear un usuario específico para la conexión SSH.

```bash
sudo adduser sshuser
sudo usermod -aG sudo sshuser
```

## 4. Editar la configuración del servidor SSH

Edita el archivo de configuración:

```bash
sudo nano /etc/ssh/sshd_config
```

Revisa al menos estas directivas:

```text
Port 22
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication yes
```

### Explicación rápida

- **Port**: el puerto por defecto de SSH es el **22**.
- **PermitRootLogin no**: deshabilita el acceso remoto directo como `root`.
- **PubkeyAuthentication yes**: permite autenticarse mediante claves públicas.
- **PasswordAuthentication yes**: permite autenticación por contraseña al principio.

> Se recomienda dejar `PasswordAuthentication yes` durante la configuración inicial y cambiarlo a `no` después de comprobar que la conexión con claves funciona correctamente.

<figure>
  <img src="/redes/img/sshconfig.png" alt="sshconfig" width="320" />
</figure>

## 5. Reiniciar el servicio

```bash
sudo systemctl restart ssh
```

## 6. Configurar el cortafuegos

Si estás usando `ufw`, abre el puerto SSH:

```bash
sudo ufw allow ssh
```

## 7. Comprobar la dirección IP del servidor

```bash
ip a
```

Anota la dirección IP de **server1**, ya que la necesitarás desde el cliente.

<figure>
  <img src="/redes/img/ipa.png" alt="Dirección IP del servidor" width="320" />
</figure>
   

---
    
    

# Pautas en el cliente

Realiza estas operaciones en **server2**.

## 1. Generar el par de claves SSH

La forma correcta de trabajar con autenticación por clave es **generar las claves en el cliente**, no en el servidor.

```bash
ssh-keygen -t rsa -b 4096
```

### ¿Qué hace este comando?

- **ssh-keygen**: genera un par de claves SSH.
- **-t rsa**: indica que se utilizará el algoritmo RSA.
- **-b 4096**: indica el tamaño de la clave.

Durante el proceso, se te pedirá:

- el nombre del archivo donde guardar la clave,
- y una frase de paso opcional para aumentar la seguridad.

El resultado será la creación de dos archivos en `~/.ssh/`:

- **id_rsa** → clave privada
- **id_rsa.pub** → clave pública

> La **clave privada nunca debe compartirse**.  
> La **clave pública** es la que se copia al servidor.

<figure>
  <img src="/redes/img/sshconfig2.png" alt="Generación de claves SSH" width="450" />
</figure>

## 2. Comprobar los archivos generados

```bash
cd ~/.ssh
ls -la
```

Verás algo parecido a esto:

```text
drwx------ 2 alumno alumno 4096 Mar 20 10:44 .
drwxr-x--- 3 alumno alumno 4096 Mar 20 10:43 ..
-rw------- 1 alumno alumno 3381 Mar 20 10:44 id_rsa
-rw-r--r-- 1 alumno alumno  743 Mar 20 10:44 id_rsa.pub
```

## 3. Copiar la clave pública al servidor

Utiliza este comando para copiar la clave pública del cliente al usuario `sshuser` del servidor:

```bash
ssh-copy-id sshuser@IP_DEL_SERVIDOR
```

Ejemplo:

```bash
ssh-copy-id sshuser@192.168.1.10
```

Este comando añade automáticamente la clave pública al archivo `~/.ssh/authorized_keys` del servidor.

## 4. Conectarse al servidor

Una vez copiada la clave pública, ya puedes conectarte por SSH:

```bash
ssh sshuser@IP_DEL_SERVIDOR
```

Ejemplo:

```bash
ssh sshuser@192.168.1.10
```

La primera vez que te conectes, SSH preguntará si deseas confiar en la huella del servidor. Escribe:

```bash
yes
```

A partir de ese momento, si la autenticación por clave está bien configurada, podrás entrar sin necesidad de usar la contraseña del sistema remoto.

## 5. Finalizar la conexión

Para cerrar la sesión SSH:

```bash
exit
```

Verás algo parecido a esto:

```shell
sshuser@server1:~$ exit
logout
Connection to 192.168.1.10 closed.
```

---

# Endurecimiento opcional del servidor

Una vez comprobado que el acceso mediante claves funciona correctamente, puedes aumentar la seguridad desactivando la autenticación por contraseña.

Edita otra vez el archivo de configuración:

```bash
sudo nano /etc/ssh/sshd_config
```

Cambia esta directiva:

```text
PasswordAuthentication no
```

Reinicia el servicio:

```bash
sudo systemctl restart ssh
```

A partir de ese momento, solo podrán conectarse usuarios que dispongan de una clave SSH válida.

---

# Método manual alternativo

Si no quieres usar `ssh-copy-id`, puedes copiar manualmente la clave pública al servidor.

## En el cliente

Muestra el contenido de la clave pública:

```bash
cat ~/.ssh/id_rsa.pub
```

## En el servidor

Inicia sesión como `sshuser` y crea la estructura necesaria:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
```

Pega dentro el contenido de la clave pública y guarda el archivo.

Después, ajusta los permisos:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

---

# Redirecciones en SSH

## ¿Qué es una redirección SSH?

Una **redirección SSH** o **túnel SSH** permite enviar tráfico de red a través de una conexión segura SSH, redirigiendo puertos desde el equipo local al remoto o viceversa.

Se utiliza, por ejemplo, para:

- acceder a servicios internos de una red remota,
- cifrar conexiones,
- o alcanzar equipos que no son accesibles directamente desde el exterior.

## Ejemplo práctico

```shell
ssh -i "C:\Users\rafa\.ssh\id_rsa_damx" -p 30000 damx@mvs.sytes.net -L 4444:127.0.0.1:3389 -L 4449:192.160.51.149:5432
```

## ¿Qué hace este comando?

Se conecta a `mvs.sytes.net` por el puerto `30000` como usuario `damx`, usando la clave privada `id_rsa_damx`.

Además, crea dos redirecciones locales:

### 1. `localhost:4444 -> 127.0.0.1:3389`

Permite acceder desde tu equipo local al servicio de **Escritorio Remoto (RDP)** disponible en el propio servidor remoto.

Por ejemplo, podrías conectarte a:

```text
localhost:4444
```

### 2. `localhost:4449 -> 192.160.51.149:5432`

Permite acceder desde tu equipo local a un servidor **PostgreSQL** ubicado en una máquina interna de la red remota.

Por ejemplo, tu cliente de base de datos podría conectarse a:

```text
localhost:4449
```

---

# Conexiones SSH y NAT

## Ideas clave

- El puerto por defecto de SSH es el **22**.
- Un equipo puede conectarse por SSH a otro equipo de su misma red sin necesidad de NAT.
- Si un equipo quiere conectarse a otro situado en una red diferente a través de Internet, normalmente será necesario que exista conectividad enrutable o una redirección adecuada.
- Si hay varios servidores SSH dentro de una misma red privada y se quiere acceder a ellos desde Internet, se necesitarán **puertos externos distintos** para que el router sepa a qué equipo debe redirigir cada conexión.

---

# Ejercicios

Responde a las siguientes preguntas sobre el esquema de red facilitado.

<figure>
  <img src="/redes/img/forwarding_ejemplo1.png" alt="Forwarding ejemplo 1" width="300" />
</figure>

## Pregunta 1

**EQ3** accede por SSH a **EQ4**.  
¿Hace falta redirección NAT?

---

## Pregunta 2

**EQ3** accede por SSH a **EQ6** (en otra red).  
¿Hace falta redirección NAT?

---

## Pregunta 3

Desde fuera de la red (**Internet**) se quiere acceder por SSH a **EQ2** y **EQ4**.  
¿Hace falta redirección NAT?

---

## Pregunta 4

**EQ3** quiere conectarse por SSH a **EQ4** (`192.168.20.13`).  
¿Qué comando usaría?

A) `ssh usuario@EQ4`  
B) `ssh usuario@80.40.30.44`  
C) `ssh usuario@192.168.20.13`  
D) `ssh -p 22 usuario@172.16.0.201`

---

## Pregunta 5

Desde Internet, un usuario quiere acceder por SSH a **EQ2**.  
¿Qué configuración NAT debe aplicarse en **Router3** y **Router1**?

---

## Pregunta 6

¿Por qué se necesita cambiar el puerto externo (por ejemplo, `2223`) cuando varios equipos ofrecen SSH en redes privadas?

A) Porque no pueden tener la misma IP interna  
B) Porque solo se puede hacer una redirección por puerto  
C) Porque SSH solo funciona en redes internas  
D) Porque no se pueden usar switches con NAT
