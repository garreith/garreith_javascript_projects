
const API_URL = 'http://localhost:5000/api/products';

export async function get_products() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Load failed: ${response.status}`);
  }

  return response.json();
}

export async function save_products(products) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Save failed: ${response.status}`);
  }

  return response.json();
}
