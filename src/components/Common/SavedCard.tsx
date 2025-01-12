import Image from 'next/image';
import like from '@public/assets/icon_like_pink.svg';
import star from '@public/assets/icon_star_md.svg';
import default_img from '@public/assets/icon_default_profile.svg'
import Label from './label';
import link from "@public/assets/icon_link.svg"

export default function SavedCard() {
    return (
        <>
            <Label type="SHOPPING" />
            <div className="flex flex-col gap-6 rounded-2xl border border-color-line-100 py-8 px-9 ">

                <div className="flex rounded-md border border-line-100 gap-9">
                    <div>
                        <Image
                            src={default_img}
                            alt="maker 이미지"
                            width={80}
                            height={80}
                            className="border-2 border-color-blue-400 rounded-full"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="w-full flex justify-between">
                            <p className="text-2lg semibold text-color-black-300">
                                김코드 Maker
                            </p>
                            <div className="flex gap-1 items-center">
                                <Image src={like} alt="heart" width={24} height={24} />
                                <p className="text-2lg medium text-color-blue-400">
                                    136
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-2 items-center">
                                <Image src={star} alt="star" width={24} height={24} className="pc:block" />
                                <Image src={star} alt="star" width={20} height={20} className="pc:hidden" />
                                <p className="text-lg medium text-color-black-300">
                                    5.0
                                </p>
                                <p className="text-lg medium text-color-gray-300">
                                    178
                                </p>
                            </div>
                            <div className="h-5 border border-line-200" />
                            <div className="flex gap-1 items-center">
                                <p className="text-lg medium text-color-gray-300">
                                    경력
                                </p>
                                <Image src={link} alt="링크이미지" width={30} height={30} />
                            </div>
                            <div className="h-5 border border-line-200" />
                            <div className="flex gap-2 items-center">
                                <p className="text-lg medium text-color-black-300">
                                    334건
                                </p>
                                <p className="text-lg medium text-color-gray-300">
                                    확정
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
