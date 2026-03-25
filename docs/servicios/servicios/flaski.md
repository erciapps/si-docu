---
sidebar_position: 2
---

# Servicio API Rest



## Crear proyecto

* Crea un nuevo proyecto en python.
* Una vez creado el proyecto podremos ver algo como lo mostrado en la siguiente imagen:

<figure>
  <img src="/img/python/python1.png" alt="python1" width="500" />
</figure>

1. En el lateral izquierdo se encuentran la estructura del proyecto.
2. Disponemos de diferentes botones para ejecutar y depurar la aplicación (detener la ejecución mediante puntos de interrupción).
3. El programa básico incluye:

   ```python
   from flask import Flask
   ```
   Importar la clase `Flask` del módulo `flask`. La clase `Flask` es la base para crear instancias de aplicaciones Flask.
   ```python
   app = Flask(__name__)
   ```
   Instancia de la aplicación Flask. El argumento `__name__` que se pasa al constructor de clase, hace referencia a la
   palabra `__main__` si el script es ejecutado directamente con `Python`. En el caso de que el script sea importado (este es el caso),
   el valor de `__name__` corresponde al nombre del módulo. En nuestro caso `app`.
   ```python
   @app.route('/')
   ```
   Decorador de ruta. Indica que la función debajo de él manejará las solicitudes HTTP para la ruta principal (raiz).
   ```python
   def hello_world():
    return 'Hello World!'
   ```
   Esta es la función de vista que manejará las solicitudes para la ruta raíz. Cuando un usuario accede a la ruta raíz
   de la aplicación, esta función se ejecutará. En este caso, la función simplemente devuelve la cadena 'Hello World!'.
   ```python
   if __name__ == '__main__':
      app.run()
   ```
   Esta parte del código será ejecutada siempre y cuando el script sea directamente ejecutado por el intérprete Python.
   Cuando se ejecuta un script (`python3.11 app.py`) esta variable tomará el valor '__main__', por lo que ejecutará
   el servidor web. En este caso, no ocurre esto, ya que este script es directamente importado en la ejecución (no entra en este `if`).


## Ejecutar servidor
Para poner a prueba nuestro servidor, pulsaremos sobre el botón verde de "PLAY". Veremos algo parecido:
<figure>
  <img src="/img/python/flaskserver.png" alt="flask server" width="500" />
</figure>
Lo que nos informa la salida es que el servidor se encuentra funcionando en la URL: `http://127.0.0.1:5000`    
* **http://** Protocolo de transferencia de hipertexto (.css, .js, .html, .pdf, json, xml, etc... ), es decir, 
que lo que se transmite "normalmente en servidores web" es una página web completa, pero también puede transportar 
información en formato xml o json que nos puede ser de utilizar para base de datos noSQL.   
* **127.0.0.1** Esta dirección IP ase refiere a la IP que se encuentra en escucha. En este caso se refiere a nuestro propio ordenador.   
* **5000** Es el puerto de "pruebas" de escucha del servidor. En el caso de una página web cuando se encuentra en producción, 
es el puerto 80 para http, y 443 para https.

Al acceder a la ruta desde un navegador web, veremos que simplemente muestra la frase `Hello World!`, que es exactamente lo que hace el método
`hello_word()` en la ruta raiz (`/`).
<figure>
  <img src="/img/python/flaskweb.png" alt="flaskweb" width="500" />
</figure>

## Crear plantilla (template)
Dentro del directorio `templates` crearemos nuestra página web de ejemplo (archivo `html`).   
Pulsamos botón derecho sobre la carpeta `templates/New/HTML File`.
<figure>
  <img src="/img/python/createhtml.png" alt="html" width="500" />
</figure>
Ponemos el nombre que queramos, en nuestro caso, `home`.
<figure>
  <img src="/img/python/homeweb.png" alt="homeweb" width="200" />
</figure>
Nos creará una plantilla por defecto de la estructura de una página web. Incluimos una etiqueta
tipo `h1` con el texto: "ESTA ES MI PÁGINA WEB" (ver siguiente imagen)
<figure>
  <img src="/img/python/homeweb2.png" alt="homeweb2" width="500" />
</figure>
Lanzamos nuestro servidor web:
<figure>
  <img src="/img/python/staticweb.png" alt="statiweb" width="500" />
</figure>
Para acceder a nuestra maravillosa página web, abrimos un navegador e indicamos la ip y puerto.
<figure>
  <img src="/img/python/staticweb2.png" alt="statiweb2" width="500" />
</figure>


## VENV (Entorno Virtual)

Un entorno virtual en Python (`venv`) es un entorno aislado que permite instalar paquetes sin afectar el sistema global.  
Se usa para gestionar dependencias específicas de cada proyecto.

A continuación, se explican los pasos para crear un entorno virtual, clonar un repositorio y ejecutar un programa en Python.

---

## Configuración en PyCharm

### Crear archivo `requirements.txt`
El archivo `requirements.txt` en Python lista las dependencias del proyecto para facilitar su instalación con el comando:

```shell
pip install -r requirements.txt
```

Para generarlo en **PyCharm**:
1. Abre PyCharm y carga tu proyecto.
2. Abre la terminal en PyCharm (`View > Tool Windows > Terminal`).
3. Ejecuta el siguiente comando:
   ```shell
   pip freeze > requirements.txt
   ```
   Esto generará un archivo `requirements.txt` en la raíz del proyecto con todas las dependencias instaladas.

---

## Configuración en linux

Abre la consola de tu servidor y ejecuta los siguientes comandos en orden.

### Actualizar la lista de paquetes disponibles en los repositorios
```shell
sudo apt update
```

### Instalar el módulo para crear entornos virtuales en Python
```shell
apt install python3-venv
```

### Crear y activar un entorno virtual

1. Cambia al directorio del usuario y crea una carpeta para entornos virtuales:
   ```shell
   cd
   mkdir venvs
   cd venvs
   ```
2. Crea un entorno virtual llamado `pythonapp_env`:
   ```shell
   python3 -m venv pythonapp_env
   ```
3. Activa el entorno virtual:
   ```shell
   source pythonapp_env/bin/activate
   ```

---

## Instalar dependencias y ejecutar el programa

1. Desplázate al directorio donde clonaste el repositorio:
   ```shell
   cd <directorio_del_repositorio>
   ```
2. Instala las dependencias listadas en `requirements.txt`:
   ```shell
   pip install -r requirements.txt
   ```
3. Instala el paquete para ubuntu
````shell
sudo apt-get install libmpv2
````

4. Para probar si funciona el programa, ejecuta:
   ```shell
   python main.py
   ```




## Ejemplo Login
### PLANTILLA HTML PARA LOGIN
Crea en el directorio `templates` la siguiente plantilla:

````html title='login_template.html'
<!DOCTYPE html> <!-- Declara el tipo de documento HTML5 -->
<html lang="es"> <!-- Define el idioma de la página como español -->
<head>
    <meta charset="UTF-8"> <!-- Define la codificación de caracteres como UTF-8 -->
    <title>Login</title> <!-- Título que aparecerá en la pestaña del navegador -->
</head>
<body>
<!-- Formulario que enviará los datos al servidor usando el método POST -->
<form action="/sign_in" method="POST">
    <!-- Campo para ingresar el correo o nombre de usuario -->
    <label for="email">Correo / Usuario:</label>
    <input type="text" id="email" name="login" required> <!-- Campo de texto, requerido -->
    <br> <!-- Salto de línea -->

    <!-- Campo para ingresar la contraseña -->
    <label for="password">Contraseña:</label>
    <input type="password" id="password" name="passwd" required> <!-- Campo de contraseña, requerido -->
    <br> <!-- Salto de línea -->

    <!-- Botón para enviar el formulario -->
    <button type="submit">Aceptar</button>
</form>
</body>
</html>
````

### END POINT
Añade el siguiente `end point` a tu proyecto para retornar la página web que contiene el formulario.   
Para acceder a esta página web recuerda que el servidor está funcionando en local en el puerto 5000: http://localhost:5000/form_login
````py
@app.route('/form_login')  # Define la ruta para manejar solicitudes GET en '/form_login'
def login():
    # Renderiza la plantilla HTML llamada 'login_template.html' cuando se accede a la ruta '/form_login'
    return render_template('login_template.html')  # Devuelve la plantilla de login para que se muestre en el navegador
````

<figure>
  <img src="/img/python/flask/formlogin.png" alt="formlogin" width="500" />
</figure>


### MÉTODO PARA REALIZAR LOGIN
* Observa que el formulario de la plantilla destinada a realizar el login, dispone de los siguientes atributos:
`action="/sign_in" method="POST"`. Esto quiere decir que al pulsar el botón aceptar, estamos llamando al `end_point` `sign_in`, usando el 
método http `POST`.
* El siguiente `end point` tiene el nombre `sign_in`, y se accede mediante `POST`, por lo que al pulsar aceptar desde
el formulario, se están enviando las credenciales de acceso tal y como se explica en los comentarios del código.
* Es un método que iremos construyendo a lo largo de esta y posteriores secciones, por lo que de momento su función es
únicamente la de mostrar los datos que hemos enviado para posteriormente redirigir a otro `end_point`.
````py
@app.route('/sign_in', methods=['POST'])  # Define la ruta para el método POST en /sign_in
def sign_in():
    # Obtener los datos del formulario (login y contraseña)
    login = request.form['login']  # Obtiene el valor del campo 'login' (correo o usuario)
    passwd = request.form['passwd']  # Obtiene el valor del campo 'passwd' (contraseña)
    
    # Imprimir el usuario y la contraseña en la consola (para propósitos de depuración)
    print(f'Usuario: {login}')  # Muestra el login (usuario o correo)
    print(f'Contraseña: {passwd}')  # Muestra la contraseña
    
    # Crear una respuesta de redirección a la página '/login_ok'
    response = make_response(redirect('/login_ok'))  # Redirige a la página '/login_ok'
    
    # Establecer una cookie con el token JWT (ejemplo en este caso)
    response.set_cookie('token', 'esto es un token de ejemplo')  # Se establece una cookie llamada 'token'
    
    # Establecer una cookie con el nombre de usuario (ejemplo en este caso)
    response.set_cookie('userlogin', 'el usuario')  # Se establece una cookie llamada 'userlogin'
    
    # Devolver la respuesta con las cookies configuradas
    return response  # Retorna la respuesta con las cookies y la redirección
````

<figure>
  <img src="/img/python/flask/getformlogin.png" alt="getformlogin" width="300" />
</figure>


### PLANTILLA PARA LOGIN CORRECTO
Crea la siguiente plantilla cuyo único cometido es informar al usuario de que el login fue ejecutado de manera correcta.
````html title='login_ok_template.html'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login OK</title>
</head>
<body>
    <h1>¡Inicio de sesión exitoso!</h1>
    <p>Has iniciado sesión correctamente.</p>
</body>
</html>

````

### END POINT LOGIN CORRECTO
````py
@app.route('/login_ok')  # Define la ruta para manejar solicitudes GET en '/login_ok'
def login_ok():
    # Renderiza la plantilla HTML llamada 'login_ok_template.html' cuando se accede a la ruta '/login_ok'
    return render_template('login_ok_template.html')  # Devuelve la plantilla de login_ok para que se muestre al usuario
````

<figure>
  <img src="/img/python/flask/loginok.png" alt="loginok" width="300" />
</figure>

### OBSERVAR COOKIES
En el navegador pulsamos botón derecho y seleccionamos **Inspeccionar**
<figure>
  <img src="/img/python/flask/cookies1.png" alt="cookies1" width="300" />
</figure>

Observa que en el apartado de **Cookies** aparecen las cookies creadas con los valores indicados en nuestro servidor
<figure>
  <img src="/img/python/flask/cookies2.png" alt="cookies2" width="300" />
</figure>