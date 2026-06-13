const STORAGE_PREFIX = 'workout-krc';

function buildKey(scope: string) {
	return `${STORAGE_PREFIX}:${scope}`;
}

export function readStoredValue<T>(scope: string, fallback: T): T {
	if (typeof window === 'undefined') return fallback;

	try {
		const rawValue = window.localStorage.getItem(buildKey(scope));
		if (!rawValue) return fallback;

		return JSON.parse(rawValue) as T;
	} catch {
		return fallback;
	}
}

export function writeStoredValue<T>(scope: string, value: T) {
	if (typeof window === 'undefined') return;

	try {
		window.localStorage.setItem(buildKey(scope), JSON.stringify(value));
	} catch {
		// Ignore storage errors to keep the UI responsive.
	}
}
