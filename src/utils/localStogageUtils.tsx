export function loadState(key: string, defaultValue: any) {
  return JSON.parse(localStorage.getItem(key) as string) ?? defaultValue;
}

export function saveState(key: string, object: any) {
  localStorage.setItem(key, JSON.stringify(object));
}
