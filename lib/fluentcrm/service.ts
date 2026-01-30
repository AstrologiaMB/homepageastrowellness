/**
 * FluentCRM Service
 * High-level functions for syncing users to FluentCRM
 */

import { FluentCRMClient } from './client';

interface UserData {
  email: string;
  name?: string | null;
}

/**
 * Parse a full name into first and last name
 */
function parseName(fullName?: string | null): { firstName: string; lastName: string } {
  if (!fullName || fullName.trim() === '') {
    return { firstName: '', lastName: '' };
  }

  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';

  return { firstName, lastName };
}

/**
 * Sync a user to FluentCRM
 * Creates a subscriber and adds them to the "astrochat" list
 */
export async function syncUserToFluentCRM(user: UserData): Promise<void> {
  const client = new FluentCRMClient();
  const { firstName, lastName } = parseName(user.name);

  // Single API call - list ID is hardcoded
  await client.createSubscriber({
    email: user.email,
    first_name: firstName || undefined,
    last_name: lastName || undefined,
    status: 'subscribed',
    lists: [client.getListId()],
  });

  console.log(`[FluentCRM] Synced user ${user.email}`);
}
