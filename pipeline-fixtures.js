'use strict';
// Connector illustrations only; no deployed pipeline or live data.
window.FIXTURES.pipelines = {
  "pull": {
    "id": "opensearch.pipelines.pull",
    "version": 1,
    "owner": "pipelines",
    "kind": "connector",
    "label": "Pull connectors",
    "title": "Read from your data source",
    "summary": "The pipeline retrieves objects or consumes records from a stream.",
    "connectors": [
      [
        "Object Storage",
        "Scan objects once or on a schedule. Configure a source coordination bucket.",
        "archive"
      ],
      [
        "OCI Streaming / self-managed Kafka",
        "Consume records from configured topics.",
        "radio"
      ]
    ],
    "nodes": [
      [
        "Data source",
        "Objects or stream records",
        "database",
        "amber"
      ],
      [
        "OCI OpenSearch Pipelines",
        "Data Prepper processors",
        "workflow",
        "violet"
      ],
      [
        "OpenSearch index",
        "Ready for queries",
        "search",
        "teal"
      ]
    ],
    "edges": [
      "Pull",
      "Index"
    ],
    "requirement": "These pull sources do not require a persistent buffer.",
    "sources": [
      "pipelines"
    ]
  },
  "push": {
    "id": "opensearch.pipelines.push",
    "version": 1,
    "owner": "pipelines",
    "kind": "connector",
    "label": "Push connectors",
    "title": "Send data to the pipeline endpoint",
    "summary": "Your application or collector sends events to an HTTP or OpenTelemetry endpoint.",
    "connectors": [
      [
        "HTTP",
        "Send data from your application.",
        "send"
      ],
      [
        "OpenTelemetry",
        "Send logs, metrics or traces.",
        "activity"
      ]
    ],
    "nodes": [
      [
        "Sender",
        "HTTP / OpenTelemetry",
        "send",
        "amber"
      ],
      [
        "Push endpoint",
        "Dedicated OCI Streaming buffer",
        "layers",
        "coral"
      ],
      [
        "OCI OpenSearch Pipelines",
        "Data Prepper processors",
        "workflow",
        "violet"
      ],
      [
        "OpenSearch index",
        "Ready for queries",
        "search",
        "teal"
      ]
    ],
    "edges": [
      "Send",
      "Read buffer",
      "Index"
    ],
    "requirement": "Push requires a dedicated persistent buffer per pipeline. OCI Streaming is the only supported buffer; do not share it between pipelines.",
    "sources": [
      "pipelines"
    ]
  }
};
