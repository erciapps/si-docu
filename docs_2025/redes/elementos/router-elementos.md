---
sidebar_position: 3
---

# Router
Los routers con componentes esenciales en la infraestructura de Internet. Se utilizan para enrutar paquetes de datos
a través de múltiples redes y hacia su destino final.


<figure>
  <img src="/redes/img/routericon.png" alt="router icon" width="175" />
</figure>


Los routers los podemos clasificar en dos categorías: **Domésticos** y **Profesionales**

## ROUTER DOMÉSTICO (Residenciales)
Facilitados normalmente por el proveedor de servicios, estos routers están diseñados para su uso en entornos domésticos 
y pequeñas oficinas. Por lo general, tienen funcionalidades básicas y están orientados a usuarios no técnicos. 
Algunas características comunes incluyen:   
* **Conectividad inalámbrica Wi-Fi:** Proporcionan acceso inalámbrico a Internet para dispositivos dentro del hogar.
* **Interfaz de usuario simplificada:** Suelen tener interfaces de configuración fáciles de usar, a menudo a través 
de una página web o una aplicación móvil.
* **Firewall básico:** Ofrecen una protección básica contra amenazas de seguridad desde Internet.
* **Puertos Ethernet:** Permiten la conexión de dispositivos mediante cables Ethernet.
* **Funciones de enrutamiento básicas:** Permiten compartir la conexión a Internet entre múltiples dispositivos 
y realizar tareas de enrutamiento básicas.

<figure>
  <img src="/redes/img/routermovistart2.png" alt="router movistart" width="250" />
</figure>

En su parte trasera suelen disponer de 4 puertos tipo ethernet, para conectar físicamente los equipos. Estos puertos no son gestionables,
es decir, ofrecen la misma red en cada puerto. Realmente es como si fuera un switch.

## ROUTER PROFESIONAL (Empresarial)
Estos routers están diseñados para su uso en entornos comerciales, empresariales o de proveedores de servicios. 
Suelen ofrecer funcionalidades más avanzadas y están destinados a usuarios técnicos o administradores de red. 
Algunas características comunes incluyen:   

* **Alta capacidad de rendimiento:** Pueden manejar un mayor volumen de tráfico y usuarios simultáneos en comparación con los routers domésticos.
* **Funcionalidades avanzadas de seguridad:** Ofrecen funciones de seguridad más robustas, como firewall avanzado, 
VPN (Redes Privadas Virtuales), filtrado de contenido, etc.
* **Calidad de servicio (QoS):** Permiten priorizar ciertos tipos de tráfico para garantizar un rendimiento óptimo de 
las aplicaciones críticas.
* **Redundancia y alta disponibilidad:** Pueden admitir configuraciones de red redundantes para garantizar la 
disponibilidad continua de la red.
* **Gestión remota avanzada:** Permiten la gestión remota y centralizada de múltiples routers, 
a menudo a través de protocolos de gestión de red como SNMP (Simple Network Management Protocol).

Permiten generar distintas subredes debido a que son capaces de gestionar cada uno de sus puertos. Además, muchos de ellos
permiten generar varias redes Wifi (también en diferentes subredes).

## DHCP
La asignación de direcciones IP puede realizarse de forma estática o dinámica mediante un servidor DHCP
(Dynamic Host Configuration Protocol). En el caso de la asignación dinámica, el servidor DHCP asigna direcciones
IP automáticamente a los dispositivos que se conectan a la red, mientras que en la asignación estática,
las direcciones IP se configuran manualmente en cada dispositivo.

## TABLA ARP (Address Resolution Protocol)
La **tabla ARP** se encarga de asociar direcciones **IP** con direcciones **MAC** en una red local. 
Cuando un equipo se conecta a un router, su dirección MAC asociada a la tarjeta de red queda registrada en la 
tabla ARP junto con la dirección IP asignada. Esta asociación permite que el router pueda resolver direcciones IP 
para determinar las direcciones MAC correspondientes y así dirigir el tráfico de manera adecuada.   

## TABLA DE ENRUTAMIENTO
Esta tabla se utiliza para determinar hacia donde enviar los paquetes de datos que se reciben.
La tabla de enrutamiento contiene información sobre las redes disponibles y las rutas que los paquetes 
de datos deben seguir para llegar a su destino final.

## FIREWALL
Un firewall en un router es una función de seguridad esencial que controla el tráfico entrante y saliente de una red 
local (LAN) a través del router. Actúa como una barrera protectora entre la red interna y el Internet, 
filtrando los paquetes de datos según reglas predefinidas para permitir o bloquear el acceso a la red. 
Entre sus funciones destacadas se encuentran el filtrado de paquetes, el control de acceso, 
la NAT para ocultar las direcciones IP internas, capacidades de VPN para conexiones seguras, prevención de 
intrusiones y, en algunos casos, filtrado de contenido. Estas funciones contribuyen a garantizar la seguridad y 
la integridad de la red, protegiéndola contra amenazas externas y controlando el tráfico de manera efectiva.

## NAT
La traducción de direcciones de red (NAT) es un proceso en redes informáticas que permite que múltiples dispositivos 
en una red privada compartan una sola dirección IP pública asignada por el proveedor de servicios de Internet.

### TABLA NAT
La tabla NAT (Network Address Translation) es un componente clave de los routers y dispositivos de red que realizan NAT. 
Esta tabla mapea direcciones IP y puertos privados internos a direcciones IP y puertos públicos externos, 
permitiendo que múltiples dispositivos en una red privada compartan una única dirección IP pública. 
Es esencial para el funcionamiento del NAT, ya que facilita la traducción de direcciones IP y puertos entre redes 
privadas y públicas, permitiendo la comunicación efectiva de dispositivos internos con el exterior de la red.

[//]: # (## SUBNETING)

[//]: # (<div>)

[//]: # (    <iframe src="/2024/redes/pdf/SUBNETING.pdf" width="100%" height="500px" />)

[//]: # (</div>)