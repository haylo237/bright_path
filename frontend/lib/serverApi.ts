type ListQueryPayload = {
  model: string;
  where?: unknown;
  include?: unknown;
  select?: unknown;
  orderBy?: unknown;
  page: number;
  perPage: number;
};

export async function fetchListData<T>(payload: ListQueryPayload): Promise<{ data: T[]; count: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API query failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchCount(payload: { model: string; where?: unknown }): Promise<number> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "count", ...payload }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API count failed: ${response.status}`);
  }

  const json = await response.json();
  return json.count as number;
}

export async function fetchGroupBy<T>(payload: {
  model: string;
  by: string[];
  where?: unknown;
  aggregateCount?: boolean;
}): Promise<T[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "groupBy", ...payload }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API groupBy failed: ${response.status}`);
  }

  const json = await response.json();
  return json.data as T[];
}
