---
sidebar_position: 4
---

# Switch

<figure>
  <img src="/redes/img/switchicon.png" alt="switch icon" width="175" />
</figure>


## Descripción
Un switch es un dispositivo de red que se utiliza para conectar múltiples dispositivos en una red local (LAN) y dirigir 
el tráfico de datos entre ellos. Funciona en la capa 2 (capa de enlace de datos) del modelo OSI y toma decisiones basadas 
en direcciones MAC.

Cuando un dispositivo, como una computadora o un servidor, envía datos a través de la red, el switch examina la dirección 
MAC de destino en el paquete de datos y decide hacia qué puerto enviar el paquete para llegar a su destino. Esto permite 
una comunicación eficiente entre dispositivos en la misma red.

Los switches pueden variar en tamaño y funcionalidad. Los más simples se utilizan en redes domésticas o pequeñas empresas, 
mientras que los más complejos y potentes se utilizan en redes empresariales o en centros de datos. Además, los switches 
pueden tener capacidades adicionales, como la gestión remota, la segmentación de red, la priorización de tráfico y la 
seguridad.

## Tabla de direcciones (Tabla MAC).
La tabla que un switch utiliza para almacenar las direcciones MAC de los dispositivos conectados en la red se llama 
"tabla de direcciones MAC" o "tabla de direcciones MAC aprendidas". Esta tabla contiene las direcciones MAC de los 
dispositivos que han enviado datos a través del switch, junto con la información sobre a qué puerto del switch están 
conectados.

Cuando un switch recibe un paquete de datos, examina la dirección MAC de origen del paquete y la registra en su tabla 
de direcciones MAC, asociándola con el puerto por el cual llegó el paquete. Si el switch ya tiene una entrada para esa 
dirección MAC, actualiza la información del puerto. Si el switch no tiene una entrada para esa dirección MAC, 
la agrega a la tabla.
<figure>
  <img src="/redes/img/tablamac.png" alt="tabla mac" width="500" />
<figcaption>Ejemplo tabla MAC</figcaption>
</figure>

## Switches L3 (capa 3) 
Existen switches de capa 3, también conocidos como "switches de capa de enlace y capa de red" o "switches multilayer". 
Estos switches tienen capacidades adicionales que les permiten trabajar en la capa 3 del modelo OSI, es decir, en la 
capa de red.

A diferencia de los switches de capa 2, que funcionan principalmente con direcciones MAC, los switches de capa 3 pueden 
tomar decisiones de enrutamiento basadas en direcciones IP. Esto significa que pueden procesar paquetes de datos utilizando 
información de capa 3, como direcciones IP, y tomar decisiones de reenvío en función de esta información.

Los switches de capa 3 son especialmente útiles en redes más grandes donde se requiere un enrutamiento interno eficiente. 
Algunos de los beneficios de los switches de capa 3 incluyen:

1. Enrutamiento interno: Pueden enrutar el tráfico entre diferentes subredes dentro de la misma red local.
2. Segmentación de red: Pueden dividir la red en VLANs (Virtual LANs) y enrutar el tráfico entre ellas.
3. Optimización del tráfico: Pueden priorizar y dirigir el tráfico de manera más eficiente en función de las direcciones IP.
4. Reducción del tráfico broadcast: Al igual que los switches de capa 2, pueden reducir la cantidad de tráfico broadcast 
en la red.

Los switches de capa 3 son una opción común en redes empresariales y en entornos donde se requiere un mayor control y 
optimización del tráfico de red.

## Imágenes

<figure>
  <img src="/redes/img/switch1.png" alt="switch1" width="500" />
<figcaption>Switch 24 puertos</figcaption>
</figure>

<figure>
  <img src="/redes/img/switch2.png" alt="switch2" width="500" />
<figcaption>Switch 4 puertos POE</figcaption>
</figure>