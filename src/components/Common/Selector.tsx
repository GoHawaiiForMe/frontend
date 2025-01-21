import planData, { Service, Location } from "@/types/planData";

const Services = ({
  selectedTypes,
  toggleSelection,
  data,
  className,
  itemClassName,
}: {
  selectedTypes: string[];
  toggleSelection?: (type: string) => void;
  data?: Service[];
  className?: string;
  itemClassName?: string;

}) => (
  <div className={`${className ?? "grid grid-cols-3 gap-3"} `}>
    {(data || planData.services).map((service) => (
      <div
        className={`${itemClassName ?? ""} border text-2lg rounded-3xl px-3 py-2 medium flex justify-center cursor-pointer mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md
        ${selectedTypes.includes(service.name) ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold" : "bg-color-background-100 border-color-gray-100"
          }`}
        onClick={() => toggleSelection?.(service.mapping)}
      >
        <button type="button" >{service.name}</button>
      </div>
    ))}
  </div>
);

const Locations = ({
  selectedTypes,
  toggleSelection,
  data,
  className,
  itemClassName,
}: {
  selectedTypes: string[];
  toggleSelection?: (type: string) => void;
  data?: Location[];
  className?: string;
  itemClassName?: string;
}) => (
  <div className={`${className ?? "grid grid-cols-5 gap-3"} w-[416px] mobile-tablet:w-[280px] mobile-tablet:gap-2`}>
    {(data || planData.locations).map((location) => (
      <div
        className={`${itemClassName ?? ""} border text-2lg rounded-3xl px-3 py-2 medium flex justify-center cursor-pointer mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md 
        ${selectedTypes.includes(location.name) ? "bg-color-blue-50 border-color-blue-300 text-color-blue-300 bold"
            : "bg-color-background-100 border-color-gray-100"
          }`}
        onClick={() => toggleSelection?.(location.mapping)}
      >
        <button type="button" >
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
  data,
  className,
  itemClassName,
}: {
  category: string;
  selectedTypes: string[];
  toggleSelection?: (type: string) => void;
  data?: Service[] | Location[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <>
      {category === "services" && (
        <Services selectedTypes={selectedTypes} toggleSelection={toggleSelection} data={data as Service[]} className={className} itemClassName={itemClassName} />
      )}
      {category === "locations" && (
        <Locations selectedTypes={selectedTypes} toggleSelection={toggleSelection} data={data as Location[]} className={className} itemClassName={itemClassName} />
      )}
    </>
  );
}
