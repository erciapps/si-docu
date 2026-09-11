---
sidebar_position: 2
---


# Ejemplos básicos Python
En esta sección aprenderemos los principios básicos del lenguaje Python, de una manera muy básica.
* Python es un lenguaje **INTERPRETADO** al igual que `bash`, esto quiere decir que el lenguaje se ejecuta línea por línea.   
* Es de **TIPADO DINÁMICO**, lo que implica que no es necesario indicar que tipo de datos es una variable. En java por ejemplo 
si queremos crear una variable de tipo `string` (cadena de caracteres), debemos hacer algo como esto: `string mi_variable = "Esto es una variable string""`.
En el caso de python lo podemos hacer de la siguiente forma: `mi_variable = "Esto es una variable de tipo string"`   
* **FUERTEMENTE TIPADO**. El tipo de datos se comprueba en tiempo de ejecución, por lo que la libertad de no indicar el tipo de datos 
en realidad puede generar algunos inconvenientes en determinadas circunstancias. Por ejemplo, podría darse en caso de intentar sumar un
número entero con una cadena de caracteres, lo que implicaría un error. Una ventaja de comprobar en tiempo de ejecución es
que permite que las variables puedan almacenar diferente tipo de datos en determinadas circunstancias.   
* **MULTIPLATAFORMA**. Python puede ser ejecutado en la mayoría de sistemas operativos.
* **ORIENTADO A OBJETOS**

## Instalar Pycharm
Descargar e instalar la versión "Professional" del **IDE PyCharm**:   
https://www.jetbrains.com/pycharm/download/?section=windows

## Crear proyecto 
1. Seleccionamos ***Pure Python**.
2. En el apartado "Location" indicamos un nombre de proyecto y una ubicación que después podamos recordar facilmente.
3. Seleccionamos en "Interpreter type" **Project venv** de esta manera aislamos de forma segura nuestra aplicación, de manera que se crea un entorno separado que no afecta al resto de componentes. Esto quiere decir que si instalamos una librería de Pyhton, no se instalará a nivel de sistema. Por defecto seleccionaremos la version 3.11

:::note Nota
En caso de no disponer de ningún intérprete Python instalado, lo podemos descargar e instalar de la siguiente URL:   
https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe   
   (Será necesario cerrar y volver a abrir Pycharm para que detecte el intérprete)
:::
<figure>
  <img src="/img/python/p1.png" alt="new project python" width="500" />
</figure>

Una vez creado el proyecto podremos ver algo como lo mostrado en la siguiente imagen:

<figure>
  <img src="/img/python/p2.png" alt="python2" width="500" />
</figure>

1. En el lateral izquierdo se encuentran la estructura del proyecto.
2. Disponemos de diferentes botones para ejecutar y depurar la aplicación (detener la ejecución mediante puntos de interrupción).


## Crear un archivo nuevo con extensión `.py`
Tenemos que hacer clic derecho sobre la carpeta del proyecto (`ejemploPython` en la imagen).
Nos desplazamos a "New / Python File"

<figure>
  <img src="/img/python/p3.png" alt="python3" width="500" />
</figure>

Creamos un nuevo archivo con el nombre `test`

Añadimos el siguiente código de ejemplo:
```python
def saludo():
    print('Hola desde python')
   

if __name__ == '__main__':
    saludo()
```

Ejecutamos el código haciendo clic sobre el botón "Play", y seleccionamos "Run 'test'"

<figure>
  <img src="/img/python/p4.png" alt="python4" width="500" />
</figure>

Podemos ver en la consola la ejecución de nuestro código. En este caso llamamos al método saludo, que imprime por consola 
el saludo `Hola desde python`

<figure>
  <img src="/img/python/p5.png" alt="python5" width="500" />
</figure>

## Indentación
El imprescindible el uso de indentación (tabulado) para indicar donde empieza y donde acaba un bloque de código (al igual que en `bash`).   
  Por ejemplo:
```python
def saludo():
>>>print('Hola gente')
```
Donde ves >>> es la indentación. Simplemente, asegúrate de pulsar la tecla tabuladora (no usar barra espaciadora).

## Comentarios
Podemos realizar comentarios de tipo:
```python
# Comentario de una línea antes del código
def metodo():
    pass

def metodo():
    pass # Comentario en la misma linea. pass no hace nada, se usa ya que no puedes dejar sin nada un método , condicional...

'''
Comentario de múltiples líneas
En ese caso se suele usar cuando se quiere documentar la aplicación
'''
```

## Función `print()`
La función print() en Python se utiliza para mostrar información en la consola o en la salida estándar. Es una función 
muy comúnmente utilizada para depuración, visualización de resultados y comunicación con el usuario. 
### Ejemplo 1: Imprimir texto simple
```python
print("Hola mundo")
```

### Ejemplo 2: Imprimir variables
#### Forma 1
```python
nombre = "Juan"
edad = 30
print("Nombre:", nombre, "Edad:", edad)
```
#### Forma 2 **f-strings** (más versátil)
```python
nombre = "Juan"
edad = 30
print(f'Nombre: {nombre}, Edad: {edad}')
```
**Nota:** Podemos usar indistintamente comillas simples o dobles.

## Variables.
Las variables sirven para almacenar datos y valores. Son **case sensitive** (distigue mayúsculas de minúsculas).
Las variables más comunes que podemos utilizar en python son:
### **Enteros (int)**
```python
numero_entero = 10 

# Convertir de string (str) a entero (int)
precio = int("14")
```
### **Flotantes (float)**
```python
numero_flotante = 3.14 

# Convertir de string (str) a float
precio = float("12.3")
```

### **Cadenas de caracteres (str)**
```python
cadena = "Hola mundo"
```


### **Booleanos (bool)**
```python
booleano_verdadero = True
booleano_falso = False
```
* **lista = [1, 2, 3, 4, 5]**
```python
lista = [1, 2, 3, 4, 5]
```
* **Tuplas (tuple)**
```python
tupla = (1, 'a', True)
```
* **Diccionarios (dict)**
```python
diccionario = {'nombre': 'Juan', 'edad': 30}
```
* **Conjuntos (set)**
```python
conjunto = {1, 2, 3, 4, 5}
```

## Entrada de datos: `input()`

La función `input()` permite **leer datos desde el teclado**. Detiene la ejecución del programa hasta que el usuario escribe algo y pulsa **Enter**.

## ¿Cómo funciona `input()`?

```python
variable = input("Mensaje para el usuario: ")
```

- El texto entre comillas es **el mensaje que verá el usuario**.
- Lo que el usuario escriba se guarda en la **variable**.
- El valor obtenido **siempre es un string (str)**.

### Ejemplo

```python
nombre = input("¿Cómo te llamas? ")
print("Hola,", nombre)
```

## `input()` siempre devuelve un string

Si necesitas números, debes convertirlos:

### Convertir a entero (`int`)
```python
edad = int(input("Introduce tu edad: "))
```

### Convertir a flotante (`float`)
```python
precio = float(input("Introduce el precio: "))
```

## Ejemplos comunes

```python
nombre = input("Nombre: ")
cantidad = int(input("Cantidad: "))
nota = float(input("Nota del examen: "))
```

## Errores habituales

```python
edad = int("hola")  # Error
```

```python
a = input("Número: ")
b = input("Otro número: ")
print(a + b)   # concatena strings
```

Solución:

```python
a = int(input("Número: "))
b = int(input("Otro número: "))
print(a + b)
```

## Funciones
Como ya sabrás, para declarar una función en Python tenemos que usar la instrucción `def` seguida del nombre de la 
función, y finalizada con dos puntos (:). Además debemos tener en cuenta que el código que contiene el método ha de estar
indexado.
```python
def un_metodo():
    pass
```
### Parámetros
Para pasar parámetros a un método podemos utilizar varias formas.
#### Posicionales
Los argumentos posicionales son aquellos que se pasan a la función en el mismo orden en el que están definidos los parámetros de la función.
```python
def suma(a, b):
    return a + b

resultado = suma(3, 5)
print(resultado)  # Imprime: 8
```

#### Con valores predeterminados
Los argumentos con valores predeterminados tienen un valor por defecto en caso de que no se especifiquen al llamar a la función.
```python
def saludar(nombre, saludo="Hola"):
    return f"{saludo}, {nombre}!"

mensaje = saludar("Juan")
print(mensaje)  # Imprime: Hola, Juan!
```

#### Argumentos de palabra clave
Los argumentos de palabra clave permiten pasar argumentos a una función utilizando el nombre del parámetro.
```python
def area_rectangulo(base, altura):
    return base * altura

area = area_rectangulo(base=5, altura=4)
print(area)  # Imprime: 20
```

#### Argumentos variables (*args)
Los argumentos variables (`*args`) permiten pasar un número variable de argumentos posicionales a una función.
```python
def suma(*args):
    total = 0
    for num in args:
        total += num
    return total

resultado = suma(1, 2, 3, 4, 5)
print(resultado)  # Imprime: 15
```

#### Argumentos de palabra clave variables (**kwargs)
Los argumentos de palabra clave variables (`**kwargs`) permiten pasar un número variable de argumentos de palabra clave a una función.
```python
def imprimir_informacion(**kwargs):
    for clave, valor in kwargs.items():
        print(f"{clave}: {valor}")

imprimir_informacion(nombre="Juan", edad=30, ciudad="Madrid")
# Imprime:
# nombre: Juan
# edad: 30
# ciudad: Madrid
```

## Manejo de excepciones
Podemos encontrarnos en multitud de situaciones en las cuales nuestro código puede generar un error en tiempo de ejecución. 
Para manejar estos errores utilizamos las palabras clave: **`TRY, EXCEPT, FINALLY (no es oblicatoria)`**   
Por ejemplo:
1. **ZeroDivisionError:** Ocurre cuando intentas dividir un número por cero.
```python
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("Error: División por cero no permitida")

```
2. **IndexError:** Ocurre cuando intentas acceder a un índice que está fuera del rango de una lista o tupla. 
```python
lista = [1, 2, 3]
try:
    print(lista[3])
except IndexError:
    print("Error: Índice fuera del rango de la lista")

```
3. **TypeError:** Ocurre cuando intentas realizar una operación en un tipo de dato no compatible. 
```python
try:
    resultado = "Hola" + 5
except TypeError:
    print("Error: Operación no válida entre tipos de datos")

```
4. **NameError:** Ocurre cuando intentas acceder a una variable o función que no está definida. 
```python
try:
    print(variable_no_definida)
except NameError:
    print("Error: La variable no está definida")

```
5. **KeyError:** Ocurre al intentar acceder a una clave que no existe en un diccionario. 
```python
diccionario = {'a': 1, 'b': 2}
try:
    print(diccionario['c'])
except KeyError:
    print("Error: Clave no encontrada en el diccionario")

```
6. **ValueError:** Ocurre cuando una función espera un valor dentro de un rango válido, pero recibe un valor que no lo está.
```python
try:
    numero = int("abc")
except ValueError:
    print("Error: Valor no válido para conversión a entero")

```
7. **FileNotFoundError:** Ocurre cuando intentas abrir un archivo que no existe. 
```python
try:
    with open('archivo_no_existente.txt', 'r') as archivo:
        contenido = archivo.read()
except FileNotFoundError:
    print("Error: Archivo no encontrado")

```
8. **AttributeError:** Ocurre cuando intentas acceder a un atributo que no existe en un objeto. 
```python
lista = [1, 2, 3]
try:
    print(lista.length)
except AttributeError:
    print("Error: El atributo no existe en el objeto")

```

## Ejercicios de ejemplo

1. Cálculo de descuentos
Escribe un programa que pida al usuario el precio de un producto y el porcentaje de descuento, y muestre el precio final tras aplicar el descuento.

<details>
  <summary>Haz clic para ver la solución 1</summary>

```python
def calcular_descuento(precio, descuento):
    return precio - (precio * descuento / 100)

precio = float(input("Precio del producto: "))
descuento = float(input("Descuento (%): "))

print("Precio final:", calcular_descuento(precio, descuento))

```
</details>


2. Clasificador de edades
Pide una edad por teclado y muestra si la persona es niño, adolescente, adulto o anciano según el valor introducido.

<details>
  <summary>Haz clic para ver la solución 2</summary>

```python
def clasificar_edad(edad):
    if edad < 12:
        return "Niño"
    elif edad < 18:
        return "Adolescente"
    elif edad < 65:
        return "Adulto"
    else:
        return "Anciano"

edad = int(input("Introduce tu edad: "))
print("Clasificación:", clasificar_edad(edad))
```
</details>

3. Contador de vocales
Solicita una cadena de texto al usuario y muestra cuántas vocales contiene.

<details>
  <summary>Haz clic para ver la solución 3</summary>

```python
def contar_vocales(texto):
    vocales = "aeiouAEIOU"
    contador = 0
    for letra in texto:
        if letra in vocales:
            contador += 1
    return contador

texto = input("Introduce un texto: ")
print("Número de vocales:", contar_vocales(texto))

```
</details>

4. Conversor de temperaturas
Crea un programa que convierta una temperatura en grados Celsius a Fahrenheit y Kelvin.

<details>
  <summary>Haz clic para ver la solución 4</summary>

```python
def convertir_temperatura(celsius):
    fahrenheit = celsius * 9/5 + 32
    kelvin = celsius + 273.15
    return fahrenheit, kelvin

celsius = float(input("Temperatura en Celsius: "))
f, k = convertir_temperatura(celsius)

print("Fahrenheit:", f)
print("Kelvin:", k)

```
</details>


