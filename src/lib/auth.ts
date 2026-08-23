
export const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

/**
 * Retorna el ID del usuario actual.
 * se reemplaza por la sesión de Auth.js / NextAuth.
 */
export async function getUserId(): Promise<string> {
  return MOCK_USER_ID;
}

