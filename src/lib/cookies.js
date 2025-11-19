import { cookies } from "next/headers";

const EXPIRE_TIME = 3600 * 1000 // 1 hour


export async function getCookie(name) {
  const cookieStore = await cookies()      // IMPORTANTE: await cookies(), a partir de NextJS 15
  const session = cookieStore.get(name)?.value;

  if (!session) return null;
  const parsedSession = await JSON.parse(session);
  // Remove the expires field before returning the session
  const { expires, ...userData } = parsedSession;
  return userData;
}



export async function setCookie(name, value) {
  const expires = new Date(Date.now() + EXPIRE_TIME)
  const cookieStore = await cookies()
 
  cookieStore.set({
    name: name,
    value: JSON.stringify({ ...value, expires }),
    expires,
    httpOnly: true,
  })
}


// Devolvemos cookie con nuevo tiempo de expiración
export function updateCookie(name, value) {
  const expires = new Date(Date.now() + EXPIRE_TIME)

  return {
    name: name,
    value: JSON.stringify({ ...value, expires }),
    expires,
    httpOnly: true,
  }
}


export async function deleteCookie(name) {
  const cookieStore = await cookies()
 
  cookieStore.set({
    name,
    value: "",
    maxAge: 0,
    httpOnly: true
  });
}
