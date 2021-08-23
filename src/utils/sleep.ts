export function sleep<T>(fn: () => T, ms: number) {
	return new Promise<T>(resolve => {
		setTimeout(() => resolve(fn()), ms);
	});
}
