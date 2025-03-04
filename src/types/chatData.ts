export interface User {
  id: string;
  nickName: string;
  image: string;
}

export interface ChatRoom {
  id: string;
  createdAt: string;
  updatedAt: string;
  planId: string;
  planTitle: string;
  planTripDate: string;
  quotePrice: string;
  lastChat: string | null;
  isActive: boolean;
  users: User[];
}

export interface Message {
  id: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  chatRoomId: string;
  content: string | null;
  type?: string;
  isDeleted?: boolean;
}

export interface GetChatRoomsParams {
  page?: number;
  pageSize?: number;
}
export interface FormData {
  type: string;
  file: File;
}
