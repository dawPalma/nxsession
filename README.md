# Uso de cookies y gestión de sesión
**Aplicación de ejemplo de uso de cookies y gestión de sesión**

> [!NOTE]
>
> Aplicación actualizada a Next.js 16. 

Para ejecutar la aplicación en local seguir los siguientes pasos:

```
git  clone  https://github.com/dawPalma/nxsession.git
cd  nxsession
npm  install
npm  run  dev
```

Para iniciar sesión puedes usar las siguientes credenciales:

|            | usuario1 | usuario2 |
| ---------- | -------- | -------- |
| Nombre     | **pepe** | **admin**  |
| Contraseña | **pepe** | **adminpassword**  |



## Ejemplo de uso de cookies

```js
// A partir de NextJS 15, el acceso a cookies es asíncrono

import { cookies } from 'next/headers'
 
export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```