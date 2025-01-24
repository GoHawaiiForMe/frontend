// ClipboardCopy.js
"use client"; // 클라이언트 사이드에서만 실행되도록 설정
import { useState } from "react";
import Image from "next/image"; // Image 컴포넌트 임포트

interface ClipboardCopyProps {
  icon: string; // icon의 타입을 string으로 지정
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ icon }) => {
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태

  const copyUrl = async () => {
    try {
      const url = window.location.href; // 현재 페이지 URL을 가져옵니다.
      await navigator.clipboard.writeText(url); // URL을 클립보드에 복사

      console.log("URL이 복사되었습니다! 복사된 URL:", url);
      setTimeout(() => {
        setShowPopup(false); // 2초 후 팝업 숨기기
      }, 2000); // 2초 후 팝업을 숨김
    } catch (error) {
      console.error("클립보드 복사 실패:", error); // 오류 처리
    }
  };

  return (
    <div>
      <button onClick={copyUrl} className="flex">
        {/* 이미지 아이콘과 텍스트를 표시 */}
        <Image src={icon} alt="링크 복사 아이콘" width={64} height={64} />
      </button>
      {showPopup && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg border bg-white p-4 shadow-lg"
          style={{ zIndex: 999 }}
        >
          <p className="text-center text-black">URL이 복사되었습니다!</p>
        </div>
      )}
    </div>
  );
};

export default ClipboardCopy;
