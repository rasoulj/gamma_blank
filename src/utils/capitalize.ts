export function capitalize(string: string): string {
  if (!string) return '';

  return string
    .toString()
    .toLowerCase()
    .replace(/_|-/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => word.toUpperCase())
    .replace(/\s+/g, '');

  string = string.toString();

  return string.charAt(0).toUpperCase() + string.slice(1);
}
