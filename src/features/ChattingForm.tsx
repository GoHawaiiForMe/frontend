import Layout from "@/components/Common/Layout";
import Image from "next/image";
import Bubble from "@/components/Common/Bubble";
import { useEffect, useState } from "react";
import { ChatRoom, Messagge } from "@/types/chatData";
import chatService from "@/services/chatService";
import avatarImages from "@/utils/formatImage";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/userService";
import { formatToDetailedDate } from "@/utils/formatDate";
import coconut from "@public/assets/icon_coconut.svg";
import { Socket } from "socket.io-client";

const getUserId = async (): Promise<string> => {
  const userInfo = await userService.getUserInfo();
  return userInfo.id;
};

export default function ChattingForm() {
  const [messages, setMessages] = useState<Messagge[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { data: userId = [] } = useQuery({
    queryKey: ["userId"],
    queryFn: getUserId,
  });

  const handleSendMessage = () => {
    if (message.trim() && socket && selectedChatRoom) {
      chatService.sendMessage(socket, selectedChatRoom.id, message);
      setMessage("");
    }
  };

  const fetchMessages = async (chatRoomId: string) => {
    try {
      const data = await chatService.getMessages(chatRoomId, 1, 5);
      setMessages(data);
    } catch (error) {
      console.error("메시지를 가져오는데 실패했습니다.", error);
    }
  };

  const renderMessages = () => {
    return messages
      .slice()
      .reverse()
      .map((msg) => (
        <Bubble key={msg.id} type={msg.senderId === userId ? "right" : "left_say"}>
          {msg.content}
        </Bubble>
      ));
  };

  const handleChatRoomClick = (chatRoom: ChatRoom) => {
    setSelectedChatRoom(chatRoom);
    fetchMessages(chatRoom.id);
  };

  useEffect(() => {
    const getChatRooms = async () => {
      try {
        const data = await chatService.getChatRooms();
        setChatRooms(data);
      } catch (error) {
        console.error("채팅방을 가져오는데 실패했습니다.", error);
      }
    };
    getChatRooms();
  }, []);

  // 웹소켓 연결 부분
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const newSocket = chatService.connectWebSocket(accessToken, (newMessage: Messagge) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, []);

  return (
    <>
      <div className="-mx-[260px] bg-color-gray-50 py-6 mobile-tablet:mb-5 card:mb-5">
        <p className="semibold pl-[260px] text-xl">메시지</p>
      </div>
      <Layout bodyClass="bg-gray">
        <div className="gap-4 overflow-x-auto rounded-xl border border-color-line-200 bg-color-gray-50 p-4 pc:hidden mobile-tablet:flex card:flex">
          {chatRooms.length === 0 ? (
            <p>채팅방 목록이 없습니다.</p>
          ) : (
            chatRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleChatRoomClick(room)}
                className="flex cursor-pointer flex-col"
              >
                <Image
                  src={avatarImages.find((avatar) => avatar.key === room.users[1]?.image)?.src}
                  alt="유저"
                  width={70}
                  className="rounded-full"
                />
                <p className="bold mt-3 text-center">{room.users[1]?.nickName}</p>
              </div>
            ))
          )}
        </div>
        <div className="grid h-[920px] grid-cols-7 gap-10 pt-4 mobile-tablet:pt-5">
          {/* 채팅방 목록 */}
          <div className="col-span-2 flex flex-col gap-4 overflow-y-auto rounded-xl bg-color-gray-50 p-8 mobile-tablet:hidden card:hidden">
            {chatRooms.length === 0 ? (
              <p>채팅방 목록이 없습니다.</p>
            ) : (
              chatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => handleChatRoomClick(room)}
                  className="flex cursor-pointer gap-4 rounded-xl border border-color-line-100 p-4"
                >
                  <div>
                    <Image
                      src={avatarImages.find((avatar) => avatar.key === room.users[1]?.image)?.src}
                      alt="유저"
                      width={70}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>{room.users[1]?.nickName}</p>
                    <p className="line-clamp-2">{room.lastChat}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* 채팅창 */}
          <div className="col-span-5 rounded-xl bg-color-gray-50 p-8 mobile-tablet:col-span-7 card:col-span-7">
            {selectedChatRoom === null ? (
              ""
            ) : (
              <div className="mb-4 rounded-lg border border-color-line-100 p-4">
                <p className="semibold text-2xl text-color-black-300 mobile-tablet:text-xl">
                  {selectedChatRoom?.planTitle}
                </p>
                <div className="flex gap-4">
                  <p className="regular text-xl text-color-gray-500 mobile-tablet:text-2lg">
                    여행일
                  </p>
                  <p className="medium text-color-balck-400 text-xl mobile-tablet:text-2lg">
                    {formatToDetailedDate(selectedChatRoom?.planTripDate || "")}
                  </p>
                  <div className="flex flex-row">
                    <p className="regular text-xl text-color-gray-500 mobile-tablet:text-2lg">
                      플랜가
                    </p>
                    <Image src={coconut} alt="코코넛" width={30} />
                  </div>
                  <p className="medium text-color-balck-400 text-xl mobile-tablet:text-2lg">
                    {selectedChatRoom?.quotePrice} P
                  </p>
                </div>
              </div>
            )}
            <div className="h-[600px] mobile-tablet:h-[650px]">{renderMessages()}</div>
            <div className="flex flex-col gap-5">
              <input
                className="h-16 w-full rounded-xl bg-color-background-200 indent-5 text-color-black-500 outline-none mobile-tablet:h-10"
                placeholder="텍스트를 입력해 주세요."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <div className="flex justify-between">
                <button className="rounded-xl border border-color-blue-300 bg-color-blue-100 px-6 py-3 text-lg text-color-blue-300 mobile-tablet:px-4 mobile-tablet:py-1">
                  첨부파일
                </button>
                <button
                  onClick={handleSendMessage}
                  className="rounded-xl bg-color-blue-300 px-6 py-3 text-lg text-color-gray-50 mobile-tablet:px-4 mobile-tablet:py-1"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
