---
sidebar_position: 2
---

# Adaptadores de red 

## Descripción
Un **adaptador de red**, también conocido como **tarjeta de red** o **NIC (Network Interface Card)**, 
es un componente que permite a un dispositivo conectarse a una red, ya sea de forma física o virtual.   

Los adaptadores pueden ser **físicos**, como las tarjetas Ethernet o Wi-Fi (normalmente integradas en la placa base un 
ordenador portátil), o virtuales, creados por software para conectar máquinas virtuales, VPNs o 
entornos de virtualización (VirtualBox, VMWare, Hyper-V, Proxmox, ...). 
Su función principal es facilitar la comunicación entre el dispositivo y la red a la que está conectado, 
ya sea una red local (LAN), una red de área amplia (WAN) o incluso una red virtual.

---

## Tipos de Adaptadores de Red
Existen varios tipos de adaptadores de red, tanto físicos como virtuales, diseñados para distintas tecnologías de comunicación.

### **1. Adaptadores Físicos**

#### **Ethernet**
Usados para redes cableadas, con puertos RJ-45.
<figure>
  <img src="/redes/img/nicethernet.png" alt="nic ethernet" width="175" />
</figure>  

#### **Wi-Fi (802.11)**
Permiten la conexión inalámbrica usando estándares 802.11.
<figure>
  <img src="/redes/img/nicwifim2.webp" alt="nic wifi m2" width="175" />
</figure>  
<figure>
  <img src="/redes/img/nicwifipcie.jpg" alt="nic wifi pcie" width="175" />
</figure>  

#### **Fibra Óptica**
Utilizados en redes de alta velocidad y largas distancias.
<figure>
  <img src="/redes/img/nicfibra.jpg" alt="nic fibra pcie" width="175" />
</figure>  

#### **Powerline (PLC)**
Transmiten datos a través de la red eléctrica, útiles en lugares sin cableado Ethernet.
<figure>
  <img src="/redes/img/plc.jpg" alt="nic plc" width="175" />
</figure>  

### **2. Adaptadores Virtuales**
Estos adaptadores son generados por software y permiten la conexión en entornos de virtualización o VPN.
- **Máquinas Virtuales:** VirtualBox, VMware, Hyper-V, Proxmox.
- **VPNs:** OpenVPN, WireGuard, SoftEther.
- **Switches virtuales:** Usados en redes definidas por software (SDN).

---

## MAC (Media Access Control)
Cada adaptador tiene una dirección **MAC**, única y asignada por el fabricante.  
Formato habitual: `00:1A:2B:3C:4D:5E`.  
Las direcciones MAC permiten identificar dispositivos en una red local.

---

## Puertos de Conexión
Los adaptadores pueden incluir distintos tipos de puertos:

### **Ethernet (RJ-45)**
- **10/100/1000 Mbps (Gigabit Ethernet)**
- **10 Gbps o más (10G/25G/40G Ethernet)**
<figure>
  <img src="/redes/img/ethernet.webp" alt="puerto ethernet" width="175" />
</figure>  

### **SFP/SFP+**
- Usan módulos intercambiables para fibra óptica o Ethernet.
<figure>
  <img src="/redes/img/sfp1.jpg" alt="rj45 to sfp" width="175" />
</figure>  
<figure>
  <img src="/redes/img/sfp2.jpg" alt="sfp" width="175" />
</figure>  

### **PoE (Power over Ethernet)**
- Transmite datos y energía por el mismo cable.
- Común en cámaras de seguridad, APs Wi-Fi y teléfonos IP.
- **Atención**: Diferentes voltajes y amperajes según el estándar.

---
