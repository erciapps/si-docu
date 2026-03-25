---
sidebar_position: 4
---

# Práctica 4 . Port Forwarding - Microservicios en Docker

## ANTES DE EMPEZAR
* Entender bien las redirecciones de puertos.
* Comprender el siguiente esquema de red de forma individual.

<figure>
  <img src="/redes/img/esquemageneral.png" alt="firewall" width="450" />
</figure>

### PASO 1 Acceso al router

<!-- | Nombre         | Usuario | IP ACCESO ROUTER | Pruebas | Login/Registro | Tareas | Pruebas 2       | Docker        |
|----------------|---------|------------------|---------|----------------|--------|------------------|---------------|
| Manuel         | dam50   | 192.160.51.150   | 30002   | 30003          | 30004  | 30055 - 30059    | 30201 - 30210 |
| Martín         | dam51   | 192.160.51.151   | 30005   | 30006          | 30007  | 30060 - 30064    | 30211 - 30220 |
| Izaro          | dam52   | 192.160.51.152   | 30008   | 30009          | 30010  | 30065 - 30069    | 30221 - 30230 |
| Francisco      | dam54   | 192.160.51.154   | 30011   | 30012          | 30013  | 30070 - 30074    | 30231 - 30240 |
| Adrián         | dam55   | 192.160.51.155   | 30014   | 30015          | 30016  | 30075 - 30079    | 30241 - 30250 |
| Carlos         | dam56   | 192.160.51.156   | 30017   | 30018          | 30019  | 30080 - 30084    | 30251 - 30260 |
| Juan David     | dam57   | 192.160.51.157   | 30020   | 30021          | 30022  | 30085 - 30089    | 30261 - 30270 |
| Salma          | dam58   | 192.160.51.158   | 30023   | 30024          | 30025  | 30090 - 30094    | 30271 - 30280 |
| Pedro          | dam59   | 192.160.51.59    | 30026   | 30027          | 30028  | 30095 - 30099    | 30281 - 30290 |
| Josué Mirko    | dam61   | 192.160.51.161   | 30029   | 30030          | 30031  | 30100 - 30104    | 30291 - 30300 |
| Vicente        | dam62   | 192.160.51.162   | 30032   | 30033          | 30034  | 30105 - 30109    | 30301 - 30310 |
| Álvaro         | dam63   | 192.160.51.163   | 30035   | 30036          | 30037  | 30110 - 30114    | 30311 - 30320 |
| Daniel         | dam64   | 192.160.51.164   | 30038   | 30039          | 30040  | 30115 - 30119    | 30321 - 30330 |
| Hugo           | dam65   | 192.160.51.165   | 30041   | 30042          | 30043  | 30120 - 30124    | 30331 - 30340 |
| Alicia         | dam66   | 192.160.51.166   | 30044   | 30045          | 30046  | 30125 - 30129    | 30341 - 30350 |
| Gabriel        | dam67   | 192.160.51.167   | 30047   | 30048          | 30049  | 30130 - 30134    | 30351 - 30360 | -->

1. Modifica el script de conexión ssh para acceder a la interfaz gráfica de configuración del router. La interfaz gráfica
se encuentra en el puerto 80, es decir, que es un servicio web. Puedes elegir por ejemplo el 4446 para el acceso 
(pero podrías usar incluso el 80 si no dispones de ese puerto ocupado en tu equipo)

````shell
ssh -i "C:\Users\rafa\.ssh\id_rsa_damx" -p 30000 damx@mvs.sytes.net -L 4444:127.0.0.1:3389 - L 4445:192.160.51.XXX:5432 -L 4446:192.168.51.XXX:80 
````

**El usuario es root, y la contraseña tu DNI con letras mayúsculas y todo junto**

### PASO 2 Redirección de puertos a Portainer (Docker)
* Desplázate al apartado de firewall en **Network>Firewall**
<figure>
  <img src="/redes/img/firewall.png" alt="firewall" width="450" />
</figure>

* Ves a la pestaña de **Port Forwards**. Verás que ya existe una redirección (tu base de datos):

<figure>
  <img src="/redes/img/forwarding.png" alt="Forwarding" width="450" />
</figure>

* Crea la regla de redirección de puertos:

<figure>
  <img src="/redes/img/reglaNat.png" alt="Redireccion de puertos" width="450" />
</figure>

* Guarada y aplica cambios para que la nueva regle funcione:

<figure>
  <img src="/redes/img/forwarding_portainer.png" alt="Redireccion de puertos portainer" width="450" />
</figure>

### PASO 3 Acceso a Portainer

* Para poder acceder a la interfaz gráfica de Portainer (Docker), necesitamos indicar en nuestra conexión ssh que queremos
acceder a esa interfaz mediante el puerto indicado.

* Añadir a la conexión ssh la redirección. En este caso usaremos el 4447:
````shell
-L 4447:192.160.51.XXX:9000
````
**No te olvides de sustituir la IP por la de tu router**

* Escribir la url de acceso: `localhost:4447`
* Indicar una contraseña.

:::DANGER MUY IMPORTANTE
**OLVIDAR LA CONTRASEÑA IMPLICA PERDER TODOS LOS AVANCES, ASÍ QUE GUÁRDALA BIEN**
:::

<figure>
  <img src="/redes/img/portainer1.png" alt="portainer" width="450" />
</figure>

* Una vez dentro pulsa sobre **Get Started**

<figure>
  <img src="/redes/img/portainer2.png" alt="Redireccion de puertos portainer2" width="450" />
</figure>

* Pulsa sobre **Live Connect**:

<figure>
  <img src="/redes/img/portainer3.png" alt="Redireccion de puertos portainer3" width="450" />
</figure>

* Finalmente puedes ver el panel principal de Portainer:

<figure>
  <img src="/redes/img/portainer4.png" alt="portainer4" width="450" />
</figure>

## PASO 4 Descargar imagen para microservicio.

Desplázate hasta el apartado **Images**, y escribe lo siguiente en Image:
````shell
hashicorp/http-echo
````

La imagen hashicorp/http-echo es una imagen muy ligera que sirve para devolver una respuesta HTTP simple. Es decir, que
cuando accesas al servicio retorna un texto personalizado.

Pulsa sobre el botón **Pull the image**

<figure>
  <img src="/redes/img/portainer5.png" alt="portainer5" width="450" />
</figure>

Verás que se ha descargado la imagen.

### PASO 5 Crear contenedor
Desplázate hasta **Containers**, y pulsa sobre **Add container** para crear un contenedor:

<figure>
  <img src="/redes/img/portainer6.png" alt="portainer6" width="450" />
</figure>


* Configura el contenedor:

<figure>
  <img src="/redes/img/portainer7.png" alt="portainer7" width="450" />
</figure>

* Microservicio creado:

<figure>
  <img src="/redes/img/portainer8.png" alt="portainer8" width="450" />
</figure>


### PASO 6 Crear redirección de puertos
* Para poder consumir este microservicio desde internet (en este caso un servicio que retorna una respuesta http), es 
necesario establecer una redirección de puertos para este servicio.

* Accede a la configuración del router, y crear una nueva regla para que las peticiones que se realicen a mvs.sytes.net:tupuertodocker,
muestren la respueta http del microservicio.

:::warning
La máquina que recibe la petición en la de Docker, por lo que las peticiones se deben de redirigir todas allí.
:::

Debe quedar algo así:

<figure>
  <img src="/redes/img/microservicio1.png" alt="microservicio1" width="450" />
</figure>


### PASO 7 Acceder al servicio
Finalmente, desde cualquier navegador escribiremos la url con el puerto de acceso, es decir, el socket:
````shell
http://mvs.sytes.net:TUPUERTO
````
<figure>
  <img src="/redes/img/acceso_microservicio1.png" alt="acceso microservicio1" width="450" />
</figure>
 
----

### PRÁCTICA DOCKER PARTE 1
Crea los siguientes microservicios, descargando las imágenes que se indican:

* **Microservicio2 - Devuelve IP y cabeceras HTTP**

El microservicio usa el puerto 80

````shell
traefik/whoami
````

Retorna algo de este estilo:
`
Hostname: bc0dfe4a67e1
IP: 127.0.0.1
IP: ::1
IP: 172.17.0.4
RemoteAddr: 192.168.88.42:33991
GET / HTTP/1.1
Host: 192.168.88.47:30202
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
Connection: keep-alive
Cookie: _pk_id.1.b2bb=2ec30f3617124f87.1741433202.
Upgrade-Insecure-Requests: 1
`

* **Microsercivio 3 - Gestores de base de datos**
Instala los siguientes gestores de base de datos:
- Adminer: `adminer` (usa puerto 8080)
- PgAdmin: `dpage/pgadmin4` (usa puerto 80)

:::danger
Necesario establecer variables de entorno:
````shell
PGADMIN_DEFAULT_EMAIL: admin@ejemplo.com
PGADMIN_DEFAULT_PASSWORD: admin123
````
<figure>
  <img src="/redes/img/pgadmin_env.png" alt="pgadmin" width="450" />
</figure>

:::

- Crea el contenedor, y realiza la redirección correcpondiente.
- Accede mediante el socket creado (mvs.sytes.net:PUERTO), y establece el usuario y contraseña indicados al crear el contendor

<figure>
  <img src="/redes/img/pgadmin_web.png" alt="pgadmin web" width="450" />
</figure>

Establece la conexión con la base de datos postgres de tu red

<figure>
  <img src="/redes/img/pgadmin_con.png" alt="pgadmin web" width="450" />
</figure>

<figure>
  <img src="/redes/img/pgadmin_con2.png" alt="pgadmin web" width="450" />
</figure>


----
## PRÁCTICA PARTE 2

### Crear contenedor de base de datos MYSQL
Los contenedores de bases de datos necesitan una forma de almacenar sus datos de forma persistente, ya que, por defecto, toda la información se pierde al detener o eliminar el contenedor.

Para evitarlo, se debe asociar un volumen al contenedor. De este modo, los datos permanecen guardados aunque el contenedor se reinicie o se vuelva a crear.

A continuación, veremos un ejemplo práctico utilizando la imagen oficial de MariaDB.

Usa la imagen `mariadb`. Esta base de datos usa el puerto `3306`

<figure>
  <img src="/redes/img/mariadb1.png" alt="mariadb 1" width="450" />
</figure>

Al crear el contenedor indicamos el volumen creado

:::danger

**NO EXPONER AL EXTERIOR!! (no usar puerto de pruebas, asignar el que tiene por defecto)**

:::

<figure>
  <img src="/redes/img/mariadb2.png" alt="mariadb 2" width="450" />
</figure>

En este caso es necesario usar la siguiente varible de entorno para establecer la contraseña del usuario principal root:

<figure>
  <img src="/redes/img/mariadb3.png" alt="mariadb 3" width="450" />
</figure>

Para acceder a la base de datos podemos usar el microservicio creado de Adminer, **indicando la IP Interna de docker**

### Crear contenedor postgres.
Usa la imagen `dpage/pgadmin4`. El puerto es el ya conocido `5432`

:::danger

**NO EXPONER AL EXTERIOR!! (no usar puerto de pruebas, asignar el que tiene por defecto)**

:::

````shell
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
````

**No te olvides de no usar este tipo de contraseñas en producción**