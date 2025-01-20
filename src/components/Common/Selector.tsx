import planData from "@/types/planData";

const Services = ({
  selectedTypes,
  toggleSelection,

}: {
  selectedTypes: string[];
  toggleSelection: (type: string) => void;

}) => (
  <div className="grid grid-cols-3 gap-3">
    {planData.services.map((service) => (
      <div
        className={`border text-2lg rounded-3xl px-3 py-2 medium flex justify-center cursor-pointer ${selectedTypes.includes(service.name)
          ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold"
          : "bg-color-background-100 border-color-gray-100"
          } mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md`}
      >
        <button type="button" onClick={() => toggleSelection(service.mapping)}>{service.name}</button>
      </div>
    ))}
  </div>
);

const Locations = ({
  selectedTypes,
  toggleSelection,
}: {
  selectedTypes: string[];
  toggleSelection: (type: string) => void;
}) => (
  <div className="grid grid-cols-5 gap-3 w-[416px] mobile-tablet:w-[280px] mobile-tablet:gap-2">
    {planData.locations.map((location) => (
      <div
        className={`border text-2lg rounded-3xl px-3 py-2 medium flex justify-center cursor-pointer ${selectedTypes.includes(location.name)
          ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold"
          : "bg-color-background-100 border-color-gray-100"
          } mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md`}
      >
        <button type="button" onClick={() => toggleSelection(location.mapping)}>
          {location.name}
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
      {category === "services" && (
        <Services selectedTypes={selectedTypes} toggleSelection={toggleSelection} />
      )}
      {category === "locations" && (
        <Locations selectedTypes={selectedTypes} toggleSelection={toggleSelection} />
      )}
    </>
  );
}
