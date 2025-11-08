export function buildSearchParams(values: Record<string, unknown>): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
}

export function parseSearchParams(
  searchString: string
): Record<string, string> {
  const params = new URLSearchParams(searchString);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
