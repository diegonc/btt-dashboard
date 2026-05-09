type NumberIndicatorProps = {
  title: string;
  value: number;
};

export function NumberIndicator({ value, title }: NumberIndicatorProps) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
}
