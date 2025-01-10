const services = [
  "맛집 탐방형",
  "기념품/쇼핑형",
  "휴양형",
  "문화/역사탐방형",
  "액티비티/탐험형",
  "축제참여형",
];

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
];

const Services = ({ selectedTypes, toggleSelection }: { selectedTypes: string[]; toggleSelection: (type: string) => void; }) => (
  <div className="grid grid-cols-3 gap-3">
    {services.map((service) => (
      <div
        onClick={() => toggleSelection(service)}
        className={`border text-2lg rounded-3xl px-3 py-2 medium flex justify-center cursor-pointer ${selectedTypes.includes(service)
          ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold"
          : "bg-color-background-100 border-color-gray-100"
          } mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md`}
      >
        <button key={service}>{service}</button>
      </div>
    ))}
  </div>
);

const Locations = ({ selectedTypes, toggleSelection }: { selectedTypes: string[]; toggleSelection: (type: string) => void; }) => (
  <div className="grid grid-cols-5 gap-3 w-[416px] mobile-tablet:w-[280px] mobile-tablet:gap-2">
    {locations.map((location) => (
      <div
        className={`bg-color-background-100 border border-color-gray-100 text-2lg rounded-3xl px-3 py-2 medium flex items-center justify-center ${selectedTypes.includes(location)
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
);


export default function Selector({
  category,
  selectedTypes,
  toggleSelection,
}: {
  category: string;
  selectedTypes: string[];
  toggleSelection: (type: string) => void;
}) {
  return (
    <>
      {category === "services" && <Services selectedTypes={selectedTypes} toggleSelection={toggleSelection} />}
      {category === "locations" && <Locations selectedTypes={selectedTypes} toggleSelection={toggleSelection} />}
    </>
  );
}
