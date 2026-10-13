import { useEffect, useState } from 'react';

const repository = 'flaviojmendes/trilhainfo';
const cacheKey = 'trilha:github-stars';
const maxAge = 12 * 60 * 60 * 1000;

function cached(): number | undefined {
  try {
    const value = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    if (value && Date.now() - value.at < maxAge && typeof value.stars === 'number')
      return value.stars;
  } catch {
    // Storage can be unavailable or hold stale data; fetch again.
  }
  return undefined;
}

export function useGithubStars(): number | undefined {
  const [stars, setStars] = useState(cached);

  useEffect(() => {
    if (stars !== undefined) return;
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${repository}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : undefined))
      .then((body) => {
        if (typeof body?.stargazers_count !== 'number') return;
        setStars(body.stargazers_count);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ stars: body.stargazers_count, at: Date.now() }),
          );
        } catch {
          // Not caching is fine.
        }
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [stars]);

  return stars;
}
