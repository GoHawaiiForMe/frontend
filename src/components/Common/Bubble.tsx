interface BubbleProps {
  type: "left" | "right" | "right_select";
  children?: React.ReactNode;
}
export default function Bubble({ type = "left", children }: BubbleProps) {
  let bubbleStyle = "";

  if (type === "left") {
    bubbleStyle = "bg-color-gray-50 rounded-r-3xl rounded-bl-3xl";
  } else if (type === "right") {
    bubbleStyle = "bg-color-blue-300 rounded-l-3xl rounded-br-3xl text-color-gray-50";
  } else if (type === "right_select") {
    bubbleStyle = "bg-color-gray-50 rounded-l-3xl rounded-br-3xl ";
  }

  const containerStyle = type === "left" ? "flex justify-start" : "flex justify-end";

  return (
    <>
      <div className={`${containerStyle} mb-8`}>
        <div className={`${bubbleStyle} max-w-full w-fit bold py-3 px-5`}>{children}</div>
      </div>
    </>
  );
}
