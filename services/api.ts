const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface SendMessagePayload {
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  senderOrganization?: string;
  receiverName?: string;
  contact: string;
  subject?: string;
  message: string;
}

export interface MessageRecord {
  _id: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string | null;
  senderOrganization?: string | null;
  receiverName?: string | null;
  contact: string;
  contactType: 'email' | 'mobile';
  subject?: string;
  message: string;
  status: 'sent' | 'failed';
  errorDetails?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

/**
 * Send a message (email or SMS) via the backend API
 */
export const sendMessage = async (
  payload: SendMessagePayload
): Promise<ApiResponse<MessageRecord>> => {
  const response = await fetch(`${API_BASE_URL}/api/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data: ApiResponse<MessageRecord> = await response.json();
  return data;
};

/**
 * Retrieve message history from the backend
 */
export const getMessages = async (): Promise<
  ApiResponse<MessageRecord[]>
> => {
  const response = await fetch(`${API_BASE_URL}/api/messages`);
  const data: ApiResponse<MessageRecord[]> = await response.json();
  return data;
};
