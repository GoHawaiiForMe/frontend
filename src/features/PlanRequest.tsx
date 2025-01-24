import Bubble from "@/components/Common/Bubble";
import Selector from "@/components/Common/Selector";
import Input from "@/components/Common/Input";
import { useState, useEffect } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import ModalLayout from "@/components/Common/ModalLayout";
import Button from "@/components/Common/Button";
import Calendar from "@/components/Common/Calandar";
import planData from "@/types/planData";
import planService from "@/services/planService";
import { useMutation } from "@tanstack/react-query";

export default function PlanRequest({ onConfirm }: { onConfirm: () => void }) {
  const [textValue, setTextValue] = useState<string>("");
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isOpenAddressApi, setIsOpenAddressAPI] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [showStep1Summary, setShowStep1Summary] = useState(false);
  const [showStep2Summary, setShowStep2Summary] = useState(false);
  const [showStep3Summary, setShowStep3Summary] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const newProgress = showStep3Summary ? 100 : showStep2Summary ? 75 : showStep1Summary ? 50 : 25;
    setProgress(newProgress);
  };

  const handleLocationSelection = (type: string) => {
    setSelectedLocations((prev) => (prev[0] === type ? [] : [type]));
  };

  const handleServiceSelection = (type: string) => {
    setSelectedServices((prev) => (prev[0] === type ? [] : [type]));
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
    textValue.length > 0 &&
    (selectedServices.includes("SHOPPING")
      ? address && detailAddress
      : selectedServices.length > 0);
  const isStep3Complete = selectedDate !== null;

  const handleCompleteStep1Selection = () => {
    if (isStep1Complete) {
      setShowStep1Summary(true);
      updateProgress();
    }
  };
  const handleCompleteStep2Selection = () => {
    if (isStep2Complete) {
      setShowStep2Summary(true);
      updateProgress();
    }
  };

  const handleCompleteStep3Selection = () => {
    if (isStep3Complete) {
      setShowStep3Summary(true);
      updateProgress();
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  const planRequestMutation = useMutation({
    mutationFn: (data: any) => planService.planRequest(data),
    onSuccess: () => {
      onConfirm();
    },
    onError: (error: any) => {
      console.error("여행 요청 실패", error);
    },
  });

  const handlePlanConfirm = () => {
    const planData = {
      title: textValue,
      tripDate: selectedDate,
      tripType: selectedServices[0] || "",
      serviceArea: selectedLocations[0] || "",
      details: textareaValue,
      address: address + ", " + detailAddress,
    };

    planRequestMutation.mutate(planData);
  };

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  return (
    <>
      <div className="mb-8 w-[312px]">
        <div className="semibold flex h-24 w-screen flex-col justify-center gap-4 bg-color-gray-50 text-2xl mobile:-mx-[24px] mobile:px-[24px] tablet:-mx-[72px] tablet:px-[72px] pc:-mx-[260px] pc:px-[260px]">
          플랜요청
          <div className="relative h-2 w-full rounded-full bg-gray-300">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-blue-500"
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
        <div>
          <Bubble type="right_select">
            <p className="mb-4">한 지역만 선택 가능합니다!</p>
            <Selector
              category="locations"
              selectedTypes={selectedLocations.map(
                (location) =>
                  planData.locations.find((loc) => loc.mapping === location)?.name || location,
              )}
              toggleSelection={handleLocationSelection}
            />

            <Button
              label="선택완료"
              className="mt-8 text-color-gray-50"
              disabled={!isStep1Complete}
              onClick={handleCompleteStep1Selection}
            />
          </Bubble>
        </div>
      )}
      {showStep1Summary && (
        <div>
          <Bubble type="right">
            <div>
              <p>[여행할 지역]</p>
              <div>
                {selectedLocations
                  .map((loc) => planData.locations.find((l) => l.mapping === loc)?.name)
                  .join(", ")}
              </div>
            </div>
          </Bubble>
          <p
            className="-mt-7 mb-8 flex cursor-pointer justify-end underline"
            onClick={() => setShowStep1Summary(false)}
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
              <div className="mb-4">
                <Input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value.length <= 25) {
                      setTextValue(e.target.value);
                    }
                  }}
                  value={textValue}
                  placeholder="제목을 작성해주세요. (최대 25자까지)"
                />
              </div>
              <Input
                type="textarea"
                onChange={(e) => setTextareaValue(e.target.value)}
                value={textareaValue}
                placeholder="Maker에게 부탁할 일을 자세하게 작성해주세요."
              />
              <p className="mb-4">한 서비스만 선택 가능합니다!</p>

              <Selector
                category="services"
                selectedTypes={selectedServices.map(
                  (service) =>
                    planData.services.find((ser) => ser.mapping === service)?.name || service,
                )}
                toggleSelection={handleServiceSelection}
              />
              {selectedServices.includes("SHOPPING") && (
                <div className="mt-4">
                  <button
                    className="flex-start bold flex h-16 w-full items-center rounded-2xl border border-color-blue-300 px-4 text-color-blue-300"
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
              {address && selectedServices.includes("SHOPPING") && (
                <div className="mt-4">
                  <Input
                    type="text"
                    placeholder="상세 주소를 입력하세요"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    className="text-color-blue-300"
                  />
                </div>
              )}
              <Button
                label="선택완료"
                className="mt-8 text-color-gray-50"
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
              <p>[제목]</p>
              <div>{textValue}</div>
            </div>
            <div>
              <p>[요청사항]</p>
              <div>{textareaValue}</div>
            </div>
            <div>
              <p>[선택된 서비스]</p>{" "}
              <div>
                {selectedServices
                  .map((service) => planData.services.find((ser) => ser.mapping === service)?.name)
                  .join(", ")}
              </div>
            </div>
            {selectedServices.includes("SHOPPING") && (
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
            className="-mt-7 mb-8 flex cursor-pointer justify-end underline"
            onClick={() => setShowStep2Summary(false)}
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
              <Calendar onDateChange={handleDateChange} />
              <Button
                label="선택완료"
                className="mt-8 text-color-gray-50"
                disabled={!isStep3Complete}
                onClick={handleCompleteStep3Selection}
              />
            </Bubble>
          </div>
        </>
      )}
      {showStep1Summary && showStep2Summary && showStep3Summary && (
        <div>
          <Bubble type="right">
            <div>
              <p>[여행할 날짜]</p>
              <div>
                {selectedDate ? selectedDate.toLocaleDateString("ko-KR") : "날짜 선택 안됨"}
              </div>
            </div>
          </Bubble>
          <p
            className="-mt-7 mb-8 flex cursor-pointer justify-end underline"
            onClick={() => setShowStep3Summary(false)}
          >
            수정하기
          </p>
          <Bubble type="right">
            <div className="px-4">
              <p className="mb-2">플랜을 확정하시겠습니까?</p>

              <Button
                label="플랜 확정하기"
                onClick={handlePlanConfirm}
                type="submit"
                className="border border-color-black-100 bg-color-red-100 text-color-black-300"
              ></Button>
            </div>
          </Bubble>
        </div>
      )}
    </>
  );
}
