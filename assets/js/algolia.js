---
---

const search = instantsearch({
  appId: '{{ site.algolia.application_id }}',
  indexName: '{{ site.algolia.index_name }}',
  apiKey: '{{ site.algolia.search_only_api_key }}'
});

const hitTemplate = function(hit) {
  const url = hit.url;
  const title = hit._highlightResult.title.value;
  const content = hit._highlightResult.content.value;
  return `
    <li>
      <a href="{{ site.baseurl }}${url}">
        <span class="post-meta ${hit.categories[0]}">${hit.categories[0]}/${hit.categories[1]}</span>
        <h2 class="post-title">
          <strong>${title}</strong>
        </h2>
        <span class="post-subtitle">${content}</span>
      </a>
    </li>
  `;
}

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-searchbar',
    placeholder: '검색하기'
  })
);
search.addWidget(
  instantsearch.widgets.hits({
    container: '#search-hits',
    templates: {
      item: hitTemplate
    }
  })
);

search.start();