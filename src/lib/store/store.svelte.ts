import type { BookmarkColumn } from '$lib/custom/bookmark/columns';

export const bookmarks = $state<{ current: BookmarkColumn[] }>({ current: [] });
