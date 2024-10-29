<script lang="ts" setup>
import { onMounted } from 'vue'
import docsearch from '@docsearch/js';
import '@docsearch/css';

onMounted(() => {
  docsearch({
    appId: "TJHTPTANLO",
    apiKey: "4340be1d4a77adb4a66feb9a7e5485f6",
    indexName: "nocturne-org",
    container: "#doc-search",
    translations: {
      button: {
        buttonText: '搜索',
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除',
          resetButtonAriaLabel: 'Clear the query',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: 'Cancel',
          searchInputLabel: '搜索',
        },
        startScreen: {
          recentSearchesTitle: 'Recent',
          noRecentSearchesText: '暂无搜索记录',
          saveRecentSearchButtonTitle: 'Save this search',
          removeRecentSearchButtonTitle: 'Remove this search from history',
          favoriteSearchesTitle: 'Favorite',
          removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
        },
        errorScreen: {
          titleText: 'Unable to fetch results',
          helpText: 'You might want to check your network connection.',
        },
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: 'Enter key',
          navigateText: '切换',
          navigateUpKeyAriaLabel: 'Arrow up',
          navigateDownKeyAriaLabel: 'Arrow down',
          closeText: '取消',
          closeKeyAriaLabel: 'Escape key',
          searchByText: '提供者',
        },
        noResultsScreen: {
          noResultsText: 'No results for',
          suggestedQueryText: 'Try searching for',
          reportMissingResultsText: 'Believe this query should return results?',
          reportMissingResultsLinkText: 'Let us know.',
        },
      },
    }
  });
})
</script>

<template>
  <div id="doc-search"></div>
</template>

<style lang="scss">
.vp-search {
  width: 150px;
}

.DocSearch-Button {
  --docsearch-searchbox-background: var(--n-bg-color-page);
  --docsearch-muted-color: var(--n-text-color-placeholder);
  --docsearch-key-gradient: var(--n-bg-color-overlay);
  --docsearch-text-color: var(--n-text-color-placeholder);
  // --docsearch-searchbox-shadow: inset 0 0 0 2px var(--n-color-primary);
  transition: all var(--n-transition-duration-fast);

  &:hover {
    background: var(--n-bg-color-page);
    color: var(--n-text-color-secondary);
  }

  .DocSearch-Button-Key {
    box-shadow: none;
  }
}

.DocSearch-Modal {
  --docsearch-modal-background: var(--n-bg-color-overlay);
  --docsearch-footer-background: var(--n-bg-color);
  --docsearch-searchbox-focus-background: var(--n-bg-color-overlay);
  --docsearch-text-color: var(--n-text-color-regular);

  box-shadow: none;
}
</style>