📚 Sistema de Alertas Académicas — Arquitectura Microfrontend

Implementación práctica de una arquitectura microfrontend donde distintos módulos de la interfaz funcionan de manera independiente, con estilos encapsulados y comunicación desacoplada, integrados a través de un Shell (Host).

🧩 Arquitectura del proyecto

El sistema está compuesto por tres aplicaciones independientes:

host/                 → Shell contenedor
mf-alert-sender/      → Microfrontend emisor de alertas
mf-alert-dashboard/   → Microfrontend visualizador de alertas


Cada aplicación se ejecuta en un puerto diferente, demostrando independencia real:

Aplicación	Puerto
Host	3000
Alert Sender	3001
Alert Dashboard	3002
🎯 Objetivo

Demostrar:

Implementación de arquitectura microfrontend

Encapsulamiento de estilos con styled-components

Comunicación desacoplada entre microfrontends

Host sin lógica de negocio

🎨 Encapsulamiento de estilos

Todos los estilos de los microfrontends están implementados exclusivamente con:

styled-components


No se utiliza ningún archivo CSS global (index.css, App.css, etc.), garantizando que:

Los estilos están aislados dentro de cada microfrontend

No existen interferencias visuales entre módulos

🔌 Comunicación desacoplada

La comunicación entre microfrontends se realiza mediante el mecanismo postMessage del navegador.

Flujo de comunicación:

Alert Sender envía una alerta al Host usando:

window.parent.postMessage(...)


Host actúa como un bus de mensajes y reenvía el mensaje al Dashboard.

Alert Dashboard escucha el mensaje y actualiza su estado.

Ningún microfrontend importa código del otro.
Solo comparten un contrato de mensajes.

🧠 Rol del Host (Shell)

El Host:

Carga los microfrontends mediante iframes

Provee la estructura visual

Distribuye mensajes entre microfrontends

No contiene lógica de negocio

🎨 Comportamiento visual del Dashboard

Según el tipo de alerta recibida:

Tipo	Color
Examen	Azul
Tarea	Verde
Cancelación	Rojo

La actualización ocurre de forma inmediata y sin recargar la página.

▶️ Cómo ejecutar el proyecto

En cada carpeta:

1) Instalar dependencias
npm install

2) Ejecutar cada aplicación
npm run dev


Abrir en el navegador:

Host: http://localhost:3000
