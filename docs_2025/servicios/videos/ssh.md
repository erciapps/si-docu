---
sidebar_position: 2
---
import ReactPlayer from 'react-player'

# SSH
En esta sección se explica como crear un túnel ssh entre un cliente y un servidor. Para ayudaros durante el proceso,
he grabado un vídeo, mostrando los pasos realizados para conseguirlo.

<ReactPlayer playing={false} controls url='https://youtu.be/kYj_jBAIpfU' />

## DESCRIPCIÓN
**SSH (Secure Shell)** es un protocolo de red que permite a los usuarios comunicarse de forma segura con otros dispositivos
a través de una conexión cifrada. Es ampliamente utilizado en entornos de administración de sistemas para acceder de
manera remota a servidores y dispositivos de red. Su importancia radica en la capacidad de proporcionar un canal
seguro para la transferencia de datos sensibles, como contraseñas, comandos y archivos,
a través de una red no segura, como Internet.
<figure>
  <img src="/2024/redes/img/ssh.jpg" alt="yad" width="450" />
</figure>

## Claves
- El cliente tiene la clave privada (`id_rsa`)
- El servidor tiene la clave pública del cliente (`id_rsa.pub`) en el archivo `~/.ssh/authorized_keys`

- Para generar estas claves debes ejecutar el siguiente comando desde la terminal del cliente, es decir, 
desde tu equipo (indistintamente del sistema operativo que dispongas). Si estás en Windows puedes usar `cmd` o `PowerShell`:

- Para mayor comodidad desplázate hasta el directorio `.ssh` escribiendo `cd .ssh`, de esta manera el conjunto
de claves se creará en ese directorio.
- Ejecuta el siguiente comando para generar la clave pública y la clave privada.
````shell
ssh-keygen -t rsa -b 4096 -m PEM
````

* **`ssh-keygen`**:	Comando para generar claves SSH
* **`-t rsa`**:	Tipo de clave: en este caso, RSA (algoritmo de clave asimétrica)
* **`-b 4096`**:	Número de bits de la clave: se está generando una clave de 4096 bits (más segura que la típica de 2048)
* **`-m PEM`**:	Formato de salida: PEM (Privacy Enhanced Mail) — formato estándar con codificación Base64 que es compatible con muchos sistemas y herramientas

Al ejecutar el comando indicar lo siguiente:

1. Nombre de las claves:
:::warning IMPORTANTE
Indicar el nombre como `id_rsa_damx` (sustituye x por tu id)
:::

````shell
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\rafa/.ssh/id_rsa): id_rsa_damx
````

2. Frase/Palabra de seguridad

:::warning IMPORTANTE
Indicar una clave que puedas recordar facilmente ya que la tendrás que escribir cada vez que se
conecte al tunel.
:::
````shell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in id_rsa_damx
Your public key has been saved in id_rsa_damx.pub
The key fingerprint is:
SHA256:52vEQu3uTLykEUqjbSkBkvJJ0G1u9O77tjuF/UBxlFg rafa@DESKTOP-BP6GVLB
The key's randomart image is:
+---[RSA 4096]----+
|.. .       +E.   |
| o. +     o o    |
|+ o+ .   . o     |
|.+ oo . . o      |
|  o...o.S*.      |
|     =.+o=B      |
|    o.= .==o     |
|     o. o*oo.    |
|      .+=*=      |
+----[SHA256]-----+

````

:::danger MUY IMPORTANTE
- Debes facilitar la clave pública (`.pub`) para que sea añadida al servidor.
- Guarda la **clave privada** en un lugar seguro, y nunca la compartas con nadie.   
- Esta clave únicamente puede ser utilizada desde **TU EQUIPO**.
- En caso de necesitar acceso desde otros equipos, crea un par de claves con el nombre `id_rsa_damx_2` (sustituye x por tu identificador).
:::



## Etapa de conexión

Ejecutar el siguiente comando desde la terminal:
````shell
ssh -i "ruta absoluta a tu id_rsa (clave privada)" -p 30000 tuusuariodam@mvs.sytes.net -L 4444:localhost:3389
````
No te olvides de indicar:
1. Ruta absoluta a la clave privada
2. Tu usuario dam

`4444:localhost:3389` es una redirección de puertos segura que quiere decir:
- En mi equipo local, abriré el puerto **4444**. Todo lo que se envíe a ese puerto desde mi equipo, se reenviará por
  el túnel **SSH** al servidor remoto en su puerto **3389**.
- El puerto **3389** es el puerto de escritorio remoto (RDP). Esto nos permite iniciar una sesión gráfica de escritorio.

`-p 30000 tuusuariodam@mvs.sytes.net` significa: conéctate al servidor `mvs.sytes.net` por el puerto 30000. El servidor
`mvs.sytes.net` realiza una redirección de puertos del 30000 al 22 (que es el puerto por defecto ssh).

## Funcionamiento de las claves en la conexión
Este comando establece una comunicación con el servidor de la siguiente manera:

- El servidor genera un reto (una cadena aleatoria)
- El servidor lo cifra con la clave pública del cliente (que tiene guardada en authorized_keys)
- Solo el cliente, que tiene la clave privada correspondiente, puede descifrarlo
- El cliente responde demostrando que lo ha leído correctamente (firma o eco cifrado)
- El servidor así verifica que el cliente es legítimo

