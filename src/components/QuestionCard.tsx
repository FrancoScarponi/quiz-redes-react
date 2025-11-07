import React from "react";
import type { FlatQuestion } from "../types";

type Props = {
  q: FlatQuestion;
  index: number;
  total: number;
  onAnswered: (isCorrect: boolean) => void;
  goNext: () => void;
};

export default function QuestionCard({ q, index, total, onAnswered, goNext }: Props) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleSelect = (i: number) => {
    if (checked) return;
    setSelected(i);
    setChecked(true);
    onAnswered(i === q.correctIndex);
  };

  const answeredCorrect = checked && selected === q.correctIndex;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 rounded-2xl p-6 shadow-lg">
      <div className="text-sm text-gray-300 mb-1">{q.section}</div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Pregunta {index + 1} de {total}</h2>
        {checked && (
          <span className={`text-sm px-2 py-1 rounded-full ${
            answeredCorrect ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
          }`}>
            {answeredCorrect ? "¡Correcta!" : "Incorrecta"}
          </span>
        )}
      </div>

      <p className="mb-4 text-lg">{q.text}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt: string, i: number) => {
          const isSel = selected === i;
          const isCorrectOpt = i === q.correctIndex;

          const base = "w-full text-left px-4 py-3 rounded-xl border transition";
          const neutral = "border-white/10 hover:border-white/20";
          const correctSty = "border-green-500 bg-green-500/10";
          const wrongSty = "border-red-500 bg-red-500/10";
          const selSty = "border-sky-400 bg-sky-400/10";

          let classes = `${base} ${neutral}`;
          if (!checked && isSel) classes = `${base} ${selSty}`;
          if (checked && isCorrectOpt) classes = `${base} ${correctSty}`;
          if (checked && isSel && !isCorrectOpt) classes = `${base} ${wrongSty}`;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={checked}
              className={classes}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {checked && isCorrectOpt && (
                  <span className="text-xs text-green-300">Respuesta correcta</span>
                )}
                {checked && isSel && !isCorrectOpt && (
                  <span className="text-xs text-red-300">Tu elección</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {checked && (
        <button
          onClick={goNext}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
