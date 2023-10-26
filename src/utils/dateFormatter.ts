export default function dateFormatter(inputDateString: Date) {
  const date = new Date(inputDateString);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return inputDateString ? date.toLocaleDateString("pt-BR", options as any) : "-";
}
