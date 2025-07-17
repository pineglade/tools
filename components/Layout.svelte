<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    ampUrl = "",
    children,
    description = "",
    siteName = "",
    title = "",
    url = "",
  }: {
    ampUrl?: string;
    children?: Snippet;
    description?: string;
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
</svelte:head>

<div>
  {@render children?.()}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 100vh;
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
