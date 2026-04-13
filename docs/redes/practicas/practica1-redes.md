---
sidebar_position: 1
title: Práctica 1. SSH
---

# SSH

## Descripción

**SSH (Secure Shell)** es un protocolo de red que permite comunicarse de forma segura con otros dispositivos a través de una conexión cifrada. Se utiliza habitualmente para la administración remota de servidores y equipos de red.

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