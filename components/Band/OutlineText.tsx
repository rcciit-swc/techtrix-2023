export function OutlineText({
  children,
  textOutline,
}: {
  children: JSX.Element | string;
  textOutline: string;
}) {
  return (
    <span
      style={{
        color: "transparent",
        WebkitTextStroke: `1px ${textOutline}`,
        fontSize: "60px",
        margin: "0 10px",
      }}
    >
      {children}
    </span>
  );
}
