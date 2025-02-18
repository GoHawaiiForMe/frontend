import { ChatRoom, Message, User } from "@/types/chatData";
import { api } from "./api";
import { io, Socket } from "socket.io-client";
import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND } from "@/utils/errorStatus";

interface FileUploadResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  type?: "IMAGE" | "VIDEO" | "TEXT";
  chatRoomId: string;
  content: string;
}

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
      console.error("채팅방 목록 조회에 실패했습니다.", error);
      throw error;
    }
  },
  getMessages: async (
    chatRoomId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Message[]> => {
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
        type: item.type,
        isDeleted: item.isDeleted,
      }));
      return messages;
    } catch (error: any) {
      if (error.response && error.response.status === FORBIDDEN) {
        throw new Error("해당 채팅방 유저가 아닙니다.");
      } else {
        throw new Error("해당 채팅방이 없습니다.");
      }
    }
  },
  connectWebSocket: (
    token: string,
    onMessage: (message: Message) => void,
    onError: (error: { statusCode: number; message: string }) => void,
  ) => {
    const socket = io(process.env.NEXT_PUBLIC_WEB_URL, {
      transports: ["websocket"],
      auth: {
        token: `${token}`,
      },
    });

    socket.on("ServerToClientMessage", (newMessage: Message) => {
      onMessage(newMessage);
    });

    socket.on("ERROR", (error: { statusCode: number; message: string }) => {
      onError(error);
      console.error(`에러발생! ${error.message}`);
    });

    socket.on("connect", () => {
      console.log("웹소켓 연결 성공 ✅");
    });

    socket.on("disconnect", () => {
      console.log("웹소켓 연결 종료 ❌");
    });

    return socket;
  },
  sendMessage: (socket: Socket, chatRoomId: string, content: string, type: string) => {
    socket.emit("ClientToServerMessage", {
      chatRoomId,
      type,
      content,
    });
  },

  fileUpload: async (chatRoomId: string, formData: globalThis.FormData) => {
    try {
      const response = await api.post<FileUploadResponse, any>(
        `/chatRooms/${chatRoomId}/chats`,
        formData,
        false,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const {
        id,
        createdAt,
        updatedAt,
        senderId,
        type: fileType,
        chatRoomId: roomId,
        content,
      } = response;

      return {
        id,
        createdAt,
        updatedAt,
        senderId,
        type: fileType,
        chatRoomId: roomId,
        content,
      };
    } catch (error) {
      console.error("파일 업로드 실패", error);
      throw error;
    }
  },
  deleteMessage: async (chatId: string) => {
    try {
      const response = await api.delete(`/chats/${chatId}`);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === NOT_FOUND) {
        throw new Error("해당 채팅은 이미 삭제되었거나 없는 채팅입니다.");
      } else if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("해당 채팅방은 비활성화가 되었습니다.");
      } else if (error.response && error.response.status === CONFLICT) {
        throw new Error("이미 삭제된 메시지입니다.");
      }
    }
  },
  downloadFile: async (chatId: string) => {
    try {
      const response = await api.get(`/chats/${chatId}/downloadFile`);
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === NOT_FOUND) {
        throw new Error("내용이 없습니다.");
      } else if (error.response && error.response.status === BAD_REQUEST) {
        throw new Error("텍스트이거나 삭제된 메시지입니다.");
      } else if (error.response && error.response.status === FORBIDDEN) {
        throw new Error("본인이 속한 채팅방이 아닙니다.");
      }
    }
  },
};

export default chatService;
