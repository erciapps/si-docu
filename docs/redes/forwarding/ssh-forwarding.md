---
sidebar_position: 1
---


# REDIRECCIONES EN SSH

¿Qué es una redirección SSH?
Una redirección SSH o túnel SSH permite enviar tráfico de red a través de una conexión segura SSH, 
redirigiendo puertos desde el equipo local al remoto o viceversa.

## Ejemplo práctico

````shell
ssh -i "C:\Users\rafa\.ssh\id_rsa_damx" -p 30000 damx@mvs.sytes.net -L 4444:127.0.0.1:3389-L 4449:192.160.51.149:5432
````

**¿Qué hace esto?**    

Se conecta a `mvs.sytes.net` por el puerto `30000` como usuario `damx`, usando la clave privada `id_rsa_damx`.   

Crea dos redirecciones locales:   

1. `localhost:4444 ➜ 127.0.0.1:3389` en el servidor remoto.   

* Accedes a escritorio remoto (RDP) desde tu equipo con `localhost:4444`.

2. `localhost:4449 ➜ 192.160.51.149:5432` desde el servidor remoto.

* Accedes a PostgreSQL en una máquina interna de su red.




### **CONEXIONES SSH**
* El puerto por defecto de SSH es el 22
* Algunos equipos necesitan conectarse a otros por SSH desde otra red
* Si hay más de un servidor SSH en la misma red, se necesitarán puertos externos diferentes (port translation) para que el router sepa a quién redirigir

## EJERCICIOS
Responde a las siguientes preguntas sobre el esquema de red facilitado.

<figure>
  <img src="/redes/img/forwarding_ejemplo1.png" alt="Forwarding ejemplo 1" width="300" />
</figure>

### Pregunta 1.
**EQ3** accede por SSH a **EQ4**, ¿Hace falta redirección NAT?

____

### Pregunta 2.
**EQ3** accede por SSH a **EQ6** (en otra red), ¿Hace falta redirección NAT?

____

### Pregunta 3.
Desde fuera (Internet) se quiere acceder por SSH a **EQ2** y **EQ4** , ¿Hace falta redirección NAT?

### Pregunta 4. EQ3 quiere conectarse por SSH a EQ4 (192.168.20.13).
¿Qué comando usaría?
A) ssh usuario@EQ4
B) ssh usuario@80.40.30.44
C) ssh usuario@192.168.20.13
D) ssh -p 22 usuario@172.16.0.201

________________________________________

### Pregunta 5. Desde Internet, un usuario quiere acceder por SSH a EQ2.
¿Qué configuración NAT debe aplicarse en Router3 y Router1?

________________________________________
### Pregunta 6. ¿Por qué se necesita cambiar el puerto externo (ej. 2223) cuando varios equipos ofrecen SSH en redes privadas?
A) Porque no pueden tener la misma IP interna
B) Porque solo se puede hacer una redirección por puerto
C) Porque SSH solo funciona en redes internas
D) Porque no se pueden usar switches con NAT


