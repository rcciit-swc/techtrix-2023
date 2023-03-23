export function Text({
  children,
  color,
}: {
  children: JSX.Element | string;
  color: string;
}) {
  return (
    <span
      style={{
        color: color,
        fontSize: "60px",
      }}
    >
      {children}
    </span>
  );
}
