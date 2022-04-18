export function loadState(key: string, defaultValue: any) {
  return JSON.parse(sessionStorage.getItem(key) as string) ?? defaultValue;
}

export function saveState(key: string, object: any) {
  sessionStorage.setItem(key, JSON.stringify(object));
}
