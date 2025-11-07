export type MCQuestion = {
  id: number;
  type: "multiple_choice";
  question: string;
  options: string[];
  correct_index: number;
  correct_option?: string;
};

export type TFQuestion = {
  id: number;
  type: "true_false";
  statement: string;
  answer: boolean; // true=Verdadero, false=Falso
};

export type Section = {
  section: string;
  questions: (MCQuestion | TFQuestion)[];
};

// Pregunta normalizada para renderizar
export type FlatQuestion = {
  id: number;
  section: string;
  type: "multiple_choice" | "true_false";
  text: string; // question o statement
  options: string[]; // para V/F quedará ["Verdadero","Falso"]
  correctIndex: number; // índice correcto en options
};
