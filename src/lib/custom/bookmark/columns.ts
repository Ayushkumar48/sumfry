import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableActions from './data-table-actions.svelte';
import { marked } from 'marked';
import { createRawSnippet } from 'svelte';
import DOMPurify from 'isomorphic-dompurify';
import DataTableTitleButton from './data-table-title-button.svelte';

marked.use({
	renderer: {
		image() {
			return '';
		}
	}
});

export type BookmarkColumn = {
	id: string;
	url: string;
	summary: string;
	title?: string;
	description?: string;
	icon?: string;
	createdAt: Date;
};

export const columns: ColumnDef<BookmarkColumn>[] = [
	{
		accessorKey: 'url',
		header: 'URL',
		cell: ({ row }) => {
			const urlCellSnippet = createRawSnippet<[string]>((getUrl) => {
				const url = getUrl();
				return {
					render: () => `<div class="max-w-[35ch] break-words">${url}</div>`
				};
			});

			return renderSnippet(urlCellSnippet, row.getValue('url'));
		}
	},
	{
		accessorKey: 'title',
		header: ({ column }) =>
			renderComponent(DataTableTitleButton, {
				onclick: column.getToggleSortingHandler()
			}),
		cell: ({ row }) => {
			const titleCellSnippet = createRawSnippet<[string]>((getTitle) => {
				const title = getTitle();
				return {
					render: () => {
						if (title) {
							return `<div class="text-justify truncate w-[14ch]">${title}</div>`;
						} else {
							return `<div class="text-center">----</div>`;
						}
					}
				};
			});

			return renderSnippet(titleCellSnippet, row.getValue('title'));
		}
	},
	{
		accessorKey: 'summary',
		header: 'Summary',
		cell: ({ row }) => {
			const summaryCellSnippet = createRawSnippet<[string]>((getSummary) => {
				const summary = getSummary();
				return {
					render: () =>
						`<div class="text-justify line-clamp-4">${DOMPurify.sanitize(marked.parse(summary) as string)}</div>`
				};
			});

			return renderSnippet(summaryCellSnippet, row.getValue('summary'));
		}
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => {
			const descriptionCellSnippet = createRawSnippet<[string]>((getDescription) => {
				const description = getDescription();
				return {
					render: () => {
						if (description) {
							return `<div class="text-justify truncate w-[14ch]">${description}</div>`;
						} else {
							return `<div class="text-center">----</div>`;
						}
					}
				};
			});

			return renderSnippet(descriptionCellSnippet, row.getValue('description'));
		}
	},
	{
		accessorKey: 'icon',
		header: 'Icon',
		cell: ({ row }) => {
			const iconCellSnippet = createRawSnippet<[string]>((getIcon) => {
				const icon = getIcon();
				return {
					render: () => `<img class="w-6 h-6" src=${icon} alt="Bookmark Icon" />`
				};
			});

			return renderSnippet(iconCellSnippet, row.getValue('icon'));
		}
	},
	{
		accessorKey: 'createdAt',
		header: 'Bookmarked On',
		cell: ({ row }) => {
			const createdAtCellSnippet = createRawSnippet<[string]>((getCreatedAt) => {
				const createdAt = getCreatedAt();
				return {
					render: () =>
						`<div class="text-nowrap">${new Date(createdAt).toLocaleDateString('en-US', { year: '2-digit', month: 'short', day: 'numeric' })}</div>`
				};
			});

			return renderSnippet(createdAtCellSnippet, row.getValue('createdAt'));
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { url: row.original.url, id: row.original.id });
		}
	}
];
