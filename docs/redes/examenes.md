---
sidebar_position: 12
---
import ReactPlayer from 'react-player'

# EXAMENES

## SOLUCIÓN EXAMEN 1ª ORDINARIA REDES UT5 2026
<figure>
  <img src="/redes/img/red_1_2026.png" alt="redes2026_1" width="400" />
</figure>

<figure>
  <img src="/redes/img/red_2_2026.png" alt="redes2026_2" width="400" />
</figure>


<ReactPlayer playing={false} controls url='https://youtu.be/MLVTYtsvy7M' />
<ReactPlayer playing={false} controls url='https://youtu.be/pQgI5FCW4uc' />


## SOLUCIÓN EXAMEN PARCIAL REDES UT5 2026
<figure>
  <img src="/redes/img/red1ordi1.png" alt="red1ordi1" width="400" />
</figure>

<figure>
  <img src="/redes/img/red1ordi2.png" alt="red1ordi1" width="400" />
</figure>


### APARTADO 2
```text


A partir de las imágenes facilitadas, escribe el HOST y PUERTO necesarios para establecer una conexión correcta, si se desea acceder a los diferentes servidores POSTGRES desde los PGADMIN indicados.
NOTA: EQ2 TIENE LOS SERVICIOS DE LA IMAGEN, LAS REDIRECCIONES NECESARIAS ESTÁN REALIZADAS. NO HAY REGLAS DE BLOQUEO DE FIREWALL

PGADMIN: EQ1
POSTGRES: EQ1
HOST:localhost / IP1 / EQ1
PUERTO: 5432

PGADMIN: EQ1
POSTGRES: EQ4
HOST: IP11
PUERTO: 5432

PGADMIN: EQ1
POSTGRES: EQ7
HOST:92.36.40.55
PUERTO: 5432

PGADMIN: EQ1
POSTGRES: postgres3-eq2
HOST: - 
PUERTO: - 

PGADMIN: EQ2
POSTGRES: postgres2-eq2
HOST: localhost
PUERTO: 5798

PGADMIN: EQ2-docker
POSTGRES: postgres1-eq2
HOST: IP2
PUERTO: 5432

PGADMIN: EQ2-docker
POSTGRES: postgres3-eq2
HOST:auth-app-db-users-1
PUERTO:5432

PGADMIN: EQ1
POSTGRES: EQ2
HOST:IP2
PUERTO:5432

PGADMIN: EQ1
POSTGRES: postgres1-eq2
HOST: IP2
PUERTO: 5432

PGADMIN: EQ1
POSTGRES: postgres2-eq2
HOST: IP2
PUERTO: 5798

PGADMIN: EQ2
POSTGRES: postgres1-eq2
HOST:localhost
PUERTO:5432

PGADMIN: EQ2
POSTGRES: postgres3-eq2
HOST:-
PUERTO:-

PGADMIN: EQ2-docker
POSTGRES: postgres2-eq2
HOST:damapp-db-1
PUERTO:5432

```
<ReactPlayer playing={false} controls url='https://youtu.be/sG5Wdr21a_8' />

### APARTADO 3
```text
Acceder a servicio EQ1:5000 desde INTERNET
RUTA:80.40.30.44:5000

PUERTO ENTRADA:5000
IP DESTINO:IP9
PUERTO DESTINO:5000
Nº ROUTER:ROUTER 1

PUERTO ENTRADA:5000
IP DESTINO:IP1
PUERTO DESTINO:5000
Nº ROUTER:ROUTER 2


Acceder a servicio EQ4:5000 desde INTERNET
RUTA:80.40.30.44:5001

PUERTO ENTRADA:5001
IP DESTINO:IP11
PUERTO DESTINO:5001
Nº ROUTER:ROUTER1

PUERTO ENTRADA:5001
IP DESTINO:IP4
PUERTO DESTINO:5000
Nº ROUTER: ROUTER3



EN MÁQUINA EQ2: Acceder a servicio postgres2-eq2 desde flask2-eq2
RUTA:IP2:5798

PUERTO ENTRADA:-
IP DESTINO:-
PUERTO DESTINO:-
Nº ROUTER:-

PUERTO ENTRADA:
IP DESTINO:
PUERTO DESTINO:
Nº ROUTER:

Acceder a servicio EQ7:22 desde INTERNET
RUTA:92.36.40.55:2222

PUERTO ENTRADA:2222
IP DESTINO:IP7
PUERTO DESTINO:22
Nº ROUTER:ROUTER0



Acceder a servicio EQ1:22 desde EQ2
RUTA:IP1:22

PUERTO ENTRADA:-
IP DESTINO:-
PUERTO DESTINO:-
Nº ROUTER:-



Acceder a servicio EQ1:5000 desde EQ8
RUTA:80.40.30.44:5000

PUERTO ENTRADA:-
IP DESTINO:-
PUERTO DESTINO:-
Nº ROUTER:-



Acceder a servicio SSH (puerto por defecto) de EQ1 desde INTERNET
RUTA:80.40.30.44:22

PUERTO ENTRADA:22
IP DESTINO:IP9
PUERTO DESTINO:22
Nº ROUTER:ROUTER1

PUERTO ENTRADA:22
IP DESTINO:IP1
PUERTO DESTINO:22
Nº ROUTER:ROUTER2

```
<ReactPlayer playing={false} controls url='https://youtu.be/tMTGH9jIuns' />

### APARTADO 4
```text
Asumiendo el puerto por defecto 22, y que ROUTER1 y ROUTER2 tienen las redirecciones adecuadas para efectuar una conexión por ssh desde internet hasta EQ2, si nos conectamos por ssh desde EQ7 a EQ2: completa la siguiente expresión si queremos usar los siguientes servicios en nuestro equipo local EQ7 (usa los puertos que creas convenientes):
php1-eq2
flask1-eq2
postgres3-eq2
tomcat2-eq2
eq1:5000
eq6:7900

ssh -i __(1)__ dam@__(2)__ -L __(3)__ -L __(4)__ -L __(5)__ -L __(6)__

(1):ruta al id_rsa
(2):80.40.30.44
(3):8000:127.0.0.1:8000
(4):8800:127.0.0.1:8888
(5):-
(6):8808:127.0.0.1:5791
(7):9988:IP1:5000
(8):9898:IP13:7900
```
<ReactPlayer playing={false} controls url='https://youtu.be/S8QjZw86zPU' />



## SOLUCIÓN EXAMEN PARCIAL REDES UT5 2025

<figure>
  <img src="/redes/img/red.png" alt="redes" width="400" />
</figure>


````shell
1. Redirección de Puertos
Situaciones:
1.1 El equipo linuxMint1 desea acceder a un servicio alojado en server3.
o	Indica las redirecciones de puertos necesarias en formato:
PUERTO_ENTRADA : IP_DESTINO : PUERTO_DESTINO (Ejemplo: 80 : IP2 : 80)
o	Indica qué IP y puerto debe utilizar linuxMint1 para acceder al servicio (Ejemplo: IP7:5000).

IP5:20002


1.2 El equipo server3 necesita acceder a un servicio en server5.
o	Mismos apartados que en 1.1.

REDIRECCIÓN  EN ROUTER 3:
20004:IP8:20004

IP2:20004

1.3 El equipo linuxMint2 desea acceder a un servicio en server9.
o	Mismos apartados que en 1.1.

REDIRECCIÓN EN ROUTER 4
80:IP13:5000
REDIRECCIÓN EN ROUTER 6
5000:IP15:20001

IP16:80


1.4 El equipo server6 desea acceder a un servicio en server1.
o	Mismos apartados que en 1.1.

NO HAY REDIRECCIÓN
IP11:20005


1.5 El equipo server9 quiere acceder a un servicio en server3.
o	Mismos apartados que en 1.1.

REDIRECCIÓN ROUTER1
8080:IP1:8888

REDIRECCIÓN ROUTER 2
8888:IP5:20002

IP0:8080

1.6. Además, responde:
•	¿Qué configuraciones de red serían necesarias para permitir que server8 acceda al servicio de server5 a través del puerto 80? Nota: No se permite cambiar las reglas de ROUTER1

REDIRECCIÓN EN ROUTER 3
80:IP8:20004






2. Conexiones SSH y Redirección de Puertos

2.1 Si nos conectamos mediante SSH a linuxMint1, responde:
•	¿Qué redirección de puertos debes realizar para acceder al escritorio remoto (puerto 3389) de linuxMint2?
o	Indica una redirección válida usando la opción -L: PUERTO_LOCAL : IP_DESTINO : PUERTO_REMOTO.

-L 4444:IP2:3389 (ASUMIENDO QUE ROUTER3 TIENE LA REDIRECCIÓN ESTABLECIDA)

3389:IP7:3389

•	¿Cómo accederías al escritorio remoto desde tu propio equipo?
o	Indica IP:PUERTO y la herramienta que utilizarías.
localhost:4444



2.2 Si nos conectamos mediante SSH a linuxMint1, responde:
•	¿Qué redirección de puertos debes realizar para conectarte al servicio de base de datos PostgreSQL (puerto 5432)?
o	Indica una redirección válida usando la opción -L: PUERTO_LOCAL : IP_DESTINO : PUERTO_REMOTO.

-L 4445:IP2:5432 
REDIRECCIÓN 5432:IP10:5432

•	¿Cómo accederías a la base de datos desde tu propio equipo?
o	Indica IP:PUERTO y la herramienta que utilizarías.
localhost:4445

________________________________________


3. Asignación de IPs
Indica una IP válida:
IP 11: 192.168.98.20
IP 0: 80.200.145.14
IP 12: 192.168.90.1
IP 4: 192.168.3.70
IP 14: 192.168.1.10
IP 15: 192.168.2.10


Utiliza la red base 192.168.10.0/24 para realizar los cálculos.

Se necesita diseñar dos redes que permitan conectar al menos 255 equipos en cada una.
Para cada red, debes indicar:
•	La IP de red.
•	La máscara de red.
•	La puerta de enlace propuesta.
•	La dirección de broadcast.
•	El rango de IPs disponible para los equipos.



Red 1: 192.168.10.0/23
IP de red: 192.168.10.0

Máscara: 255.255.254.0 (equivale a /23)

Gateway: 192.168.10.1 (propuesta)

Broadcast: 192.168.11.255

Rango para equipos: 192.168.10.1 – 192.168.11.254

IPs útiles: 510


Red 2: 192.168.12.0/23
IP de red: 192.168.12.0

Máscara: 255.255.254.0 (/23)

Gateway: 192.168.12.1 (propuesta)

Broadcast: 192.168.13.255

Rango para equipos: 192.168.12.1 – 192.168.13.254

IPs útiles: 510

````
### APARTADO 1
<ReactPlayer playing={false} controls url='https://youtu.be/kPwa_095-GI' />

### APARTADO 2
<ReactPlayer playing={false} controls url='https://youtu.be/fKndc743kkY' />

### APARTADO 3
<ReactPlayer playing={false} controls url='https://youtu.be/-rJY4bGa3co' />

### APARTADO 4
<ReactPlayer playing={false} controls url='https://youtu.be/SUhdNB97OvM' />

