import ModalLayout from "./ModalLayout";
import Image from "next/image";
import DEFAULT_1 from "@public/assets/img_avatar1.svg";
import DEFAULT_2 from "@public/assets/img_avatar2.svg";
import DEFAULT_3 from "@public/assets/img_avatar3.svg";
import DEFAULT_4 from "@public/assets/img_avatar4.svg";

const avatarImages = [
  { key: "DEFAULT_1", src: DEFAULT_1 },
  { key: "DEFAULT_2", src: DEFAULT_2 },
  { key: "DEFAULT_3", src: DEFAULT_3 },
  { key: "DEFAULT_4", src: DEFAULT_4 },
];

interface ImageModalProps {
  onSelectImage: (imageSrc: string) => void;
  onClose: () => void;
}

export default function ImageModal({ onSelectImage, onClose }: ImageModalProps) {

  return (
    <ModalLayout label="프로필 이미지 선택하기" closeModal={onClose}>
      <div className="flex gap-4 mb-10">
        {avatarImages.map((avatar, index) => (
          <div key={index} onClick={() => onSelectImage(avatar.key)} className="cursor-pointer">
            <Image src={avatar.src} alt={`아바타${index + 1}`} width={100} height={100} />
          </div>
        ))}
      </div>
    </ModalLayout>
  );
}