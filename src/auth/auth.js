import axios from 'axios';
import { saveSession } from './session.js';

const API_URL = 'http://localhost:3000/users';

export async function loginUser(email, password) {
  try {
    const { data: users } = await axios.get(`${API_URL}?email=${email}`);
    const user = users[0];

    if (!user) throw new Error('Usuario no encontrado');
    if (user.password !== password) throw new Error('Contraseña incorrecta');
    if (!user.is_active) throw new Error('Usuario inactivo');

    saveSession(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function registerUser(newUser) {
  try {
    // Verificar si ya existe el correo
    const { data: existingUsers } = await axios.get(`${API_URL}?email=${newUser.email}`);
    if (existingUsers.length > 0) {
      throw new Error('El correo ya está registrado');
    }

    // Valores por defecto
    newUser.is_active = true;
    newUser.role = 'user';

    const { data: createdUser } = await axios.post(API_URL, newUser);
    saveSession(createdUser);
    return { success: true, user: createdUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id, adminUsername) {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, {
      is_active: false,
      deleted_at: new Date().toISOString(),
      deleted_by: adminUsername
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar el usuario');
  }
}
