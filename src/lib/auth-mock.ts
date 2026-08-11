
export const MOCK_USER_ID = "00000000-0000-0000-0000-000000000001";

/**
 * Retorna el ID del usuario actual.
 * En Fases 1 a 4 devuelves el mock.
 * En Fase 5 este helper se reemplaza por la sesión de Auth.js / NextAuth.
 */
export async function getMockUserId(): Promise<string> {
  return MOCK_USER_ID;
}
