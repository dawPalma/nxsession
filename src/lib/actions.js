'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";
import fs from 'fs/promises';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'src', 'lib', 'users.json');
const users = JSON.parse(await fs.readFile(usersFilePath, 'utf8'));

export async function login(formData) {
  const LOGIN_URL = '/'

  // Obtener usuario datos del formulario
  const email = formData.get('email')
  const password = formData.get('password')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  // Comprobar si credenciales son válidas
  const foundUser = users.find(user => email === user.email && password === user.password);

  if (!foundUser) {
    return;
  }

  // Si hay autenticación correcta, creamos cookie de sesión
  await setCookie('session', { name: foundUser.name, email: foundUser.email })

  redirect(callbackUrl);
}



export async function logout() {
  // Eliminamos cookie de sesión
  await deleteCookie('session')

  // redirect("/");   // No recarga si ya estamos en esta página

  // Hack to reload page! https://github.com/vercel/next.js/discussions/49345#discussioncomment-6120148
  redirect('/?' + Math.random())

}


