export const extractUrls = (arr: string[]) =>
	arr
		.flatMap((s: string) => s.split(",").map((url) => url.trim()))
		.filter(Boolean);
