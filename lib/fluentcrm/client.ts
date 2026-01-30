/**
 * FluentCRM API Client
 * Hardcoded credentials - TODO: move to env variables later
 */

import type {
  FluentCRMList,
  FluentCRMListsResponse,
  CreateSubscriberData,
  FluentCRMSubscriberResponse,
} from './types';

// Hardcoded config - move to env variables later
const CONFIG = {
  baseUrl: 'https://mariablaquier.com/wp-json/fluent-crm/v2',
  username: 'lsmnvll',
  password: 'UhL2 ZPXG Gg5q HJjA 3BfU r2PE',
  listId: 358, // "astrochat" list - hardcoded since it always exists
};

export class FluentCRMClient {
  private baseUrl: string;
  private authHeader: string;

  constructor() {
    this.baseUrl = CONFIG.baseUrl;
    const auth = Buffer.from(`${CONFIG.username}:${CONFIG.password}`).toString('base64');
    this.authHeader = `Basic ${auth}`;
  }

  /**
   * Make authenticated request to FluentCRM API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': this.authHeader,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`FluentCRM API error ${response.status}: ${errorText}`);
    }

    return response.json();
  }

  /**
   * Get all lists, optionally filtered by search term
   */
  async getLists(search?: string): Promise<FluentCRMList[]> {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search);
    }

    const queryString = params.toString();
    const endpoint = `/lists${queryString ? `?${queryString}` : ''}`;

    const response = await this.request<FluentCRMListsResponse>(endpoint);
    return response.lists || [];
  }

  /**
   * Create a new list
   */
  async createList(title: string, slug?: string): Promise<FluentCRMList> {
    const response = await this.request<{ list: FluentCRMList }>('/lists', {
      method: 'POST',
      body: JSON.stringify({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      }),
    });

    return response.list;
  }

  /**
   * Create a new subscriber
   */
  async createSubscriber(data: CreateSubscriberData): Promise<FluentCRMSubscriberResponse> {
    return this.request<FluentCRMSubscriberResponse>('/subscribers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get the hardcoded list ID for "astrochat"
   */
  getListId(): number {
    return CONFIG.listId;
  }
}
