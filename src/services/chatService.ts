import { ChatRoom, Messagge, User } from "@/types/chatData";
import { api } from "./api";
import { io, Socket } from "socket.io-client";

const chatService = {
  getChatRooms: async (page: number = 1, pageSize: number = 5): Promise<ChatRoom[]> => {
    try {
      const response = await api.get<{ totalCount: number; list: any[] }, Record<string, unknown>>(
        `/chatRooms?page=${page}&pageSize=${pageSize}`,
      );

      const chatRooms = response.list.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        planId: item.planId,
        planTitle: item.planTitle,
        planTripDate: item.planTripDate,
        quotePrice: item.quotePrice,
        lastChat: item.lastChat,
        isActive: item.isActive,
        users: item.users.map((user: User) => ({
          id: user.id,
          nickName: user.nickName,
          image: user.image,
        })),
      }));

      return chatRooms;
    } catch (error) {
      console.error("채팅방 목록 get 실패", error);
      throw error;
    }
  },
  getMessages: async (
    chatRoomId: string,
    page: number = 1,
    pageSize: number = 5,
  ): Promise<Messagge[]> => {
    try {
      const response = await api.get<{ totalCount: number; list: any[] }, Record<string, unknown>>(
        `/chatRooms/${chatRoomId}/chats?page=${page}&pageSize=${pageSize}`,
      );

      const messages = response.list.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        senderId: item.senderId,
        chatRoomId: item.chatRoomId,
        content: item.content,
      }));

      return messages;
    } catch (error) {
      console.error("메시지 목록 get 실패", error);
      throw error;
    }
  },
  connectWebSocket: (token: string, onMessage: (message: Messagge) => void) => {
    const socket = io(process.env.NEXT_PUBLIC_WEB_URL, {
      transports: ["websocket"],
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    });

    socket.on("ServerToClientMessage", (newMessage: Messagge) => {
      onMessage(newMessage);
    });

    socket.on("connect", () => {
      console.log("웹소켓 연결 성공 ✅");
    });

    socket.on("disconnect", () => {
      console.log("웹소켓 연결 종료 ❌");
    });

    return socket;
  },
  sendMessage: (socket: Socket, chatRoomId: string, content: string) => {
    socket.emit("ClientToServerMessage", {
      chatRoomId,
      content,
    });
  },
};

export default chatService;
