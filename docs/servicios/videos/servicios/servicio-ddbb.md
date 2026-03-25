---
sidebar_position: 2
---
import ReactPlayer from 'react-player'

# SERVICIOS DE USUARIO CON BASE DE DATOS

## Modos de desarrollo
### Todo el local
Lo habitual si solo desarrollamos en un mismo equipo, es disponer de la base de datos, servidor web, etc, funcionando
en tu máquina de forma local. De esta manera puedes realizar todo tipo de pruebas sin tener que conectarte a un servidor
externo.
<figure>
  <img src="/2025/si/img/local.png" alt="local" width="300" />
</figure>

### Servidor web en local, base de datos en remoto
Otra circunstancia que es muy común, es desarrollar una parte en local y otra en remota. Lo habitual es que dispongamos
de una base de datos en remoto, a la cual podemos acceder desde cualquier equipo. Para ofrecer un punto de seguridad, esta base
de datos únicamente es accesible desde una conexión por tunel SSH, pero tambien es muy común utilizar VPN.

<figure>
  <img src="/2025/si/img/local-remoto.png" alt="local-remoto" width="300" />
</figure>


### Todo en remoto (producción)
Una vez finalizado el código, y realizadas las pruebas, lo normal es que si estás desarrollando una aplicación web sea accesible
desde internet para que así todo el mundo la pueda usar.
<figure>
  <img src="/2025/si/img/remoto.png" alt="remoto" width="300" />
</figure>

### Video de los modos de desarrollo

<ReactPlayer playing={false} controls url='https://youtu.be/HNr9X1dvSzA' />

## Conectar con base de datos remota (con tunel ssh)

<ReactPlayer playing={false} controls url='https://youtu.be/oY-dgNO0tA4' />

## Prueba de servidor antes de crear servicio

<ReactPlayer playing={false} controls url='https://youtu.be/1l8chMrMx-k' />

## Lanzar servicio

<ReactPlayer playing={false} controls url='https://youtu.be/rYdI2vr6u4A' />
