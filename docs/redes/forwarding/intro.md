---
sidebar_position: 1
---


# REDIRECCIONES

## NAT
NAT (Network Address Translation, o Traducción de Direcciones de Red) es una técnica que permite que varios dispositivos de una red privada puedan acceder a Internet usando una sola dirección IP pública.

Esto es muy común en casas, oficinas y escuelas, donde todos los dispositivos (ordenadores, móviles, tablets...) comparten la conexión a Internet a través del router.

### TABLA NAT
La tabla NAT es una especie de "lista de traducción" que mantiene el router o el dispositivo que realiza NAT. Esta tabla guarda qué dispositivo privado usó qué puerto para conectarse a una dirección externa.

Así, cuando vuelve la respuesta de Internet, el router sabe exactamente a qué dispositivo interno debe reenviarla.

Imagina que tienes tres ordenadores en casa (con IP privadas) y todos abren una página web al mismo tiempo. El router usa la tabla NAT para recordar:

````
192.168.1.10:12345 → IP pública:80
192.168.1.11:12346 → IP pública:80
192.168.1.12:12347 → IP pública:80
````

Cuando las respuestas llegan del servidor web, el router consulta esta tabla para enviarlas al equipo correcto.

### Port Forwarding

Port Forwarding (redirección de puertos) es una técnica específica dentro de NAT. Se usa cuando quieres que un dispositivo de fuera (por ejemplo, desde Internet) pueda acceder a un servicio en tu red privada.


<figure>
  <img src="/redes/img/forwarding1.png" alt="Forwarding1" width="300" />
</figure>

<figure>
  <img src="/redes/img/forwarding2.png" alt="Forwarding2" width="300" />
</figure>

<figure>
  <img src="/redes/img/forwarding3.png" alt="Forwarding3" width="300" />
</figure>



## EJERCICIOS
Responde a las siguientes preguntas sobre el esquema de red facilitado.

<figure>
  <img src="/redes/img/forwarding_ejemplo1.png" alt="Forwarding ejemplo 1" width="300" />
</figure>

***Nota: Al menos que se indique de manera explícita, no existen restricciones de red***

### Pregunta 1. 
**EQ5 (192.168.30.12) quiere acceder al servidor web en EQ2 (192.168.10.13), que está escuchando en el puerto 80.
¿Qué redirecciones de puertos se deben configurar y en qué routers?**

<details>

<summary>Haz clic para ver la solución</summary>

- **Topología implicada:** EQ5 → Switch 0 → Router0 → Internet   
- **Para llegar a EQ2:** EQ5 sale por Router0 → hacia IP pública 80.40.30.44 (Router3) → llega a Router1 que gestiona 192.168.10.0/24
________________________________________
🔄 Redirecciones necesarias

| Router  | ¿Redirección necesaria? | Detalles                                                                                                         |
|---------|-------------------------|------------------------------------------------------------------------------------------------------------------|
| Router0 | No                      | Solo es el punto de salida de EQ5 hacia Internet                                                                 |
| Router3 | Sí                      | Tiene la IP pública 80.40.30.44, necesita redirigir puerto 80 a 172.16.0.200<br/> Finalmente: 80:172.16.0.200:80 |
| Router1 | Sí                      | Recibe en 172.16.0.200, debe redirigir puerto 80 a 192.168.10.13<br/> Finalmente: 80:192.168.10.13:80            |
| Router2 | No                      | No participa en esta ruta (es otra rama de RED 1)                                                                |


</details>

____

### Pregunta 2.
Partiendo del mismo escenario de la Pregunta 1, ahora supón que EQ3 aloja otro servidor web en el puerto 80.
Una vez realizada la redirección de puertos hacia EQ2, ¿qué reglas adicionales deberían configurarse para que EQ5 pueda acceder también al recurso web de EQ3? Propón una
solución para que el equipo pueda acceder.
____

### Pregunta 3.

**EQ2 quiere acceder a una API que se encuentra en EQ4 (192.168.20.13:20021).
¿Se necesita redirección de puertos? Justifica tu respuesta.**

____

### Pregunta 4.

EQ3 (192.168.20.12) quiere acceder a la base de datos PostgreSQL que se encuentra en EQ6 (192.168.31.13:27017).
¿Se requiere redirección? ¿En qué router?

____


### **CONEXIONES SSH**
* El puerto por defecto de SSH es el 22
* Algunos equipos necesitan conectarse a otros por SSH desde otra red
* Si hay más de un servidor SSH en la misma red, se necesitarán puertos externos diferentes (port translation) para que el router sepa a quién redirigir


### Pregunta 5.
**EQ3** accede por SSH a **EQ4**, ¿Hace falta redirección NAT?

____

### Pregunta 6.
**EQ3** accede por SSH a **EQ6** (en otra red), ¿Hace falta redirección NAT?

____

### Pregunta 7.
Desde fuera (Internet) se quiere acceder por SSH a **EQ2** y **EQ4** , ¿Hace falta redirección NAT?

____

### Pregunta 8.

EQ5 (192.168.30.12) quiere acceder a la API de EQ4 (192.168.20.13:20021).
¿Cuál sería la redirección necesaria?
A. Router2 redirige 172.16.0.201:20021 → 192.168.20.13:20021
B. Router3 redirige 80.40.30.44:20021 → 172.16.0.201:20021
C. Router0 redirige 92.36.40.55:20021 → 172.16.0.201:20021
D. Se requieren redirecciones en Router2 y Router3

________________________________________

### Pregunta 9.
¿En cuál de los siguientes casos no es necesario establecer una redirección de puertos?
A. Cliente externo quiere acceder a un servidor web en EQ2
B. EQ1 quiere acceder a un recurso ofrecido por EQ4
C. EQ3 quiere acceder a PostgreSQL en EQ6 desde otra red
D. EQ5 quiere acceder a EQ2 por el puerto 80

________________________________________

### Pregunta 10.
¿Cuál es el propósito de usar redirección de puertos (port forwarding) en este escenario?
A. Permitir que un cliente con IP privada acceda a un servidor en su misma red
B. Enviar tráfico saliente desde un router hacia múltiples servidores internos
C. Hacer accesible desde fuera un servicio que está en una IP privada
D. Conectar dos redes locales sin necesidad de un router

________________________________________

### Pregunta 11.

Si EQ5 se conecta a http://80.40.30.44, ¿a quién llegará su tráfico finalmente?
A. EQ4
B. Router3
C. EQ2
D. EQ5

