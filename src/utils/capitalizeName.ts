export function capitalizeName(name: any) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}
