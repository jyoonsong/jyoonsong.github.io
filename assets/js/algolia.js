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
      item: hitTemplate,
      empty: function() {
        return "검색 결과가 없습니다."
      }      
    }
  })
);
search.addWidget(
  instantsearch.widgets.stats({
    container: '#search-stats',
    autoHideContainer: false,
    templates: {
      body: function(data) {
        return data.nbHits + '개의 검색 결과 (' + data.processingTimeMS + 'ms)'
      }
    }
  })
);

search.start();