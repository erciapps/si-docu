---
sidebar_position: 1
---


# SUBREDES - VLANS

<div>
    <iframe src="/redes/SUBNETING.pdf" width="100%" height="500px" />
</div>

# Subnetting con y sin VLSM

## Qué es VLSM
**VLSM** (*Variable Length Subnet Mask*) consiste en dividir una red en subredes de **distinto tamaño** según los hosts que necesita cada una.

Sirve para **aprovechar mejor las IP**.

---

## Diferencia rápida

### Sin VLSM
Todas las subredes tienen **la misma máscara**.

### Con VLSM
Cada subred puede tener **una máscara diferente**.

---

## Ejemplo sin VLSM
Red base: **192.168.1.0/24**  
Se quieren **4 subredes iguales**.

### Paso 1. Pedir bits prestados
De `/24` a `/26`.

- Máscara nueva: **255.255.255.192**
- Subredes: **4**
- Hosts útiles por subred: **62**
- Salto: **64**

### Resultado

#### Subred 1
- Red: **192.168.1.0/26**
- Hosts: **192.168.1.1 - 192.168.1.62**
- Broadcast: **192.168.1.63**

#### Subred 2
- Red: **192.168.1.64/26**
- Hosts: **192.168.1.65 - 192.168.1.126**
- Broadcast: **192.168.1.127**

#### Subred 3
- Red: **192.168.1.128/26**
- Hosts: **192.168.1.129 - 192.168.1.190**
- Broadcast: **192.168.1.191**

#### Subred 4
- Red: **192.168.1.192/26**
- Hosts: **192.168.1.193 - 192.168.1.254**
- Broadcast: **192.168.1.255**

### Idea clave
Aunque una subred necesite 10 hosts y otra 50, **todas reciben el mismo tamaño**.

---

## Ejemplo con VLSM
Red base: **192.168.1.0/24**  
Necesidades:

- Red A: **100 hosts**
- Red B: **50 hosts**
- Red C: **25 hosts**
- Red D: **10 hosts**

### Paso 1. Ordenar de mayor a menor
- 100
- 50
- 25
- 10

### Paso 2. Calcular máscara para cada caso

- 100 hosts → **/25** → 126 hosts útiles
- 50 hosts → **/26** → 62 hosts útiles
- 25 hosts → **/27** → 30 hosts útiles
- 10 hosts → **/28** → 14 hosts útiles

### Paso 3. Asignar bloques

#### Red A → 100 hosts
- Red: **192.168.1.0/25**
- Hosts: **192.168.1.1 - 192.168.1.126**
- Broadcast: **192.168.1.127**

#### Red B → 50 hosts
- Red: **192.168.1.128/26**
- Hosts: **192.168.1.129 - 192.168.1.190**
- Broadcast: **192.168.1.191**

#### Red C → 25 hosts
- Red: **192.168.1.192/27**
- Hosts: **192.168.1.193 - 192.168.1.222**
- Broadcast: **192.168.1.223**

#### Red D → 10 hosts
- Red: **192.168.1.224/28**
- Hosts: **192.168.1.225 - 192.168.1.238**
- Broadcast: **192.168.1.239**

### Sobra
- **192.168.1.240 - 192.168.1.255**

### Idea clave
Aquí **no todas las subredes son iguales**. Cada una recibe solo el tamaño que necesita.

---

## Comparación directa

| Caso | Método | Resultado |
|---|---|---|
| 4 subredes iguales | Sin VLSM | Todas con `/26` |
| Redes de 100, 50, 25 y 10 hosts | Con VLSM | `/25`, `/26`, `/27`, `/28` |

---

## Cómo aplicar VLSM
1. Ordena las necesidades de hosts de mayor a menor.
2. Busca la máscara mínima que cubra cada necesidad.
3. Asigna primero la subred más grande.
4. La siguiente empieza justo después del broadcast anterior.
5. Repite hasta terminar.

---

## Tabla rápida

| Prefijo | Máscara | Hosts útiles |
|---|---|---:|
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /29 | 255.255.255.248 | 6 |
| /30 | 255.255.255.252 | 2 |

---

## Ejemplo extra sin VLSM
Red base: **10.0.0.0/24**  
Se quieren **8 subredes iguales**.

- Nuevo prefijo: **/27**
- Máscara: **255.255.255.224**
- Hosts útiles por subred: **30**
- Salto: **32**

Primeras subredes:
- **10.0.0.0/27**
- **10.0.0.32/27**
- **10.0.0.64/27**
- **10.0.0.96/27**
- **10.0.0.128/27**
- **10.0.0.160/27**
- **10.0.0.192/27**
- **10.0.0.224/27**

---

## Ejemplo extra con VLSM
Red base: **192.168.10.0/24**  
Necesidades:

- Aula 1: **60 hosts**
- Aula 2: **30 hosts**
- Aula 3: **12 hosts**
- Aula 4: **6 hosts**

### Máscaras necesarias
- 60 hosts → **/26**
- 30 hosts → **/27**
- 12 hosts → **/28**
- 6 hosts → **/29**

### Reparto

#### Aula 1
- Red: **192.168.10.0/26**
- Hosts: **192.168.10.1 - 192.168.10.62**
- Broadcast: **192.168.10.63**

#### Aula 2
- Red: **192.168.10.64/27**
- Hosts: **192.168.10.65 - 192.168.10.94**
- Broadcast: **192.168.10.95**

#### Aula 3
- Red: **192.168.10.96/28**
- Hosts: **192.168.10.97 - 192.168.10.110**
- Broadcast: **192.168.10.111**

#### Aula 4
- Red: **192.168.10.112/29**
- Hosts: **192.168.10.113 - 192.168.10.118**
- Broadcast: **192.168.10.119**

---

## Errores típicos
- No ordenar de mayor a menor en VLSM.
- Elegir una máscara que no da suficientes hosts.
- Empezar una subred en una IP que no coincide con el salto.
- Confundir número total de direcciones con hosts útiles.

---

## Mini ejercicios

### 1. Sin VLSM
Divide **192.168.50.0/24** en **4 subredes iguales**.

Calcula:
- nueva máscara
- red de cada subred
- broadcast
- rango de hosts

### 2. Con VLSM
Usa **192.168.20.0/24** para:
- 80 hosts
- 40 hosts
- 20 hosts
- 8 hosts

Calcula:
- máscara de cada bloque
- red asignada
- broadcast
- rango de hosts

---

## Resumen final
- **Sin VLSM**: todas las subredes tienen el mismo tamaño.
- **Con VLSM**: cada subred tiene el tamaño justo que necesita.
- Si el ejercicio tiene necesidades distintas de hosts, normalmente debes usar **VLSM**.