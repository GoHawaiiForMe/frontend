import ModalLayout from "../Layout/ModalLayout";
import Image from "next/image";
import avatarImages from "@/utils/formatImage";

interface ImageModalProps {
  onSelectImage: (imageSrc: string) => void;
  onClose: () => void;
}

export default function ImageModal({ onSelectImage, onClose }: ImageModalProps) {
  return (
    <ModalLayout label="프로필 이미지 선택하기" closeModal={onClose}>
      <div className="mb-10 flex gap-4">
        {avatarImages.map((avatar, index) => (
          <div key={index} onClick={() => onSelectImage(avatar.key)} className="cursor-pointer">
            <Image src={avatar.src} alt={`아바타${index + 1}`} width={100} height={100} />
          </div>
        ))}
      </div>
    </ModalLayout>
  );
}
