type BooleanIndicatorProps = {
  title: string;
  value: boolean;
};

export function BooleanIndicator({ value, title }: BooleanIndicatorProps) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value ? "True" : "False"}</div>
    </div>
  );
}
