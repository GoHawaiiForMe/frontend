import Layout from "@/components/Common/Layout";
import Bubble from "@/components/Common/Bubble";
import Selector from "@/components/Common/Selector";
import Input from "@/components/Common/Input";
import { useState, useEffect } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import ModalLayout from "@/components/Common/ModalLayout";
import Button from "@/components/Common/Button";

export default function PlanRequest() {
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isOpenAddressApi, setIsOpenAddressAPI] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [showStep1Summary, setShowStep1Summary] = useState(false);
  const [showStep2Summary, setShowStep2Summary] = useState(false);
  const [showStep3Summary, setShowStep3Summary] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (showStep1Summary && !showStep2Summary) {
      setProgress(50);
    } else if (showStep2Summary) {
      setProgress(100);
    } else {
      setProgress(25);
    }
  }, [showStep1Summary, showStep2Summary]);

  const updateProgress = () => {
    if (showStep1Summary && !showStep2Summary) {
      setProgress(50);
    } else if (showStep2Summary) {
      setProgress(100);
    } else {
      setProgress(25);
    }
  };

  const handleLocationSelection = (type: string) => {
    setSelectedLocations((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleServiceSelection = (type: string) => {
    setSelectedServices((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleOpenAddress = () => {
    setIsOpenAddressAPI(true);
  };

  const handleCloseAddress = () => {
    setIsOpenAddressAPI(false);
  };

  const handleAddressSelect = (data: { address: string }) => {
    setAddress(data.address);
    setIsOpenAddressAPI(false);
  };
  const isStep1Complete = selectedLocations.length > 0;

  const isStep2Complete =
    textareaValue.trim().length > 0 &&
    (selectedServices.includes("기념품/쇼핑형")
      ? address && detailAddress
      : selectedServices.length > 0);

  //   const isStep3Complete = selectedDate.length > 0;

  const handleCompleteStep1Selection = () => {
    if (isStep1Complete) {
      setShowStep1Summary(true);
      updateProgress();
    }
  };

  const handleEditStep1Summary = () => {
    setShowStep1Summary(false);
    setProgress(25);
  };

  const handleCompleteStep2Selection = () => {
    if (isStep2Complete) {
      setShowStep2Summary(true);
      updateProgress();
    }
  };

  const handleEditStep2Summary = () => {
    setShowStep2Summary(false);
    setProgress(50);
  };

  const handleCompleteStep3Selection = () => {
    if (isStep2Complete) {
      setShowStep2Summary(true);
      updateProgress();
    }
  };

  const handleEditStep3Summary = () => {
    setShowStep2Summary(false);
    setProgress(75);
  };

  return (
    <>
      <div className="mb-8 w-[312px]">
        <div className="flex flex-col gap-4 justify-center w-screen text-2xl semibold h-24 bg-color-gray-50 pc:px-[260px] pc:-mx-[260px] tablet:-mx-[72px] tablet:px-[72px] mobile:-mx-[24px] mobile:px-[24px]">
          플랜요청
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
            ></div>
          </div>
        </div>
      </div>
      <Bubble type="left">
        몇 가지 정보만 알려주시면 최대 5개의 플랜을 받을 수 있어요 &#59;&#41;
      </Bubble>
      <Bubble type="left">여행 지역을 선택해 주세요.</Bubble>
      {/* step 1 */}
      {!showStep1Summary && (
        <>
          <div>
            <Bubble type="right_select">
              <Selector
                category="locations"
                selectedTypes={selectedLocations}
                toggleSelection={handleLocationSelection}
              />

              <Button
                label="선택완료"
                className="mt-8"
                disabled={!isStep1Complete}
                onClick={handleCompleteStep1Selection}
              />
            </Bubble>
          </div>
        </>
      )}
      {showStep1Summary && (
        <div>
          <Bubble type="right">
            <div>
              <p>[여행할 지역]</p>
              <div>{selectedLocations.join(", ")}</div>
            </div>
          </Bubble>
          <p
            className="underline flex justify-end cursor-pointer -mt-7 mb-8"
            onClick={handleEditStep1Summary}
          >
            수정하기
          </p>
        </div>
      )}

      {/* step 2 */}

      {showStep1Summary && !showStep2Summary && (
        <>
          <Bubble type="left">여행 종류를 선택해 주세요.</Bubble>
          <div>
            <Bubble type="right_select">
              <Input
                type="textarea"
                onChange={(e) => setTextareaValue(e.target.value)}
                value={textareaValue}
                placeholder="Maker에게 부탁할 일을 자세하게 작성해주세요."
              />
              <p className="mb-4">복수 선택 가능합니다!</p>

              <Selector
                category="services"
                selectedTypes={selectedServices}
                toggleSelection={handleServiceSelection}
              />
              {selectedServices.includes("기념품/쇼핑형") && (
                <div className="mt-4">
                  <button
                    className="border px-4 flex flex-start w-full h-16 items-center border-color-blue-300 text-color-blue-300 bold rounded-2xl"
                    onClick={handleOpenAddress}
                  >
                    {address ? address : "물건을 받을 도착지 선택하기"}
                  </button>
                  {isOpenAddressApi && (
                    <ModalLayout label="주소지 검색하기" closeModal={handleCloseAddress}>
                      <DaumPostcodeEmbed onComplete={handleAddressSelect}></DaumPostcodeEmbed>
                    </ModalLayout>
                  )}
                </div>
              )}
              {address && selectedServices.includes("기념품/쇼핑형") && (
                <div className="mt-4">
                  <Input
                    type="text"
                    placeholder="상세 주소를 입력하세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    className=" text-color-blue-300"
                  />
                </div>
              )}
              <Button
                label="선택완료"
                className="mt-8"
                disabled={!isStep2Complete}
                onClick={handleCompleteStep2Selection}
              ></Button>
            </Bubble>
          </div>
        </>
      )}
      {showStep1Summary && showStep2Summary && (
        <div>
          <Bubble type="right">
            <div>
              <p>[요청사항]</p>
              <div>{textareaValue}</div>
            </div>
            <div>
              <p>[선택된 서비스]</p> <div>{selectedServices.join(", ")}</div>
            </div>
            {selectedServices.includes("기념품/쇼핑형") && (
              <>
                <div>
                  <p>[주소]</p> <div>{address}</div>
                </div>
                <div>
                  <p>[상세 주소]</p> <div>{detailAddress}</div>
                </div>
              </>
            )}
          </Bubble>
          <p
            className="underline flex justify-end cursor-pointer -mt-7"
            onClick={handleEditStep2Summary}
          >
            수정하기
          </p>
        </div>
      )}

      {/* step 3 */}
      {showStep1Summary && showStep2Summary && !showStep3Summary && (
        <>
          <Bubble type="left">여행할 날짜를 선택해 주세요.</Bubble>
          <div>
            <Bubble type="right_select">
              {/* <>달력 API</> */}
              <Button
                label="달력 넣어야함"
                className="mt-8"
                // disabled={!isStep3Complete}
                onClick={handleCompleteStep3Selection}
              />
            </Bubble>
          </div>
        </>
      )}
      {showStep3Summary && (
        <div>
          <Bubble type="right">
            <div>
              <p>[여행할 날짜]</p>
              <div>{selectedLocations.join(", ")}</div>
            </div>
          </Bubble>
          <p
            className="underline flex justify-end cursor-pointer -mt-7 mb-8"
            onClick={handleEditStep3Summary}
          >
            수정하기
          </p>
        </div>
      )}
    </>
  );
}
