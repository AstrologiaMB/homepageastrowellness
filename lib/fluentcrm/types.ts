/**
 * FluentCRM API Types
 */

export interface FluentCRMList {
  id: number;
  title: string;
  slug: string;
  description?: string;
  is_public?: number;
  subscribers_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FluentCRMSubscriber {
  id: number;
  user_id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  status: 'subscribed' | 'pending' | 'unsubscribed' | 'bounced' | 'complained';
  contact_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSubscriberData {
  email: string;
  first_name?: string;
  last_name?: string;
  status: 'subscribed' | 'pending';
  lists?: number[];
}

export interface FluentCRMListsResponse {
  lists: FluentCRMList[];
  pagination?: {
    total: number;
  };
}

export interface FluentCRMSubscriberResponse {
  subscriber?: FluentCRMSubscriber;
  message?: string;
}
