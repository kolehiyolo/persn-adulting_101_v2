// ==============================
// 🆔 id.ts
// Utility for generating unique IDs
// ==============================

import { randomUUID } from 'crypto';

/**
 * Generates a unique ID with an optional prefix.
 * 
 * Examples:
 *  - generateId() → "6c2f72a4-b2a1-4a98-b8f8-55a89a5b4372"
 *  - generateId("acct") → "acct_6c2f72a4-b2a1-4a98-b8f8-55a89a5b4372"
 */
export function generateId(prefix?: string): string {
  const id = randomUUID();
  return prefix ? `${prefix}_${id}` : id;
}

/**
 * Type-safe ID generators for specific entities.
 * 
 * These are just convenient wrappers around generateId().
 */
export const Id = {
  account: () => generateId('acct'),
  category: () => generateId('cat'),
  recurringTransaction: () => generateId('rtxn'),
  oneTimeTransaction: () => generateId('txn'),
};