function readUserName(): string {
  return JSON.parse(localStorage.getItem('userName') as string) || '';
}

function writeUserName(name: string) {
  localStorage.setItem('userName', JSON.stringify(name));
}

export const localStorageRepository = {
  readUserName,
  writeUserName,
} as const;
