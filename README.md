# OCI OpenSearch Showcase

Explore how OCI Search with OpenSearch supports search, application-log investigation, and security analytics. This interactive showcase combines architecture illustrations, practical use cases, and screenshots with links to official documentation.

## Capabilities covered

- **Overview:** Service architecture and customer journeys.
- **Pipelines:** Push and pull connectors, with guidance on supported processors.
- **Availability:** Primary-shard failure and replica promotion across availability or fault domains.
- **Capacity & historical data:** Target-specific resizing considerations and searching snapshot-backed indexes.
- **Recovery:** Cross-cluster replication (CCR) standby, retained managed backups, and repository snapshot restore.
- **Migration:** Compatibility assessment, rehearsal, snapshot transfer and restore, validation, and planned application cutover.
- **Observability:** A simulated slow-search investigation using cluster metrics, an OCI Monitoring alarm, Query Insights, and before/after evidence.
- **Security:** Management IAM, network reachability, and OpenSearch data permissions.
- **Workload patterns:** Preset product search, application logs in Discover, and a Security Analytics finding with its matched rule.
- **Distributed search:** One cross-cluster search (CCS) request across local and remote indexes, with results attributed to their source.

## View locally

Download and extract the showcase, then open `index.html` in a current browser with JavaScript enabled. No build, package installation, credentials, or cloud connection is required. Scripts, styles, icons, and screenshots are bundled for offline viewing; external documentation links require internet access.

For an optional local web server, run this command from the extracted folder if Python 3 is installed:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Then open [localhost:8000](http://127.0.0.1:8000/). On systems where Python 3 is named `python3`, use that command instead.

Use the sidebar or mobile menu to explore. Staged illustrations have local playback controls; reduced-motion preferences are supported. Select a screenshot to enlarge it, and press Escape to close it.

## Illustrative examples

Measurements, search results, alarm transitions, and animated operations are illustrative. Screenshots are supplied captures or attributed documentation examples, with identifying values redacted. Separate captures do not establish a shared incident.

The showcase performs **no live cloud operations**: it does not connect to clusters, ingest data, send notifications, or execute recovery, migration, or resizing actions. Requests and configuration snippets are display-only. Check the linked official documentation, target version, permissions, and prerequisites before applying a pattern to your environment.
