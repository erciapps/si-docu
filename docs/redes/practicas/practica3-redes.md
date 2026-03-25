---
sidebar_position: 3
---

# Práctica 3. VLANS

<figure>
  <img src="/redes/img/practica_ok.png" alt="Esquema red" width="500" />
</figure>


### Comandos

````shell
enable
configure terminal

! Crear las VLANs si no existen aún
vlan 10
 name VLAN10
exit
vlan 20
 name VLAN20
exit
vlan 30
 name VLAN30
exit
vlan 40
 name VLAN40
exit
vlan 999
 name VLAN_GESTION
exit

! ---------- Puertos Access ----------
! Puertos del 3 al 12 → Access VLAN 10
interface range FastEthernet0/3 - 12
 description Alumnos VLAN10
 switchport mode access
 switchport access vlan 10
 switchport nonegotiate
exit

! Puertos del 13 al 22 → Access VLAN 20
interface range FastEthernet0/13 - 22
 description Alumnos VLAN20
 switchport mode access
 switchport access vlan 20
 switchport nonegotiate
exit

! ---------- Puertos Trunk ----------
! Puertos 23 y 24 → Trunk VLANs 30, 40
interface range FastEthernet0/23 - 24
 description Trunk salida VLANs 30, 40
 switchport mode trunk
 switchport trunk allowed vlan 30,40
exit

! Guardar cambios
end
write memory
````