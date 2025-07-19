<script lang="ts">
	import type { Snippet } from "svelte";

	import type { Image } from "../types";

	let {
		ampUrl = "",
		assetsBase = "",
		children,
		description = "",
		fonts = [],
		ogImage,
		ogLocale = "ru_RU",
		ogType = "website",
		siteName = "",
		title = "",
		url = "",
	}: {
		ampUrl?: string;
		assetsBase?: string;
		children?: Snippet;
		description?: string;
		fonts?: string[];
		ogImage?: Image;
		ogLocale?: string;
		ogType?: string;
		siteName?: string;
		title?: string;
		url?: string;
	} = $props();
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	{#if title}
		<title>{title}</title>
		<meta property="og:title" content={title} />
	{/if}

	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
	{/if}

	{#if siteName}
		<meta property="og:site_name" content={siteName} />
	{/if}

	{#if url}
		<link rel="canonical" href={url} />
		<meta property="og:url" content={url} />
	{/if}

	{#if ampUrl}
		<link rel="amphtml" href={ampUrl} />
	{/if}

	<link rel="manifest" href="{assetsBase}/site.webmanifest" />
	<link rel="icon" type="image/svg+xml" href="{assetsBase}/favicon.svg" />
	<link rel="shortcut icon" href="{assetsBase}/favicon.ico" />
	<link
		rel="icon"
		type="image/png"
		href="{assetsBase}/favicon-96x96.png"
		sizes="96x96"
	/>
	<link
		rel="apple-touch-icon"
		href="{assetsBase}/apple-touch-icon.png"
		sizes="180x180"
	/>

	{#each fonts as font (font)}
		<link
			href="{assetsBase}/{font}"
			as="font"
			crossorigin="anonymous"
			rel="preload"
		/>
	{/each}

	<meta property="og:locale" content={ogLocale} />
	<meta property="og:type" content={ogType} />
	{#if ogImage}
		<meta property="og:image" content="{assetsBase}/{ogImage.src}" />

		{#if ogImage.width}
			<meta property="og:image:width" content={`${ogImage.width}`} />
		{/if}
		{#if ogImage.height}
			<meta property="og:image:height" content={`${ogImage.height}`} />
		{/if}
		{#if ogImage.alt}
			<meta property="og:image:alt" content={ogImage.alt} />
		{/if}
	{/if}
</svelte:head>

<div>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-height: 100dvh;
		overflow: hidden scroll;
		scroll-behavior: var(--scroll-behavior);

		@include no-motion {
			scroll-behavior: auto;
		}
	}

	:global(main) {
		flex-grow: 1; // Sticky footer
	}
</style>
