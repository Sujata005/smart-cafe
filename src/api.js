import { API_BASE_URL } from "./config";

async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const token = localStorage.getItem("adminToken");

  const opts = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  if (options.body && typeof options.body !== "string") {
    opts.body = JSON.stringify(options.body);
  }

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, opts);
      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        if ([500, 502].includes(response.status) && attempt < 3) {
          await new Promise(r => setTimeout(r, 200 * Math.pow(2, attempt)));
          continue;
        }

        const message = responseBody?.message || response.statusText || "API error";
        const error = new Error(message);
        error.status = response.status;
        error.body = responseBody;
        throw error;
      }

      return responseBody;
    } catch (err) {
      lastError = err;
      if (err.status && [500, 502].includes(err.status) && attempt < 3) {
        await new Promise(r => setTimeout(r, 200 * Math.pow(2, attempt)));
        continue;
      }
      throw err;
    }
  }

  throw lastError;
}

export { apiFetch };