export const splitText = (text: string) => {
  return text.split("\\n").map((line, i) => <div key={i}>{line}</div>);
};
