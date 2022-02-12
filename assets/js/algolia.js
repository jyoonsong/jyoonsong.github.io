'use strict';

var search = instantsearch({
  appId: 'B2K91HKW0L',
  indexName: 'blog',
  apiKey: '23d5dd4c41b934b448e87e2799119301'
});

var hitTemplate = function hitTemplate(hit) {
  var url = hit.url;
  var title = hit._highlightResult.title.value;
  var content = hit._highlightResult.content.value;
  return '\n    <li>\n      <a href="' + url + '">\n        <span class="post-meta ' + hit.categories[0] + '">' + hit.categories[0] + '/' + hit.categories[1] + '</span>\n        <h2 class="post-title">\n          <strong>' + title + '</strong>\n        </h2>\n        <span class="post-subtitle">' + content + '</span>\n      </a>\n    </li>\n  ';
};

search.addWidget(instantsearch.widgets.searchBox({
  container: '#search-searchbar',
  placeholder: '검색하기'
}));
search.addWidget(instantsearch.widgets.hits({
  container: '#search-hits',
  templates: {
    item: hitTemplate,
    empty: function empty() {
      return "검색 결과가 없습니다.";
    }
  }
}));
search.addWidget(instantsearch.widgets.stats({
  container: '#search-stats',
  autoHideContainer: false,
  templates: {
    body: function body(data) {
      return data.nbHits + '개의 검색 결과 (' + data.processingTimeMS + 'ms)';
    }
  }
}));

search.start();