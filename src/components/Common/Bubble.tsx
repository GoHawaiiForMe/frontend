interface BubbleProps {
  type: "left" | "left_say" | "right" | "right_select";
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
  } else if (type === "left_say") {
    bubbleStyle = "bg-color-blue-100 text-color-blue-300 rounded-r-3xl rounded-bl-3xl";
  }

  const containerStyle =
    type === "left" || type === "left_say" ? "flex justify-start" : "flex justify-end";

  return (
    <>
      <div className={`${containerStyle} pb-8`}>
        <div className={`${bubbleStyle} bold w-fit max-w-full px-5 py-3`}>{children}</div>
      </div>
    </>
  );
}
