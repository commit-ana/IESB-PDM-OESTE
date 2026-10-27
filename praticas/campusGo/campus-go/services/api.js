const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  const response = await fetch(`${BASE_URL}/${path}`, options);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar o servidor`);
  }
  return response.json();
}

export const api = {
  get: (path) => request(path),
  create: (path, body) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};