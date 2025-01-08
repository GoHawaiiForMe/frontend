export default function Selector({
  category,
  selectedTypes,
  toggleSelection,
}: {
  category: string;
  selectedTypes: string[];
  toggleSelection: (type: string) => void;
}) {
  const services = ["기념품형", "액티비티형", "맛집형", "전시회형"];
  const locations = [
    "서울",
    "경기",
    "인천",
    "강원",
    "충북",
    "충남",
    "세종",
    "대전",
    "전북",
    "전남",
    "광주",
    "경북",
    "경남",
    "대구",
    "울산",
    "부산",
    "제주",
    "해외",
  ];

  return (
    <>
      {category === "services" && (
        <div className="flex gap-3">
          {services.map((service) => (
            <div
              className={` border text-2lg rounded-3xl px-3 py-2 medium ${
                selectedTypes.includes(service)
                  ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold"
                  : "bg-color-background-100 border-color-gray-100"
              } mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md`}
            >
              <button key={service} onClick={() => toggleSelection(service)}>
                {service}
              </button>
            </div>
          ))}
        </div>
      )}
      {category === "locations" && (
        <div className="grid grid-cols-5 gap-3 w-[416px] mobile-tablet:w-[280px] mobile-tablet:gap-2">
          {locations.map((location) => (
            <div
              className={`bg-color-background-100 border border-color-gray-100 text-2lg rounded-3xl px-3 py-2 medium flex items-center justify-center ${
                selectedTypes.includes(location)
                  ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold"
                  : "bg-color-background-100 border-color-gray-100"
              } mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md`}
            >
              <button key={location} onClick={() => toggleSelection(location)}>
                {location}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
