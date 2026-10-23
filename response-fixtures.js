'use strict';
window.RESPONSE_FIXTURES = {
  "opensearch.catalog.matches.response": {
    "id": "opensearch.catalog.matches.response",
    "version": 1,
    "kind": "synthetic-response-excerpt",
    "status": 200,
    "payload": {
      "hits": {
        "total": {
          "value": 1,
          "relation": "eq"
        },
        "hits": [
          {
            "_index": "catalog",
            "_id": "p-101",
            "_source": {
              "id": "p-101",
              "title": "Trail daypack",
              "category": "outdoors",
              "price": 49
            }
          }
        ]
      }
    }
  }
};
