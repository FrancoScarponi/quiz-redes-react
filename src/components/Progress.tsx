type Props = {
  correct: number;
  wrong: number;
  current: number;
  total: number;
};

export default function Progress({ correct, wrong, current, total }: Props) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-4">
      <div className="flex justify-between text-sm text-gray-300 mb-1">
        <span>Aciertos: {correct}</span>
        <span>Errores: {wrong}</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-2 bg-sky-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-gray-400 mt-1">Progreso: {pct}%</div>
    </div>
  );
}
