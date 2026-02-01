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
 * Creates a subscriber if not exists, or adds to list if already exists
 */
export async function syncUserToFluentCRM(user: UserData): Promise<void> {
  const client = new FluentCRMClient();
  const { firstName, lastName } = parseName(user.name);

  // Use syncSubscriber which handles the case when the subscriber already exists
  const result = await client.syncSubscriber({
    email: user.email,
    first_name: firstName || undefined,
    last_name: lastName || undefined,
    status: 'subscribed',
    lists: [client.getListId()],
  });

  const action = result.message === 'Added to lists' ? 'added to list' : 'created';
  console.log(`[FluentCRM] User ${user.email} ${action}`);
}
