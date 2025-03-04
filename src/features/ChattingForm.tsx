import Layout from "@/components/Common/Layout/Layout";
import Bubble from "@/components/Common/UI/Bubble";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatRoom, Message } from "@/types/chatData";
import { getAccessToken } from "@/utils/tokenUtils";
import { formatToDetailedDate } from "@/utils/formatDate";
import chatService from "@/services/chatService";
import userService from "@/services/userService";
import avatarImages from "@/utils/formatImage";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import loading from "@public/assets/icon_loading.gif";
import download from "@public/assets/icon_download.png";
import coconut from "@public/assets/icon_coconut.svg";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const DELETE_TIME = 5 * 60 * 1000;

const getUserId = async (): Promise<string> => {
  const userInfo = await userService.getUserInfo();
  return userInfo.id;
};

export default function ChattingForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [page, setPage] = useState(1);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isFetchingOldMessages, setIsFetchingOldMessages] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { data: userId = "" } = useQuery({
    queryKey: ["userId"],
    queryFn: getUserId,
  });

  const { data: chatRooms = [], isLoading } = useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      return await chatService.getChatRooms(1, 10);
    },
  });

  const queryClient = useQueryClient();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!selectedChatRoom) return;
    if (!socket) {
      console.error("소켓이 연결되어 있지 않습니다.");
      return;
    }

    if ((message.trim() || file) && selectedChatRoom) {
      const isImage = file && file.name.match(/\.(jpg|jpeg|png)$/i);
      const isVideo = file && file.name.match(/\.(mp4|mov)$/i);

      const newMessage = {
        id: uuidv4(),
        senderId: Array.isArray(userId) ? userId[0] : userId,
        chatRoomId: selectedChatRoom.id,
        type: isImage ? "IMAGE" : isVideo ? "VIDEO" : "TEXT",
        content: file ? null : message.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (file) {
        await handleFileUpload(selectedChatRoom.id, file, newMessage);
      } else {
        chatService.sendMessage(socket, selectedChatRoom.id, message.trim(), "TEXT");
        queryClient.setQueryData(["chatRooms"], (oldData: ChatRoom[] | undefined) => {
          if (!oldData) return [];
          return oldData.map((room) =>
            room.id === selectedChatRoom.id ? { ...room, lastChat: message.trim() } : room,
          );
        });
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }

      setMessage("");
      handleFileRemove();
      scrollToBottom();
    }
  };

  const handleFileUpload = async (chatRoomId: string, file: File, newMessage: any) => {
    const fileType = file.name.match(/\.(jpg|jpeg|png)$/i) ? "IMAGE" : "VIDEO";

    const formData = new FormData();
    formData.append("type", fileType);
    formData.append("file", file);

    try {
      const data = await chatService.fileUpload(chatRoomId, formData);

      const updatedMessage = {
        ...newMessage,
        content: data.content,
      };

      setMessages((prevMessages) => [updatedMessage, ...prevMessages]);
    } catch (error) {
      console.error("파일 업로드 실패::", error);
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

  const handleScroll = useCallback(() => {
    if (
      !messagesContainerRef.current ||
      !selectedChatRoom ||
      isFetchingOldMessages ||
      !hasMoreMessages
    )
      return;
    const { scrollTop, scrollHeight } = messagesContainerRef.current;

    if (scrollTop === 0 && !isFetchingOldMessages) {
      setIsFetchingOldMessages(true);

      const previousScrollHeight = scrollHeight;
      fetchMessages(selectedChatRoom.id, page + 1, true).then(() => {
        setPage((prev) => prev + 1);
        setIsFetchingOldMessages(false);

        requestAnimationFrame(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
              messagesContainerRef.current.scrollHeight - previousScrollHeight;
          }
        });
      });
    }
  }, [isFetchingOldMessages, hasMoreMessages, page, selectedChatRoom]);

  useEffect(() => {
    if (!selectedChatRoom) {
      return;
    }
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [selectedChatRoom, handleScroll]);

  const fetchMessages = async (chatRoomId: string, currentPage: number, isOldMessages = false) => {
    setIsMessageLoading(true);
    try {
      const data = await chatService.getMessages(chatRoomId, currentPage, 10);
      if (data.length === 0) {
        setHasMoreMessages(false);
        if (currentPage !== 1) {
          setIsFirstMessage(true);
        }
        return;
      }

      if (data.length > 0 && currentPage > 1) {
        setIsFirstMessage(false);
      }

      setMessages((prevMessages) => {
        const newMessages = data.filter(
          (msg) => !prevMessages.some((existingMsg) => existingMsg.id === msg.id),
        );
        return [...prevMessages, ...newMessages];
      });

      if (!isOldMessages) {
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      } else {
        maintainScrollPosition();
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsMessageLoading(false);
    }
  };

  const maintainScrollPosition = () => {
    if (messagesContainerRef.current) {
      const { scrollTop } = messagesContainerRef.current;
      if (scrollTop === 0) {
        messagesContainerRef.current.scrollTop = 0;
      } else {
        messagesContainerRef.current.scrollTop = scrollTop;
      }
    }
  };
  //메시지 삭제

  const handleBubbleClick = (msgId: any) => {
    setMessageToDelete((prevSelected) => (prevSelected === msgId ? null : msgId));
  };

  const handleDeleteMessage = async (messageId: string, senderId: string, createdAt: string) => {
    const currentTime = new Date();
    const messageTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - messageTime.getTime();

    if (timeDifference > DELETE_TIME) {
      alert("메시지는 5분 이내에만 삭제할 수 있습니다.");
      return;
    }

    if (senderId !== userId) {
      alert("자신의 메시지만 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("메시지를 삭제하시겠습니까?")) {
      try {
        await chatService.deleteMessage(messageId);
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.id === messageId ? { ...msg, isDeleted: true } : msg)),
        );
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const hasFirstMessage = isFirstMessage && !hasMoreMessages;
  const hasChatRoom = chatRooms.length === 0;

  const renderMessages = () => {
    return messages
      .slice()
      .reverse()
      .map((msg, index) => (
        <div key={msg.id}>
          {index === 0 && hasFirstMessage && (
            <div className="text-color-blue-500 semibold my-4 text-center">
              첫 번째 메시지입니다.
            </div>
          )}
          <div onClick={() => handleBubbleClick(msg.id)} className="relative mb-2 cursor-pointer">
            <Bubble key={msg.id} type={msg.senderId === userId ? "right" : "left_say"}>
              {msg.isDeleted ? (
                <p className="text-color-gray-50">
                  {msg.type === "TEXT" && "삭제된 메시지입니다."}
                  {msg.type === "IMAGE" && "삭제된 이미지입니다."}
                  {msg.type === "VIDEO" && "삭제된 동영상입니다."}
                </p>
              ) : msg.type === "IMAGE" ? (
                <div>
                  <div className="relative">
                    <img src={msg.content || ""} alt="file" className="w-56 rounded-lg" />
                  </div>
                  <Image
                    src={download}
                    alt="다운로드"
                    className="absolute bottom-0 right-2 h-8 w-8 cursor-pointer"
                    onClick={(e) => {
                      handleDownload(msg.id);
                      e.stopPropagation();
                    }}
                  />
                </div>
              ) : msg.type === "VIDEO" ? (
                <div>
                  <div className="relative">
                    <video controls className="h-96 rounded-lg">
                      <source src={msg.content || ""} type="video/mp4" />
                    </video>
                  </div>
                  <Image
                    src={download}
                    alt="다운로드"
                    className="absolute bottom-0 right-2 h-8 w-8 cursor-pointer"
                    onClick={(e) => {
                      handleDownload(msg.id);
                      e.stopPropagation();
                    }}
                  />
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </Bubble>
            {messageToDelete === msg.id && !msg.isDeleted && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMessage(msg.id, msg.senderId, msg.createdAt);
                  setMessageToDelete(null);
                }}
                className="bold absolute bottom-0 right-0 w-[107px] cursor-pointer rounded-md border border-color-black-500 bg-color-gray-100 px-2"
              >
                메시지 삭제
              </div>
            )}
          </div>
        </div>
      ));
  };

  const handleChatRoomClick = async (chatRoom: ChatRoom) => {
    setSelectedChatRoom(chatRoom);
    setMessages([]);
    await fetchMessages(chatRoom.id, 1, false);

    scrollToBottom();
    scrollBrowserToBottom();
  };

  const handleDownload = async (chatId: string) => {
    if (!selectedChatRoom) return;

    try {
      const presignedUrl = (await chatService.downloadFile(chatId)) as string;
      if (!presignedUrl.startsWith("http")) {
        console.error("올바른 URL이 아닙니다:", presignedUrl);
        return;
      }

      window.open(presignedUrl, "_blank");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // 웹소켓 연결 부분
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const handleError = (error: { statusCode: number; message: string }) => {
        alert(`${error.message}`);
      };

      const newSocket = chatService.connectWebSocket(
        accessToken,
        (newMessage: Message) => {
          queryClient.setQueryData<ChatRoom[]>(["chatRooms"], (oldData = []) => {
            return oldData.map((room) =>
              room.id === newMessage.chatRoomId ? { ...room, lastChat: newMessage.content } : room,
            );
          });

          if (newMessage.chatRoomId === selectedChatRoom?.id) {
            setMessages((prevMessages) => {
              if (!prevMessages.find((msg) => msg.id === newMessage.id)) {
                return [newMessage, ...prevMessages];
              }
              return prevMessages;
            });
          }
        },
        handleError,
      );
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, [selectedChatRoom, queryClient]);

  useEffect(() => {
    if (selectedChatRoom) {
      setMessages([]);
      setPage(1);
      setIsFirstMessage(false);
      setHasMoreMessages(true);
      fetchMessages(selectedChatRoom.id, 1, false);
    }
  }, [selectedChatRoom]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  //이미지
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const isImage = selectedFile.name.match(/\.(jpg|jpeg|png)$/i);
      const isVideo = selectedFile.name.match(/\.(mp4|mov)$/i);

      if (isImage && selectedFile.size > MAX_IMAGE_SIZE) {
        alert("이미지는 5MB 이하로 업로드할 수 있습니다.");
        e.target.value = "";
        return;
      }

      if (isVideo && selectedFile.size > MAX_VIDEO_SIZE) {
        alert("비디오는 100MB 이하로 업로드할 수 있습니다.");
        e.target.value = "";
        return;
      }

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
            <span className="text-xl">x</span>
          </button>
        </div>
      );
    } else {
      return (
        <p>
          지원되지 않는 파일 형식입니다. (이미지는 jpg, jpeg, png / 비디오는 mp4, mov만 업로드 가능)
        </p>
      );
    }
  };

  return (
    <>
      <div className="-mx-[260px] bg-color-gray-50 py-6 mobile-tablet:mb-5 card:mb-5">
        <p className="semibold pl-[260px] text-xl">메시지</p>
      </div>

      <Layout bodyClass="bg-gray">
        {isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <Image src={loading} alt="로딩 중" />
          </div>
        ) : (
          <>
            <div className="gap-4 overflow-x-auto rounded-xl border border-color-line-200 bg-color-gray-50 p-4 pc:hidden mobile-tablet:flex card:flex">
              {hasChatRoom ? (
                <p>채팅방 목록이 없습니다.</p>
              ) : (
                chatRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleChatRoomClick(room)}
                    className={`flex cursor-pointer flex-col rounded-lg p-3 hover:scale-[1.1] ${selectedChatRoom?.id === room.id ? "bg-color-blue-100" : "bg-[#fcfcfc]"}`}
                  >
                    <Image
                      src={
                        avatarImages.find(
                          (avatar) =>
                            avatar.key === room.users.find((user) => user.id !== userId)?.image,
                        )?.src
                      }
                      alt="유저"
                      width={70}
                      className="rounded-full"
                    />
                    <p className="bold mt-3 text-center">
                      {room.users.find((user) => user.id !== userId)?.nickName}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="grid h-[920px] grid-cols-7 gap-10 pt-4 mobile-tablet:pt-5">
              {/* 채팅방 목록 */}
              <div className="col-span-2 flex flex-col gap-4 overflow-y-auto rounded-xl bg-color-gray-50 p-8 mobile-tablet:hidden card:hidden">
                {hasChatRoom ? (
                  <p>채팅방 목록이 없습니다.</p>
                ) : (
                  chatRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => handleChatRoomClick(room)}
                      className={`flex cursor-pointer gap-4 rounded-xl border border-color-line-100 p-4 hover:scale-[1.1] ${selectedChatRoom?.id === room.id ? "bg-color-blue-100" : "bg-[#fcfcfc]"}`}
                    >
                      <div>
                        <Image
                          src={
                            avatarImages.find(
                              (avatar) =>
                                avatar.key === room.users.find((user) => user.id !== userId)?.image,
                            )?.src
                          }
                          alt="유저"
                          width={70}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <p>{room.users.find((user) => user.id !== userId)?.nickName}</p>
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
                          견적 코코넛
                        </p>
                        <Image src={coconut} alt="코코넛" width={30} />
                      </div>
                      <p className="medium text-color-balck-400 text-xl mobile-tablet:text-2lg">
                        {selectedChatRoom?.quotePrice} 개
                      </p>
                    </div>
                  </div>
                )}
                <div
                  className="h-[600px] overflow-y-auto mobile-tablet:h-[650px]"
                  ref={messagesContainerRef}
                >
                  {isMessageLoading && (
                    <div className="flex h-screen items-center justify-center">
                      <Image src={loading} alt="로딩중" />
                    </div>
                  )}
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
                    <input
                      type="file"
                      className="hidden"
                      id="fileUpload"
                      onChange={handleFileChange}
                    />
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
          </>
        )}
      </Layout>
    </>
  );
}
