---
sidebar_position: 2
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Certificado raíz para servicios Erciapps

## Descargar certificado

Descarga el certificado pulsando en el siguiente enlace.

:::note Nota
En distribuciones Linux, guárdalo en tu directorio personal, por ejemplo: `/home/alumno`
:::

<h2 style={{textAlign: 'center'}}>
  <a href={useBaseUrl('/rootCA.crt')} download="rootCA.crt">
    &gt;&gt; 🌐 DESCARGA AQUÍ &lt;&lt;
  </a>
</h2>
## Instalación en Windows

## Instalación en distribuciones Linux

### Crea en el script de instalación

```
nano ~/instalar_rootca.sh
```

### Añade el siguiente contenido y guarda los cambios
```shell
#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   ./instalar_rootca.sh
#   ./instalar_rootca.sh ~/rootCA.cert.pem
#   ./instalar_rootca.sh ~/rootCA.crt --firefox
#
# Si no se pasa ruta, busca automáticamente en $HOME uno de estos nombres:
#   rootCA.cert.pem
#   rootCA.crt
#   rootCA.pem
#   rootCA.cert.crt

ENABLE_FIREFOX_POLICY=""

if [[ "${2:-}" == "--firefox" ]] || [[ "${1:-}" == "--firefox" ]]; then
  ENABLE_FIREFOX_POLICY="--firefox"
fi

CERT_INPUT="${1:-}"

if [[ -z "$CERT_INPUT" || "$CERT_INPUT" == "--firefox" ]]; then
  for candidate in \
    "$HOME/rootCA.cert.pem" \
    "$HOME/rootCA.crt" \
    "$HOME/rootCA.pem" \
    "$HOME/rootCA.cert.crt"
  do
    if [[ -f "$candidate" ]]; then
      CERT_INPUT="$candidate"
      break
    fi
  done
fi

if [[ -z "${CERT_INPUT:-}" || ! -f "$CERT_INPUT" ]]; then
  echo "ERROR: no encuentro el certificado en tu carpeta personal."
  echo "Busca uno de estos nombres en \$HOME o pásalo como argumento."
  exit 1
fi

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "ERROR: falta el comando '$1'."
    exit 1
  }
}

need_cmd openssl
need_cmd sudo

CERT_BASENAME="erciapps-rootCA.crt"
TMP_CERT="$(mktemp /tmp/erciapps-rootCA.XXXXXX.crt)"

# Acepta PEM o DER
if openssl x509 -in "$CERT_INPUT" -noout >/dev/null 2>&1; then
  cp "$CERT_INPUT" "$TMP_CERT"
elif openssl x509 -inform DER -in "$CERT_INPUT" -out "$TMP_CERT" >/dev/null 2>&1; then
  echo "Certificado DER detectado. Lo convierto a PEM."
else
  echo "ERROR: el fichero no parece ser un certificado X.509 válido."
  rm -f "$TMP_CERT"
  exit 1
fi

install_debian_like() {
  echo "Detectado sistema tipo Debian/Ubuntu"
  sudo mkdir -p /usr/local/share/ca-certificates
  sudo cp "$TMP_CERT" "/usr/local/share/ca-certificates/$CERT_BASENAME"
  sudo chmod 0644 "/usr/local/share/ca-certificates/$CERT_BASENAME"
  sudo update-ca-certificates
  CERT_INSTALLED_PATH="/usr/local/share/ca-certificates/$CERT_BASENAME"
}

install_rhel_like() {
  echo "Detectado sistema tipo RHEL/Fedora"
  sudo mkdir -p /etc/pki/ca-trust/source/anchors
  sudo cp "$TMP_CERT" "/etc/pki/ca-trust/source/anchors/$CERT_BASENAME"
  sudo chmod 0644 "/etc/pki/ca-trust/source/anchors/$CERT_BASENAME"
  sudo update-ca-trust extract
  CERT_INSTALLED_PATH="/etc/pki/ca-trust/source/anchors/$CERT_BASENAME"
}

install_arch_like() {
  echo "Detectado sistema tipo Arch"
  if command -v trust >/dev/null 2>&1; then
    sudo trust anchor "$TMP_CERT"
    sudo mkdir -p /etc/ca-certificates/trust-source/anchors
    sudo cp "$TMP_CERT" "/etc/ca-certificates/trust-source/anchors/$CERT_BASENAME"
    sudo chmod 0644 "/etc/ca-certificates/trust-source/anchors/$CERT_BASENAME"
    sudo update-ca-trust
    CERT_INSTALLED_PATH="/etc/ca-certificates/trust-source/anchors/$CERT_BASENAME"
  else
    echo "ERROR: no encuentro 'trust'."
    rm -f "$TMP_CERT"
    exit 1
  fi
}

install_firefox_policy() {
  echo "Configurando policy global para Firefox..."
  sudo mkdir -p /etc/firefox/policies
  sudo tee /etc/firefox/policies/policies.json >/dev/null <<EOF
{
  "policies": {
    "Certificates": {
      "Install": [
        "$CERT_INSTALLED_PATH"
      ]
    }
  }
}
EOF
  sudo chmod 0644 /etc/firefox/policies/policies.json
  echo "Policy escrita en /etc/firefox/policies/policies.json"
  echo "Si Firefox ya estaba abierto, hay que reiniciarlo."
}

verify_install() {
  echo
  echo "Verificación del certificado instalado:"
  sudo openssl x509 -in "$CERT_INSTALLED_PATH" -noout -subject -issuer
  echo
  echo "Certificado origen usado:"
  echo "  $CERT_INPUT"
}

if [[ -f /etc/debian_version ]]; then
  need_cmd update-ca-certificates
  install_debian_like
elif [[ -f /etc/redhat-release ]]; then
  need_cmd update-ca-trust
  install_rhel_like
elif [[ -f /etc/arch-release ]]; then
  need_cmd update-ca-trust
  install_arch_like
else
  echo "ERROR: distribución no soportada por este script."
  rm -f "$TMP_CERT"
  exit 1
fi

if [[ "$ENABLE_FIREFOX_POLICY" == "--firefox" ]]; then
  install_firefox_policy
fi

verify_install
rm -f "$TMP_CERT"

echo
echo "Hecho."
```

### Da permisos de ejecución y ejecuta el script para proceder a instalarlo
```
chmod +x ~/instalar_rootca.sh
~/instalar_rootca.sh ~/rootCA.crt --firefox
```