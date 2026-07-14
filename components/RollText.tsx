/* Roll de hover: el label sale por arriba y entra su gemelo por abajo.
   Requiere que el elemento interactivo padre tenga la clase "group". */
export default function RollText({ text }: { text: string }) {
  return (
    <span className="roll">
      <span>{text}</span>
      <span aria-hidden>{text}</span>
    </span>
  );
}
