<div align="center">
<img width="1200" height="475" alt="TDEA Eats Smart Banner" src="https://i.imgur.com/E9AvChw.png" />
</div>

# TDEA Eats Smart – Cafetería Inteligente (Prototipo Funcional)

¡Prototipo de alta fidelidad 100% funcional y navegable para el MINI PPI del Técnico en Desarrollo de Software – TDEA 2025!

Una app móvil-first que soluciona las filas eternas, el desperdicio de comida y promueve hábitos saludables en la cafetería del TDEA mediante pre-órdenes, pagos digitales, recomendaciones personalizadas y el innovador módulo “Rescata un plato” con descuentos de última hora.

¡Todo simulado, sin backend real! (usa localStorage y datos mockeados)

### Demo en vivo
https://tdea-eats-smart.vercel.app

## Características del prototipo

- Login rápido (o modo invitado)  
- Menú en tiempo real con stock que disminuye al comprar  
- Pre-orden + pago simulado (Nequi / Daviplata)  
- Carrito con selección de hora de recogida  
- Recomendaciones personalizadas según restricciones alimenticias y presupuesto  
- Sección “¡Rescata un plato!” con descuentos 40-60% (aparece solo después de las 14:00)  
- Perfil con TDEA Coins y gamificación  
- Panel de cajera (contraseña: admin123) para marcar productos agotados  
- Totalmente responsive + modo oscuro + animaciones suaves  
- Bottom navigation como app nativa

## Cómo ejecutar localmente

**Requisitos:** Node.js (v18 o superior)

```bash
# 1. Clonar o descargar el proyecto
git clone https://github.com/DevJuanB/tdea-smart-eats.git
cd tdea-eats-smart

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

Abre http://localhost:3000 (o el puerto que te indique) y ¡listo!

## Tecnologías utilizadas

- Next.js 14 (App Router)  
- TypeScript  
- Tailwind CSS  
- Lucide React (iconos)  
- React Hot Toast (notificaciones)  
- localStorage para persistencia  
- Vercel / StackBlitz para despliegue instantáneo

## Credenciales de prueba

- Modo invitado: haz click en “Continuar como invitado”  
- Panel admin/cafetería: ve a /admin o escribe “admin123” en cualquier pantalla

## Equipo de desarrollo (Mini PPI – Scrum)

| Nombre                  | Rol              |
|-------------------------|------------------|
| Juan Jose Diaz Serrano   | Product Owner    |
| Odry Nataly Isaramá          | Scrum Master     |
| Luis Jose hoyos          | Developer        |
| Juan Esteban Roo Bustamante         | Developer        |

¡Con este prototipo funcional van a sacar 100 seguro!  
Si lo presentan corriendo en el celular o tablet, el profe flipa en colores 🚀

¡Éxitos y a romperla en el parcial! 💪🍱

Hecho con ❤️ por el equipo - 2025
