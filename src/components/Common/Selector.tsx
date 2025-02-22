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
  <div className={`${className ?? "grid grid-cols-3 gap-3"} w-[510px] mobile-tablet:w-[280px]`}>
    {(data || planData.services).map((service, index) => (
      <div
        key={index}
        className={`${itemClassName ?? ""} medium flex cursor-pointer justify-center rounded-3xl border px-3 py-2 text-2lg hover:scale-105 mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md ${
          selectedTypes.includes(service.name)
            ? "bold border-color-blue-300 bg-color-blue-50 text-color-blue-300"
            : "border-color-gray-100 bg-color-background-100"
        }`}
        onClick={() => toggleSelection?.(service.mapping)}
      >
        <button type="button">{service.name}</button>
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
  <div
    className={`${className ?? "grid grid-cols-5 gap-3"} w-[416px] mobile-tablet:w-[280px] mobile-tablet:gap-2`}
  >
    {(data || planData.locations).map((location, index) => (
      <div
        key={index}
        className={`${itemClassName ?? ""} medium flex cursor-pointer justify-center rounded-3xl border px-3 py-2 text-2lg hover:scale-105 mobile-tablet:px-2 mobile-tablet:py-1 mobile-tablet:text-md ${
          selectedTypes.includes(location.name)
            ? "bold border-color-blue-300 bg-color-blue-50 text-color-blue-300"
            : "border-color-gray-100 bg-color-background-100"
        }`}
        onClick={() => toggleSelection?.(location.mapping)}
      >
        <button type="button">{location.name}</button>
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
        <Services
          selectedTypes={selectedTypes}
          toggleSelection={toggleSelection}
          data={data as Service[]}
          className={className}
          itemClassName={itemClassName}
        />
      )}
      {category === "locations" && (
        <Locations
          selectedTypes={selectedTypes}
          toggleSelection={toggleSelection}
          data={data as Location[]}
          className={className}
          itemClassName={itemClassName}
        />
      )}
    </>
  );
}
