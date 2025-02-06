export type TripType = "SHOPPING" | "FOOD_TOUR" | "ACTIVITY" | "CULTURE" | "FESTIVAL" | "RELAXATION";

export const formatTripType = (tripType: TripType | undefined): string => {
  if (!tripType) return "";

  const tripTypeMap: Record<TripType, string> = {
    SHOPPING: "기념품/쇼핑형",
    FOOD_TOUR: "맛집 탐방형",
    ACTIVITY: "액티비티/탐험형",
    CULTURE: "문화/역사탐방형",
    FESTIVAL: "축제참여형",
    RELAXATION: "휴양형",
  };

  return tripTypeMap[tripType] || "";
};
