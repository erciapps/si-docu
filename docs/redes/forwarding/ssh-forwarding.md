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

## 3. Iniciar y habilitar el servicio

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

## 4. Comprobar la dirección IP del servidor

```bash
ip a
```

Anota la dirección IP de **server1**, ya que la necesitarás desde el cliente.

---

# Conexión SSH desde el cliente

Realiza estas operaciones desde **server2**.

## 1. Conectarse al servidor

```bash
ssh usuario@IP_DEL_SERVIDOR
```

Ejemplo:

```bash
ssh alumno@192.168.1.10
```

## 2. Aceptar la huella del servidor

La primera vez que te conectes, SSH preguntará si deseas confiar en la clave del servidor. Escribe:

```bash
yes
```

## 3. Introducir la contraseña

Después, introduce la contraseña del usuario remoto.

---

# Autenticación mediante claves

SSH también permite autenticarse mediante un par de claves: una **clave privada** y una **clave pública**.

## 1. Generar claves en el cliente

```bash
ssh-keygen
```

## 2. Copiar la clave pública al servidor

```bash
ssh-copy-id usuario@IP_DEL_SERVIDOR
```

## 3. Conectarse sin contraseña

```bash
ssh usuario@IP_DEL_SERVIDOR
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
