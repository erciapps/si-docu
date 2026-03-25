---
sidebar_position: 2
---
import AsciinemaWidget from '/src/components/AsciinemaWidget';

# Práctica 2. SFTP Y SERVICIO WEB CON TOMCAT
<!-- | Nombre         | Usuario | IP ACCESO DDBB | Pruebas | Login/Registro | Tareas | Pruebas 2       | Docker        |
|----------------|---------|----------------|---------|----------------|--------|------------------|---------------|
| Manuel         | dam50   | 192.160.51.150 | 30002   | 30003          | 30004  | 30055 - 30059    | 30201 - 30210 |
| Martín         | dam51   | 192.160.51.151 | 30005   | 30006          | 30007  | 30060 - 30064    | 30211 - 30220 |
| Izaro          | dam52   | 192.160.51.152 | 30008   | 30009          | 30010  | 30065 - 30069    | 30221 - 30230 |
| Francisco      | dam54   | 192.160.51.154 | 30011   | 30012          | 30013  | 30070 - 30074    | 30231 - 30240 |
| Adrián         | dam55   | 192.160.51.155 | 30014   | 30015          | 30016  | 30075 - 30079    | 30241 - 30250 |
| Carlos         | dam56   | 192.160.51.156 | 30017   | 30018          | 30019  | 30080 - 30084    | 30251 - 30260 |
| Juan David     | dam57   | 192.160.51.157 | 30020   | 30021          | 30022  | 30085 - 30089    | 30261 - 30270 |
| Salma          | dam58   | 192.160.51.158 | 30023   | 30024          | 30025  | 30090 - 30094    | 30271 - 30280 |
| Pedro          | dam59   | 192.160.51.59  | 30026   | 30027          | 30028  | 30095 - 30099    | 30281 - 30290 |
| Josué Mirko    | dam61   | 192.160.51.161 | 30029   | 30030          | 30031  | 30100 - 30104    | 30291 - 30300 |
| Vicente        | dam62   | 192.160.51.162 | 30032   | 30033          | 30034  | 30105 - 30109    | 30301 - 30310 |
| Álvaro         | dam63   | 192.160.51.163 | 30035   | 30036          | 30037  | 30110 - 30114    | 30311 - 30320 |
| Daniel         | dam64   | 192.160.51.164 | 30038   | 30039          | 30040  | 30115 - 30119    | 30321 - 30330 |
| Hugo           | dam65   | 192.160.51.165 | 30041   | 30042          | 30043  | 30120 - 30124    | 30331 - 30340 |
| Alicia         | dam66   | 192.160.51.166 | 30044   | 30045          | 30046  | 30125 - 30129    | 30341 - 30350 |
| Gabriel        | dam67   | 192.160.51.167 | 30047   | 30048          | 30049  | 30130 - 30134    | 30351 - 30360 | -->




## Instalar WINSCP / FILEZILLA / CYBERDUCK
Busca e instala la aplicación en internet. (Seguir instrucciones en clase)

## Descargar proyecto
Descarga este ejemplo de pruebas
````
https://github.com/dam-di/EjemploServletRedes.git
````

:::warining
CREA EL .war
:::


## Configurar TOMCAT
Conecta por ssh y ejecuta los siguientes comandos:

1. Descargar en /home/tu_usuario

````shell
wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.85/bin/apache-tomcat-9.0.85.tar.gz
````

2. Descomprimir
````shell
tar xzf apache-tomcat-9.0.85.tar.gz
````

3. Cambiar nombre
````shell
mv apache-tomcat-9.0.85 tomcat
````

4. Modificar puerto tomcat

````shell
nano ~/tomcat/conf/server.xml
````

Busca
````shell
<Connector port="8080" ... />
````
Y cámbialo por el primer puerto asignado de la tabla (de Pruebas 2)

Busca
````shell
<Server port="8005" shutdown="SHUTDOWN">
````
Y cámbialo por 80xx, siendo xx tu identificador dam. Por ejemplo, si eres dam67 pondrías 8067

5. Crear servicio

:::danger IMPORTANTE
CAMBIA tomcatdamxx por el identificador que tengas.
:::

````shell
mkdir -p ~/.config/systemd/user
nano ~/.config/systemd/user/tomcatdamxx.service
````

````shell
[Unit]
Description=Tomcat user service
After=network.target

[Service]
Type=forking
ExecStart=%h/tomcat/bin/startup.sh
ExecStop=%h/tomcat/bin/shutdown.sh
Environment=JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
Restart=on-failure

[Install]
WantedBy=default.target
````




6. Cargar el archivo `.war`
Copia el archivo en la ruta `~/tomcat/webapps` con el nombre de `ROOT.war`
Da los siguientes permisos:

````shell
chmod 644 ~/tomcat/webapps/ROOT.war
````

:::danger IMPORTANTE
Es necesario eliminar el directorio por defecto `ROOT`
````shell
rm -rf  ~/tomcat/webapps/ROOT
````
:::


7. Arrancar el servicio:
**NO TE OLVIDES DE PONER `tomcatdaxx` CAMBIÁNDOLO POR TU IDENTIFICADOR**
````shell
systemctl --user daemon-reload
systemctl --user enable tomcatdamxx
systemctl --user start tomcatdamxx
````
Si fuera necesario usar los siguientes comandos para restablecer y ver el estado del servicio
````shell
systemctl --user restart tomcatdamxx
systemctl --user status
````

8. Acceder al servidor web

Desde cualquier navegador escribe la siguiente url:
````shell
http://tunombredam.sytes.net
````
Sustituye tunombredam por tu nombre finalizado en dam (mira la tabla)