import React from "react";
import QuestionCard from "./components/QuestionCard";
import Progress from "./components/Progress";

function normalize(sections) {
  const out = [];
  for (const sec of sections) {
    for (const q of sec.questions) {
      if (q.type === "multiple_choice") {
        out.push({
          id: q.id,
          section: sec.section,
          type: q.type,
          text: q.question,
          options: q.options,
          correctIndex: q.correct_index,
        });
      } else {
        out.push({
          id: q.id,
          section: sec.section,
          type: q.type,
          text: q.statement,
          options: ["Verdadero", "Falso"],
          correctIndex: q.answer ? 0 : 1,
        });
      }
    }
  }
  return out;
}

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [questions, setQuestions] = React.useState([]);

  const [idx, setIdx] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [wrong, setWrong] = React.useState(0);
  const total = questions.length;

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/questions.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const flat = normalize(data);
        setQuestions(flat);
      } catch (e) {
        setError(e?.message ?? "Error al cargar preguntas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onAnswered = (isCorrect) => {
    if (isCorrect) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
  };

  const goNext = () => setIdx((i) => i + 1);
  const restart = () => {
    setIdx(0);
    setCorrect(0);
    setWrong(0);
  };

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center text-gray-200">
        Cargando preguntas…
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red-300">
        Error: {error}
      </div>
    );
  if (total === 0)
    return (
      <div className="min-h-screen grid place-items-center text-gray-300">
        No hay preguntas.
      </div>
    );

  const finished = idx >= total;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Quiz</h1>

        <Progress
          correct={correct}
          wrong={wrong}
          current={Math.min(idx, total)}
          total={total}
        />

        {!finished ? (
          <QuestionCard
            key={questions[idx].id}
            q={questions[idx]}
            index={idx}
            total={total}
            onAnswered={onAnswered}
            goNext={goNext}
          />
        ) : (
          <div className="w-full max-w-2xl mx-auto bg-white/5 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Resultados</h2>
            <p className="mb-2">
              Aciertos: <span className="text-emerald-300">{correct}</span>
            </p>
            <p className="mb-4">
              Errores: <span className="text-rose-300">{wrong}</span>
            </p>
            <p className="text-sm text-gray-300 mb-4">
              Total: {total}. Precisión: {Math.round((correct / total) * 100)}%
            </p>
            <button
              onClick={restart}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 transition"
            >
              Reiniciar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
