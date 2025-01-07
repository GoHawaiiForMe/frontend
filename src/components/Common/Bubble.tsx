interface BubbleProps {
  type: "left" | "right";
  children?: React.ReactNode;
}
export default function Bubble({ type = "left", children }: BubbleProps) {
  const bubbleStyle =
    type === "left"
      ? "bg-color-gray-50 rounded-r-3xl rounded-bl-3xl"
      : "bg-color-blue-300 rounded-l-3xl rounded-br-3xl";
  return (
    <>
      <div className={`${bubbleStyle} py-3 px-5`}>{children}</div>
    </>
  );
}
