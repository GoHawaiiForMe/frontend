import Layout from "@/components/Common/Layout";
import Image from "next/image";
import Bubble from "@/components/Common/Bubble";
import { useEffect, useRef, useState } from "react";
import { ChatRoom, Message } from "@/types/chatData";
import chatService from "@/services/chatService";
import avatarImages from "@/utils/formatImage";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/userService";
import { formatToDetailedDate } from "@/utils/formatDate";
import coconut from "@public/assets/icon_coconut.svg";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const getUserId = async (): Promise<string> => {
  const userInfo = await userService.getUserInfo();
  return userInfo.id;
};

export default function ChattingForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [page, setPage] = useState(1);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { data: userId = [] } = useQuery({
    queryKey: ["userId"],
    queryFn: getUserId,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && socket && selectedChatRoom) {
      const newMessage = {
        id: uuidv4(),
        senderId: Array.isArray(userId) ? userId[0] : userId,
        chatRoomId: selectedChatRoom.id,
        content: message,
        file: file ? file.name : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setMessages((prevMessages) => [newMessage, ...prevMessages]);
      chatService.sendMessage(socket, selectedChatRoom.id, message);
      setMessage("");
      handleFileRemove();
    }
  };

  // 스크롤 관련
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const scrollBrowserToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0 && selectedChatRoom) {
        setPage((prevPage) => prevPage + 1);
        if (selectedChatRoom) {
          fetchMessages(selectedChatRoom.id, page + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messagesContainerRef, page]);

  const fetchMessages = async (chatRoomId: string, page: number, isOldMessages = false) => {
    try {
      const data = await chatService.getMessages(chatRoomId, page, 10);
      setMessages((prevMessages) => {
        const newMessages = data.filter(
          (msg) => !prevMessages.some((existingMsg) => existingMsg.id === msg.id),
        );
        if (isOldMessages) {
          return [...newMessages, ...prevMessages];
        } else {
          return [...prevMessages, ...newMessages];
        }
      });

      if (!isOldMessages) {
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      } else {
        maintainScrollPosition();
      }
    } catch (error) {
      console.error("메시지를 가져오는데 실패했습니다.", error);
    }
  };

  const maintainScrollPosition = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      requestAnimationFrame(() => {
        messagesContainerRef.current!.scrollTop = scrollHeight - clientHeight;
      });
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

  const handleChatRoomClick = async (chatRoom: ChatRoom) => {
    setSelectedChatRoom(chatRoom);
    setMessages([]);
    await fetchMessages(chatRoom.id, 1, false);

    scrollToBottom();
    scrollBrowserToBottom();
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
      const newSocket = chatService.connectWebSocket(accessToken, (newMessage: Message) => {
        setMessages((prevMessages) => {
          if (!prevMessages.find((msg) => msg.id === newMessage.id)) {
            return [newMessage, ...prevMessages];
          }
          return prevMessages;
        });
      });
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (selectedChatRoom) {
      fetchMessages(selectedChatRoom.id, 1, false);
    }
  }, [selectedChatRoom]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
      scrollBrowserToBottom();
    }
  }, [messages]);

  //이미지
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFilePreview(fileUrl);

      e.target.value = "";
    }
  };
  const handleFileRemove = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setFilePreview(null);
    setFile(null);
  };

  const renderFilePreview = () => {
    if (!filePreview) return null;

    const fileExtension = file?.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
      return (
        <div className="relative h-auto w-full">
          <img src={filePreview} alt="file-preview" className="h-auto w-28 rounded-lg" />
          <button
            onClick={handleFileRemove}
            className="absolute left-[85px] top-1 rounded-full bg-color-red-200 px-2 text-color-gray-50 hover:bg-color-red-100"
          >
            <p>x</p>
          </button>
        </div>
      );
    } else if (fileExtension === "mp4" || fileExtension === "mov") {
      return (
        <div className="relative h-auto w-full">
          <video controls className="h-auto w-full rounded-lg">
            <source src={filePreview} type={`video/${fileExtension}`} />
          </video>
          <button
            onClick={handleFileRemove}
            className="absolute right-2 top-2 rounded-full bg-white p-2 text-color-red-200 hover:bg-gray-200"
          >
            <span className="text-xl">×</span>
          </button>
        </div>
      );
    } else {
      return <p>지원되지 않는 파일 형식입니다.</p>;
    }
  };

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
                className={`flex cursor-pointer flex-col rounded-lg p-3 ${selectedChatRoom?.id === room.id ? "bg-color-blue-100" : "bg-color-gray-50"}`}
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
                  className={`flex cursor-pointer gap-4 rounded-xl border border-color-line-100 p-4 ${selectedChatRoom?.id === room.id ? "bg-color-blue-100" : "bg-white"}`}
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
            <div
              className="h-[600px] overflow-y-auto mobile-tablet:h-[650px]"
              ref={messagesContainerRef}
            >
              {renderMessages()}
            </div>
            <div className="flex flex-col gap-5" ref={messagesEndRef}>
              <input
                className="h-16 w-full rounded-xl bg-color-background-200 indent-5 text-color-black-500 outline-none mobile-tablet:h-10"
                placeholder="텍스트를 입력해 주세요."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyDown={handleKeyDown}
              />

              <div className="flex justify-between">
                <input type="file" className="hidden" id="fileUpload" onChange={handleFileChange} />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer rounded-xl border border-color-blue-300 bg-color-blue-100 px-6 py-3 text-lg text-color-blue-300 mobile-tablet:px-4 mobile-tablet:py-1"
                >
                  첨부파일
                </label>

                <button
                  onClick={handleSendMessage}
                  className="rounded-xl bg-color-blue-300 px-6 py-3 text-lg text-color-gray-50 mobile-tablet:px-4 mobile-tablet:py-1"
                >
                  전송
                </button>
              </div>
              {filePreview && <div className="mb-3 mt-3">{renderFilePreview()}</div>}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
