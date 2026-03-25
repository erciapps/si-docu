---
sidebar_position: 1
---

# IP

Para que dos equipos puedan comunicarse dentro de una red, ya sea un móvil, una tablet, una televisión, un ordenador, 
etc, es necesario disponer de algún mecanismo para saber dónde enviar/recibir esta información. 
Por ejemplo, cuando realizado un pedido en amazon, lo que hacemos es indicar un nombre y apellidos, dirección, 
población, ciudad, cp,... para poder realizar la entrega, por lo que estamos indicando de forma precisa dónde 
queremos recibir nuestro paquete tan deseado.   

De igual manera, cada dispositivo dispone de esa información para poder ser localizado de forma numérica.

Cuando indicamos una IP, lo que hacemos es referencia a un **NÚMERO ÚNICO** identificativo para un dispositivo dentro 
de la red de internet, por lo que si deseo comunicarme con alguien por WhatsApp, es necesario saber ambas IP’s 
(números únicos en todo internet).

Una Dirección IP es un número de 32 bits que identifica de manera única a un host en una red determinada.   

`11000000101010000001010000000000`   

Para que sea más legible y fácil de recordar para los humanos, este número de 32 bits se suele dividir en 
grupos de 8 bits llamados octetos y separados por puntos.

`11000000.10101000.00010100.00000000`

Convirtiendo a decimal cada uno de los octetos se obtiene lo que se denomina notación decimal punteada, que es la 
forma más común y simple de representar una dirección IP.

`192.168.20.0`

## IP v4

Existen dos versiones con para expresar una IP: v4 y v6, siendo la v4 (IP versión 4), la más utilizada hoy en día.   

Ya hemos dicho que la IP es una dirección única para cada dispositivo. Lo que hace nuestro proveedor de servidor 
de internet, es asignarnos una de estas IP’s. Dicha IP no es fija, y va cambiando dependiendo de las necesidades 
de la red de la operadora en ese momento.   

El formato de una IPv4 utiliza 32 bits, desglosados en 4 bloques de 8 bits separados por puntos, de tal manera que 
cada bloque representa un número comprendido entre 0 y 255, es del tipo xxx.xxx.xxx.xxx   

Por ejemplo: 192.168.1.100


## CLASIFICACIÓN IPs
Podemos clasificar las direcciones IP en dos tipos principales en función de su alcance y uso: **direcciones IP públicas y direcciones IP privadas.**   

### Direcciones IP públicas:

Las direcciones IP públicas son **direcciones únicas asignadas a dispositivos conectados a Internet.** Estas direcciones 
son accesibles desde cualquier parte de Internet y se utilizan para identificar y comunicarse con dispositivos en la red global (internet).   

Las direcciones IP públicas están registradas y administradas por organizaciones como ICANN (Internet Corporation for Assigned Names and Numbers) 
y son asignadas a ISP (proveedores de servicios de Internet), empresas y organizaciones gubernamentales.   

Estas direcciones son limitadas y finitas, por lo que se deben administrar cuidadosamente para evitar la escasez de 
direcciones IP públicas.   

Los proveedores de servicios de Internet (ISP) suelen recibir asignaciones de direcciones IP públicas de los Registros 
Regionales de Internet (RIR), como ARIN (América del Norte), RIPE (Europa), APNIC (Asia-Pacífico), 
LACNIC (Latinoamérica y el Caribe), y AFRINIC (África). Estas asignaciones se realizan de bloques de direcciones 
IP públicas que están reservadas para su distribución entre los ISP.   

Los ISP pueden usar estas direcciones IP públicas para asignarlas a sus clientes, 
ya sea de forma dinámica (mediante DHCP) o de forma estática. Las direcciones IP asignadas por 
los ISP a sus clientes generalmente provienen de los bloques de direcciones IP públicas que les han sido asignados por los RIR.   

Los bloques de direcciones IP asignados a los ISP pueden variar en tamaño dependiendo de la cantidad 
de clientes que tengan y de otros factores. Por ejemplo, un ISP pequeño puede recibir un bloque de direcciones 
IP más pequeño que un ISP grande que atiende a una región entera o a un país.   

Dado que los bloques de direcciones IP asignados a los ISP pueden ser muy diversos y pueden cambiar con el 
tiempo, no hay un rango específico de direcciones IP.   

A continuación, mostramos algunos rangos que suelen utilizar las principales operadoras:

**Movistar (Telefónica España)**
- 80.28.0.0/15
- 84.120.0.0/13
- 176.84.0.0/13
- 213.0.0.0/11

**Vodafone España**
- 37.128.0.0/10
- 62.57.0.0/17
- 62.58.0.0/16
- 95.121.0.0/16

**Orange España**
- 80.32.0.0/12
- 80.58.0.0/15
- 81.202.0.0/15
- 212.170.0.0/15

### Direcciones IP privadas:

Las direcciones IP privadas son direcciones reservadas para su uso en redes locales privadas y no están asignadas para 
su uso en Internet público. Se utilizan para identificar dispositivos dentro de una red local y no son accesibles directamente desde Internet.   

Estas direcciones IP están definidas en tres bloques específicos de direcciones reservadas para uso privado: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16.

<figure>
  <img src="/img/subredes/subredes8.png" alt="subredes 8" width="500" />
</figure>

Las direcciones IP privadas se pueden reutilizar en múltiples redes locales y no requieren registro centralizado ni 
asignación por parte de una autoridad de direcciones IP.   

Para permitir que dispositivos con direcciones IP privadas accedan a Internet, se utiliza la traducción de direcciones de red (NAT), 
donde un router o firewall traduce las direcciones IP privadas a una única dirección IP pública compartida.


### Dirección de red
Es la dirección IP que identifica la red en sí misma. No se puede asignar a ningún dispositivo individual dentro de esa red.   

La dirección de red se utiliza junto con la máscara de red para determinar qué parte de la dirección IP identifica la 
red y qué parte identifica los dispositivos individuales en esa red.

Por ejemplo, en una dirección IP como 192.168.1.0/24, la dirección de red sería 192.168.1.0. Esta dirección identifica 
toda la red y no se puede asignar a ningún dispositivo individual dentro de esa red. Es importante tener en cuenta que 
la dirección de red es siempre la primera dirección IP en el rango de direcciones asignado a la red.

### Puerta de enlace
La puerta de enlace en un router es el punto de entrada o salida desde una red local a otra red externa, como internet. 
También se conoce como la "gateway" en inglés. Esta puerta de enlace se encarga de dirigir el tráfico entre la red local 
y la red externa, permitiendo que los dispositivos dentro de la red local se comuniquen con dispositivos fuera de ella 
y viceversa. En resumen, actúa como un intermediario entre diferentes redes, facilitando la comunicación entre ellas.

### Máscara de red
La máscara de red es un valor numérico que se utiliza para dividir una dirección IP en dos partes: la parte de la red y 
la parte del host. Esencialmente, la máscara de red determina qué parte de una dirección IP se utiliza para identificar 
la red y qué parte se utiliza para identificar los dispositivos individuales en esa red.   

La máscara de red está compuesta por una serie de bits que están configurados en **1s** (representando la parte de la red) 
y **0s** (representando la parte del host). Estos bits se combinan con la dirección IP para "mascarar" o separar 
la parte de la red de la parte del host.   

Por ejemplo, en una dirección IP como 192.168.1.0 con una máscara de red /24 (también representada como 255.255.255.0 en notación decimal), 
los primeros 24 bits de la dirección IP se utilizan para identificar la red y los últimos 8 bits se utilizan para 
identificar los dispositivos individuales en esa red.   


### Dirección de ***loopback***
La dirección de loopback, comúnmente conocida como "loopback address", es una dirección especial en IPv4 y IPv6 
que está reservada para un propósito específico: permitir que un dispositivo se envíe a sí mismo mensajes de red. 
En IPv4, la dirección de loopback se representa como 127.0.0.1, mientras que en IPv6 se representa como ::1.   

La dirección de loopback se utiliza principalmente para la auto-referencia del dispositivo, lo que significa que 
cuando un dispositivo envía un paquete a la dirección de loopback, el paquete se dirige a la misma interfaz de red que 
lo envió, sin salir a través de una interfaz física o de red.   

Algunos usos comunes de la dirección de loopback incluyen:   

* Pruebas de conectividad de red en el propio dispositivo.
* Ejecución de servicios locales (como un servidor web o un servidor de base de datos) para acceder a ellos desde el mismo dispositivo.
* Verificación de la configuración del software de red.
* Pruebas de software de red en entornos de desarrollo y pruebas.


### Dirección de ***broadcast***
La dirección de broadcast es una dirección especial utilizada en redes de comunicación para enviar un mensaje a 
todos los dispositivos dentro de una red específica. Cuando un dispositivo envía un paquete a la dirección de broadcast, 
este paquete se entrega a todos los dispositivos en esa red, permitiendo la comunicación de difusión a gran escala.   

En IPv4, la dirección de broadcast se representa utilizando la dirección IP en la que todos los bits de la parte del 
host están configurados en 1. Por ejemplo, en una red con dirección IP 192.168.1.0 y máscara de red /24, la dirección 
de broadcast sería 192.168.1.255, ya que todos los bits de la parte del host están configurados en 1.   

Las direcciones de broadcast se utilizan para una variedad de propósitos, como la difusión de mensajes de red, 
la configuración automática de direcciones IP y el descubrimiento de servicios en la red.

### Dirección 0.0.0.0
La dirección IP 0.0.0.0 es una dirección IP especial que se utiliza en ciertos contextos de configuración de red 
para indicar una dirección no específica o desconocida. Tiene varios usos dependiendo del contexto en el que se utiliza:

* En el enrutamiento: La dirección IP 0.0.0.0 puede representar la "puerta de enlace predeterminada" o la "ruta predeterminada" 
en un dispositivo de red. En este contexto, indica que cualquier tráfico que no coincida con ninguna otra ruta conocida 
debe ser enviado a través de la puerta de enlace predeterminada, lo que generalmente significa enviar el tráfico a través 
del enrutador más cercano para su posterior enrutamiento hacia su destino final.

* En la configuración de red: En ciertos casos, la dirección IP 0.0.0.0 se utiliza para indicar que una interfaz 
de red está configurada para aceptar cualquier dirección IP. Por ejemplo, en un servidor web, puede 
configurarse para que escuche en la dirección IP 0.0.0.0, lo que significa que el servidor aceptará conexiones 
en cualquier dirección IP que tenga asignada.