'use strict';
window.FIXTURES = {
  "capacity": {
    "resize": {
      "id": "opensearch.capacity.resize",
      "version": 3,
      "owner": "capacity",
      "kind": "support",
      "label": "Resize capacity",
      "summary": "Choose node count, per-role compute, or data-node storage to address a measured constraint.",
      "consideration": "Most resizing temporarily disables writes. A data-node storage increase alone keeps reads and writes available; no other setting can change in that operation.",
      "sources": [
        "resize",
        "resizeHorizontal",
        "resizeML",
        "nodes"
      ],
      "choices": [
        [
          "Node counts",
          "Verify which node-count changes are supported for your target cluster, node role and OpenSearch version."
        ],
        [
          "OCPUs and memory",
          "Adjust leader, data and Dashboards resources per role, up or down within supported limits. Downscaling must pass service validation."
        ],
        [
          "Data-node storage",
          "Increase only; storage cannot be reduced."
        ]
      ],
      "prerequisite": "Check permitted target values, shard placement, replica coverage, remaining capacity and application load before resizing. Plan ingestion buffering or a write pause, then validate application behavior."
    },
    "history": {
      "id": "opensearch.capacity.history",
      "version": 1,
      "owner": "capacity",
      "kind": "support",
      "label": "Search historical indexes",
      "summary": "Query snapshot-backed indexes in Object Storage using dedicated search nodes and a local cache.",
      "consideration": "Benchmark representative queries, including uncached access. Remote reads and cache capacity affect query behavior; no latency or savings promise is made.",
      "sources": [
        "snapshots",
        "snapshotAPI",
        "nodes"
      ],
      "prerequisite": "Configure supported FLEX search nodes, a customer Object Storage snapshot repository, repository permissions and compatible index snapshots. Verify the actual cluster version and configuration before use."
    }
  },
  "availability": {
    "promotion": {
      "id": "opensearch.availability.promotion",
      "version": 3,
      "owner": "availability",
      "label": "Shard promotion",
      "title": "Shard promotion",
      "summary": "A simulated loss of one data node shows why an in-sync replica and failure-domain placement matter.",
      "nodes": [
        [
          "Application",
          "Owns reconnect and retry",
          "app-window",
          "teal"
        ],
        [
          "Private API",
          "Cluster entry point",
          "network",
          "violet"
        ],
        [
          "Data nodes",
          "Primary and replica shards",
          "layers",
          "amber"
        ],
        [
          "Resume traffic",
          "Validate useful reads and writes",
          "check",
          "teal"
        ]
      ],
      "edges": [
        "Connect",
        "Route",
        "Validate"
      ],
      "steps": [
        [
          "Healthy copies",
          "Shard 0 has a primary in domain 1 and an in-sync replica in domain 2. Three separate leaders manage cluster state."
        ],
        [
          "Primary data node fails",
          "Data node A is unavailable. Its primary cannot serve requests; application traffic may be interrupted."
        ],
        [
          "Replica becomes primary",
          "OpenSearch automatically promotes the surviving in-sync replica on data node B. Leader-node roles do not change."
        ],
        [
          "Traffic reaches the new primary",
          "Illustrated application retries reach data node B. Validate real client behavior and restore missing replica coverage."
        ]
      ],
      "outcome": "An eligible shard copy can support continuity within the region.",
      "consideration": "Placement is best effort; sufficient healthy nodes, domains, replicas and capacity are required. No recovery duration is promised.",
      "runbook": [
        "Choose 3 leaders across domains, 2 or 3 distributed data nodes, and at least 2 Dashboards nodes for HA.",
        "Check shard distribution and replica health before a failure.",
        "Validate client retries and restore redundancy after the event."
      ],
      "sources": [
        "ha",
        "nodes"
      ],
      "illustrative": true,
      "input": {
        "scenario": "promotion"
      },
      "initialState": "Shard 0 has a primary in domain 1 and an in-sync replica in domain 2. Three separate leaders manage cluster state.",
      "finalState": "Illustrated application retries reach data node B. Validate real client behavior and restore missing replica coverage.",
      "presentation": "staged",
      "flowCaption": "Illustrative sequence only."
    }
  },
  "recovery": {
    "ccr": {
      "id": "opensearch.recovery.ccr",
      "version": 4,
      "owner": "recovery",
      "label": "CCR standby",
      "title": "Prepare a replicated standby",
      "summary": "Use this when another cluster should hold a recent copy before an incident.",
      "nodes": [
        [
          "Leader index",
          "Accepts application writes",
          "database",
          "teal"
        ],
        [
          "Follower index",
          "Asynchronous, read-only copy",
          "copy",
          "violet"
        ],
        [
          "Recovery decision",
          "Assess lag and stop replication",
          "hand",
          "amber"
        ],
        [
          "Application switch",
          "Enable writes and validate",
          "app-window",
          "teal"
        ]
      ],
      "edges": [
        "Replicate",
        "Approve",
        "Switch"
      ],
      "steps": [
        [
          "Assess the incident",
          "Check source reachability and last known replication progress. Missing lag telemetry is unknown, not zero."
        ],
        [
          "Coordinate writes",
          "Establish which cluster can receive application writes before switching traffic."
        ],
        [
          "Stop following",
          "Stop replication to convert the follower into a standard writable index."
        ],
        [
          "Cut over and validate",
          "The operator redirects the application, validates reads and writes, and plans resynchronization and failback. Cutover is not automatic."
        ]
      ],
      "outcome": "Judge whether the follower is suitable for recovery before authorizing a switch.",
      "consideration": "Deletions replicate too, so retain independent backups. Replication lag can leave recent changes missing.",
      "runbook": [
        "OpenSearch 2.15 or later; verify version compatibility, cross-cluster connections and permissions."
      ],
      "sources": [
        "cross"
      ],
      "illustrative": true,
      "input": {
        "scenario": "ccr"
      },
      "initialState": "Check source reachability and last known replication progress. Missing lag telemetry is unknown, not zero.",
      "finalState": "The operator redirects the application, validates reads and writes, and plans resynchronization and failback. Cutover is not automatic.",
      "visual": "ccrSteady",
      "presentation": "flow",
      "flowCaption": "Animation illustrates replication; no live recovery operation is running."
    },
    "managed": {
      "id": "opensearch.recovery.managed",
      "version": 4,
      "owner": "recovery",
      "label": "Managed restore",
      "title": "Restore a retained managed backup",
      "summary": "Use this to recover a known backup after a data problem or cluster failure.",
      "nodes": [
        [
          "Managed backup",
          "Daily or on-demand resource",
          "archive",
          "teal"
        ],
        [
          "Restore target",
          "Source or new cluster",
          "database",
          "violet"
        ],
        [
          "Application checks",
          "Data, access and index readiness",
          "list-checks",
          "amber"
        ],
        [
          "Resume",
          "Customer controls application switch",
          "app-window",
          "teal"
        ]
      ],
      "edges": [
        "Select",
        "Restore",
        "Approve"
      ],
      "steps": [
        [
          "Select a backup",
          "Choose an available managed backup whose capture time meets the recovery need."
        ],
        [
          "Start managed restore",
          "An authorized administrator restores to the source cluster or a prepared new cluster."
        ],
        [
          "Validate the target",
          "Check index contents, access, capacity and application behavior before allowing traffic."
        ],
        [
          "Resume the application",
          "The operator coordinates writes and any endpoint change, then records the observed recovery time."
        ]
      ],
      "outcome": "Restore to the source for a data issue; prepare a new cluster when the cluster must be rebuilt.",
      "consideration": "Restore is limited to retained backups, not an arbitrary time. Daily scheduling is fixed; daily and manual backups are retained for 14 days.",
      "runbook": [
        "Confirm restore permissions. For a new target, provision the required node configuration before restoring.",
        "Record the backup identifier and capture time for the recovery rehearsal."
      ],
      "sources": [
        "backup",
        "daily",
        "manual"
      ],
      "illustrative": true,
      "input": {
        "scenario": "managed"
      },
      "initialState": "Choose an available managed backup whose capture time meets the recovery need.",
      "finalState": "The operator coordinates writes and any endpoint change, then records the observed recovery time.",
      "visual": "snapshot",
      "presentation": "flow",
      "flowCaption": "Animation illustrates the managed restore path; no live recovery operation is running."
    },
    "repository": {
      "id": "opensearch.recovery.repository",
      "version": 4,
      "owner": "recovery",
      "label": "Snapshot & restore",
      "title": "Restore selected indexes from a snapshot",
      "summary": "Use this when you need to choose which indexes to recover or rename them during restore.",
      "nodes": [
        [
          "Selected indexes",
          "Customer chooses snapshot scope",
          "layers",
          "teal"
        ],
        [
          "Repository",
          "Customer Object Storage bucket",
          "cloud",
          "violet"
        ],
        [
          "Target indexes",
          "Restore selected data",
          "database",
          "amber"
        ],
        [
          "Application",
          "Validate and switch deliberately",
          "check",
          "teal"
        ]
      ],
      "edges": [
        "Snapshot",
        "Restore",
        "Verify"
      ],
      "steps": [
        [
          "Choose a snapshot",
          "Verify snapshot completion and access to the repository."
        ],
        [
          "Set the restore scope",
          "Select the indexes and any renamed targets needed to avoid name collisions."
        ],
        [
          "Restore and check",
          "Restore to a compatible target, then verify index contents and access."
        ],
        [
          "Switch application traffic",
          "The operator validates application behavior before directing reads and writes to the recovered indexes."
        ]
      ],
      "outcome": "Choose the indexes to recover and decide whether names, aliases or global state should change.",
      "consideration": "Only data in the chosen snapshot can be recovered. Your team owns repository retention and target compatibility.",
      "runbook": [
        "Register the repository and configure Object Storage policies and cluster permissions.",
        "Review aliases and global-state selection before submitting a restore request."
      ],
      "sources": [
        "backup",
        "restore",
        "snapshotAPI"
      ],
      "illustrative": true,
      "input": {
        "scenario": "repository"
      },
      "initialState": "Verify snapshot completion and access to the repository.",
      "finalState": "The operator validates application behavior before directing reads and writes to the recovered indexes.",
      "visual": "snapshot",
      "presentation": "flow",
      "flowCaption": "Animation illustrates a Snapshot API workflow; no live recovery operation is running."
    }
  },
  "migration": {
    "import": {
      "id": "opensearch.migration.import",
      "version": 3,
      "owner": "migration",
      "label": "Snapshot migration",
      "title": "Snapshot migration",
      "summary": "Rehearse the move, establish a write boundary, and approve application cutover from validation evidence.",
      "nodes": [
        [
          "External cluster",
          "Source indexes",
          "database",
          "teal"
        ],
        [
          "Object Storage",
          "Snapshot repository contents",
          "cloud",
          "violet"
        ],
        [
          "OCI cluster",
          "Isolated rehearsal / restore target",
          "boxes",
          "amber"
        ],
        [
          "Application cutover",
          "Operator approval",
          "arrow-right-left",
          "teal"
        ]
      ],
      "edges": [
        "Transfer",
        "Restore",
        "Approve"
      ],
      "steps": [
        [
          "Assess compatibility",
          "Check source and target versions, index compatibility, analyzers, plugins and clients before scheduling the move."
        ],
        [
          "Rehearse on an isolated target",
          "Restore a trial snapshot and test representative queries, ingestion and access. Resolve failures and test the rollback plan before proceeding."
        ],
        [
          "Coordinate writes and capture",
          "For this walkthrough, pause source writers and drain in-flight writes before the final snapshot; hold writes until cutover. Verify snapshot success. Later changes are not synchronized; continued writes require a separately tested reconciliation plan."
        ],
        [
          "Transfer and restore",
          "Copy the completed repository contents to Object Storage, preserving its structure. Register the OCI repository and restore the intended indexes. Resolve index-name conflicts and verify shard recovery."
        ],
        [
          "Validate and approve cutover",
          "Compare index contents and application behavior against acceptance checks. An operator approves the endpoint switch and resumption of writes; hold the move if checks fail."
        ]
      ],
      "outcome": "Application cutover follows validated snapshot migration and operator approval.",
      "consideration": "Snapshots are not continuous change capture. Destination writes change what rollback requires.",
      "runbook": [
        "Access and target: Prepare private connectivity, cluster and bucket permissions, and repository access. Oracle’s import guide requires the destination to match the source node configuration.",
        "Application acceptance: Record checks for index completeness, representative search results, ingestion, identities and integrations. Restore alone does not configure application access or switch clients.",
        "Rollback after destination writes: Test the rollback plan before cutover. Once the destination accepts writes, the source is stale: reconcile those changes before returning, or explicitly approve the resulting data loss. Repointing clients alone is insufficient."
      ],
      "sources": [
        "migration",
        "migrationSnapshots",
        "createSnapshot",
        "restore",
        "releases"
      ],
      "illustrative": true,
      "input": {
        "scenario": "import"
      },
      "initialState": "Check source and target versions, index compatibility, analyzers, plugins and clients before scheduling the move.",
      "finalState": "Compare index contents and application behavior against acceptance checks. An operator approves the endpoint switch and resumption of writes; hold the move if checks fail.",
      "code": {
        "label": "OpenSearch 3.6 REST · source snapshot",
        "text": "PUT /_snapshot/source_repository/catalog_snapshot?wait_for_completion=true\n{\n  \"indices\": \"catalog\",\n  \"include_global_state\": false\n}",
        "prerequisites": "Display only. Requires a configured writable source repository and snapshot permissions. Creates repository data; no request runs here."
      },
      "json": {
        "label": "OpenSearch 3.6 REST · destination restore",
        "text": "POST /_snapshot/oci_repository/catalog_snapshot/_restore\n{\n  \"indices\": \"catalog\",\n  \"include_global_state\": false,\n  \"rename_pattern\": \"(.+)\",\n  \"rename_replacement\": \"restored_$1\",\n  \"include_aliases\": false\n}",
        "prerequisites": "Display only. Requires compatible snapshot contents, an OCI repository and target restore permissions. Writes restored_catalog in the destination; does not configure access or switch applications."
      },
      "presentation": "staged",
      "flowCaption": "Illustration only · playback changes this diagram, never a cluster. Timing does not represent migration duration."
    }
  },
  "observability": {
    "slowsearch": {
      "id": "opensearch.observability.slowsearch",
      "version": 3,
      "owner": "observability",
      "title": "Slow-search investigation",
      "label": "Slow search",
      "summary": "Follow one slow-search incident from cluster telemetry to an operator-tested query change.",
      "presentation": "staged",
      "illustrative": true,
      "input": {
        "scenario": "slowsearch",
        "target": "OCI OpenSearch 3.6",
        "namespace": "oci_opensearch",
        "clusterId": "demo-cluster",
        "nodeName": "data-1",
        "interval": "1m",
        "statistic": "mean",
        "date": "2026-10-21",
        "timezone": "UTC"
      },
      "nodes": [
        [
          "Cluster metrics",
          "Automatic telemetry",
          "activity",
          "teal"
        ],
        [
          "OCI Monitoring",
          "Configured alarm",
          "bell",
          "amber"
        ],
        [
          "Query Insights",
          "Configured collection",
          "search",
          "violet"
        ],
        [
          "Operator",
          "Inspect and respond",
          "user-round",
          "coral"
        ],
        [
          "Verification",
          "Compare evidence",
          "circle-check",
          "teal"
        ]
      ],
      "edges": [
        "Evaluate",
        "Investigate",
        "Decide",
        "Verify"
      ],
      "steps": [
        [
          "Monitor",
          "Search latency departs from the declared workload baseline while shard allocation remains green."
        ],
        [
          "Alert",
          "A customer-configured OCI Monitoring rule evaluates the selected metric stream and routes a simulated notification to Search Operations."
        ],
        [
          "Investigate",
          "Correlate resource pressure with the workload, then use Query Insights Top N to select a candidate query. Correlation is not proof of cause."
        ],
        [
          "Inspect and respond",
          "Inspect q-17 and test removal of an unused aggregation. The operator approves the change only after checking the application contract."
        ],
        [
          "Verify",
          "Compare equivalent five-minute replays and check both latency and application correctness before accepting the response."
        ]
      ],
      "outcome": "The illustrative replay meets the declared acceptance checks; ongoing observation remains necessary.",
      "consideration": "All evidence and actions are simulated. No automatic remediation, production threshold recommendation or causal guarantee.",
      "runbook": [
        "Access to OCI metrics and separately configured alarms/Notifications.",
        "Supported cluster, Query Insights collection, private API access and authorized OpenSearch roles.",
        "Confirm the supported OCI slow-log retrieval path and permissions before enabling thresholds."
      ],
      "sources": [
        "metrics",
        "plugins",
        "obsVersion",
        "obsAlarm",
        "obsMql",
        "obsNotify",
        "obsIam",
        "obsTop",
        "obsPermissions",
        "obsHealth",
        "obsSlow"
      ],
      "baseline": {
        "label": "Declared workload baseline",
        "latencyRange": [
          15,
          25
        ],
        "searchRate": 240,
        "indexingRate": 120,
        "corpus": "Same 1 million product documents; 6 primary shards; fixed node configuration; warmed caches; same replay mix and concurrency"
      },
      "trend": [
        20,
        22,
        24,
        80,
        95,
        110,
        105,
        100
      ],
      "trendTimes": [
        "08:00",
        "08:01",
        "08:02",
        "08:03",
        "08:04",
        "08:05",
        "08:06",
        "08:07"
      ],
      "health": {
        "status": "green",
        "unassigned_shards": 0
      },
      "before": {
        "window": "08:03–08:08 UTC",
        "latency": [
          80,
          95,
          110,
          105,
          100
        ],
        "cpu": 82,
        "jvm": 78,
        "storage": 64,
        "searchRate": 240,
        "indexingRate": 120
      },
      "after": {
        "window": "08:20–08:25 UTC",
        "latency": [
          24,
          22,
          23,
          21,
          20
        ],
        "cpu": 48,
        "jvm": 60,
        "storage": 64,
        "searchRate": 240,
        "indexingRate": 120
      },
      "alarm": {
        "threshold": 60,
        "triggerDelayMinutes": 3,
        "query": "SearchLatency[1m]{clusterId=\"demo-cluster\",nodeName=\"data-1\"}.mean() > 60",
        "transitions": [
          [
            "08:02",
            "OK"
          ],
          [
            "08:03",
            "Condition starts"
          ],
          [
            "08:06",
            "FIRING"
          ]
        ],
        "topic": "search-ops",
        "subscription": "Search Operations · confirmed email"
      },
      "queries": [
        {
          "id": "q-17",
          "index": "products-v1",
          "timestamp": "2026-10-21T08:07:20Z",
          "latency": 900,
          "cpu": 1800000000,
          "memory": 67108864
        },
        {
          "id": "q-09",
          "index": "products-v1",
          "timestamp": "2026-10-21T08:07:20Z",
          "latency": 220,
          "cpu": 300000000,
          "memory": 16777216
        },
        {
          "id": "q-04",
          "index": "products-v1",
          "timestamp": "2026-10-21T08:07:20Z",
          "latency": 140,
          "cpu": 140000000,
          "memory": 8388608
        }
      ],
      "selected": "q-17",
      "request": {
        "size": 20,
        "query": {
          "match": {
            "title": "backpack"
          }
        },
        "aggs": {
          "sku_facets": {
            "terms": {
              "field": "sku.keyword",
              "size": 10000
            }
          }
        }
      },
      "responseRequest": {
        "size": 20,
        "query": {
          "match": {
            "title": "backpack"
          }
        }
      },
      "acceptance": {
        "maxMinuteLatency": 30,
        "correctnessPassed": 100,
        "correctnessTotal": 100
      },
      "querySettings": {
        "persistent": {
          "search.insights.top_queries.latency.enabled": true,
          "search.insights.top_queries.latency.window_size": "5m",
          "search.insights.top_queries.latency.top_n_size": 3
        }
      },
      "queryResult": {
        "top_queries": [
          {
            "id": "q-17",
            "group_by": "NONE",
            "indices": [
              "products-v1"
            ],
            "source": "{\"size\":20,\"query\":{\"match\":{\"title\":\"backpack\"}},\"aggs\":{\"sku_facets\":{\"terms\":{\"field\":\"sku.keyword\",\"size\":10000}}}}",
            "source_truncated": false,
            "total_shards": 6,
            "measurements": {
              "latency": {
                "number": 900,
                "count": 1,
                "aggregationType": "NONE"
              },
              "cpu": {
                "number": 1800000000,
                "count": 1,
                "aggregationType": "NONE"
              },
              "memory": {
                "number": 67108864,
                "count": 1,
                "aggregationType": "NONE"
              }
            }
          }
        ]
      },
      "initialState": "Search latency departs from the declared workload baseline while shard allocation remains green.",
      "finalState": "Compare equivalent five-minute replays and check both latency and application correctness before accepting the response."
    }
  },
  "distributed": {
    "federated": {
      "id": "opensearch.distributed.federated",
      "version": 3,
      "owner": "distributed",
      "label": "Cross-cluster search",
      "title": "One search across participating clusters",
      "summary": "Query local and remote indexes without copying them into a central cluster.",
      "nodes": [
        [
          "Search client",
          "Authorized federated query",
          "search",
          "teal"
        ],
        [
          "Coordinating cluster",
          "Distributes the request",
          "network",
          "violet"
        ],
        [
          "Local + remote",
          "Indexes stay in their clusters",
          "layers",
          "amber"
        ],
        [
          "Combined results",
          "Review completeness",
          "list-checks",
          "teal"
        ]
      ],
      "edges": [
        "Query",
        "Fan out",
        "Combine"
      ],
      "steps": [
        [
          "Submit",
          "The application submits one authorized search for local and remote indexes."
        ],
        [
          "Distribute",
          "The coordinating cluster routes the request to the participating clusters."
        ],
        [
          "Search participating clusters",
          "Local and remote clusters search their permitted indexes; index data stays in place."
        ],
        [
          "Combine responses",
          "The coordinating cluster combines responses and returns the matching documents to the application."
        ]
      ],
      "outcome": "Investigate distributed indexed data through one search.",
      "consideration": "Check response completeness before acting: failed or skipped clusters can leave missing evidence.",
      "runbook": [
        "OCI CCS requires OpenSearch 2.11 or later and configured cross-cluster connections within OC1.",
        "Check supported version combinations: supported releases in one major version, or consecutive majors with the earlier major on its final minor release series.",
        "Configure connection IAM and network access, then grant search permissions on the coordinating and remote clusters.",
        "Inspect cluster and shard failures or skipped remotes before treating results as complete."
      ],
      "sources": [
        "cross",
        "search",
        "remoteSettings"
      ],
      "illustrative": true,
      "input": {
        "scenario": "federated"
      },
      "initialState": "The application submits one authorized search for local and remote indexes.",
      "finalState": "The coordinating cluster combines responses and returns the matching documents to the application.",
      "visual": "ccs",
      "presentation": "flow",
      "flowCaption": "Illustrative data flow · no live traffic",
      "code": {
        "label": "Bounded CCS request",
        "text": "GET /guides,remote_docs:guides/_search\n{\n  \"size\": 2,\n  \"query\": { \"match_all\": {} }\n}",
        "prerequisites": "Display only. Configure remote_docs as the remote alias and grant search access to both guides indexes."
      },
      "results": [
        {
          "source": "Local cluster",
          "index": "guides",
          "document": "Example: order search guide"
        },
        {
          "source": "Remote cluster (remote_docs)",
          "index": "guides",
          "document": "Example: delivery search guide"
        }
      ]
    }
  },
  "catalog": {
    "matches": {
      "id": "opensearch.catalog.matches",
      "version": 5,
      "owner": "catalog",
      "label": "Matching products",
      "title": "A preset keyword and category search",
      "summary": "Match daypack in the title and outdoors in the category.",
      "nodes": [
        [
          "Sample catalog",
          "Review the three sample products.",
          "search",
          "teal"
        ],
        [
          "Request conditions",
          "Match title daypack and filter category outdoors.",
          "search",
          "teal"
        ],
        [
          "Matching product",
          "Trail daypack meets both conditions.",
          "search",
          "teal"
        ]
      ],
      "edges": [
        "Investigate",
        "Inspect"
      ],
      "steps": [
        [
          "Sample catalog",
          "Review the three sample products."
        ],
        [
          "Request conditions",
          "Match title daypack and filter category outdoors."
        ],
        [
          "Matching product",
          "Trail daypack meets both conditions."
        ]
      ],
      "outcome": "Explain why the title match and category filter both matter.",
      "consideration": "Result quality depends on mappings, analyzers and catalog freshness; this small example does not measure relevance.",
      "runbook": [
        "Map product titles as text and categories as keyword fields. Keep ingestion writes separate from application search permissions."
      ],
      "sources": [
        "index",
        "search",
        "bool",
        "rbac",
        "connect"
      ],
      "illustrative": true,
      "input": {
        "keyword": "daypack",
        "category": "outdoors",
        "identity": "catalog-reader"
      },
      "initialState": "Review the three sample products.",
      "finalState": "Trail daypack meets both conditions.",
      "request": {
        "method": "POST",
        "path": "/catalog/_search",
        "body": {
          "size": 10,
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "title": "daypack"
                  }
                }
              ],
              "filter": [
                {
                  "term": {
                    "category": "outdoors"
                  }
                }
              ]
            }
          }
        }
      },
      "responseStatus": 200,
      "code": {
        "label": "OpenSearch 3.6 REST · search request",
        "text": "POST /catalog/_search\n{\n  \"size\": 10,\n  \"query\": {\n    \"bool\": {\n      \"must\": [\n        {\n          \"match\": {\n            \"title\": \"daypack\"\n          }\n        }\n      ],\n      \"filter\": [\n        {\n          \"term\": {\n            \"category\": \"outdoors\"\n          }\n        }\n      ]\n    }\n  }\n}",
        "prerequisites": "Display only. Requires title:text, category:keyword, indexed documents, private connectivity and an authorized search identity."
      },
      "json": {
        "label": "JSON · simulated response excerpt",
        "text": "{\n  \"hits\": {\n    \"total\": {\n      \"value\": 1,\n      \"relation\": \"eq\"\n    },\n    \"hits\": [\n      {\n        \"_index\": \"catalog\",\n        \"_id\": \"p-101\",\n        \"_source\": {\n          \"id\": \"p-101\",\n          \"title\": \"Trail daypack\",\n          \"category\": \"outdoors\",\n          \"price\": 49\n        }\n      }\n    ]\n  }\n}",
        "prerequisites": "Synthetic response excerpt. No measured scores, timing or service call."
      },
      "records": [
        {
          "id": "p-101",
          "title": "Trail daypack",
          "category": "outdoors",
          "price": 49
        },
        {
          "id": "p-102",
          "title": "City daypack",
          "category": "commute",
          "price": 39
        },
        {
          "id": "p-103",
          "title": "Trail bottle",
          "category": "outdoors",
          "price": 19
        }
      ],
      "responseId": "opensearch.catalog.matches.response",
      "presentation": "static"
    }
  },
  "logs": {
    "discover": {
      "id": "opensearch.logs.discover",
      "version": 1,
      "owner": "logs",
      "kind": "usecase",
      "captureIds": [
        "discover"
      ],
      "sources": [
        "workDiscover",
        "workPatterns",
        "connect",
        "rbac"
      ],
      "problem": "When an application behaves unexpectedly, teams need to find the relevant requests and see what its services recorded.",
      "outcome": "Search indexed application logs in OpenSearch Dashboards and Discover. Narrow the time window, examine fields such as service and severity, and open individual records to investigate errors and service behavior.",
      "prerequisite": "Collect and index application logs, map a timestamp field, and configure an index pattern with access to the relevant data.",
      "details": "Use a reachable private Dashboards endpoint and scoped cluster, index and saved-object permissions. Choose an index pattern and time field that match the indexed logs; missing or delayed logs limit the evidence."
    }
  },
  "auth": {
    "finding": {
      "id": "opensearch.auth.finding",
      "version": 1,
      "owner": "auth",
      "kind": "usecase",
      "captureIds": [
        "security-finding"
      ],
      "sources": [
        "plugins",
        "saOverview",
        "saFindings",
        "saDetectors",
        "saAccess"
      ],
      "problem": "Security teams need to connect suspicious log activity to the rule that flagged it and the events that warrant further investigation.",
      "outcome": "Configured Security Analytics detectors evaluate indexed security logs against selected rules. A finding links a rule match to its source document; surrounding documents in Discover provide context for an analyst’s decision.",
      "limitation": "A finding is an investigation lead, not a confirmed incident. Detection coverage depends on the ingested logs, field mappings and selected rules.",
      "prerequisite": "Ingest the required security logs, configure a detector’s log type, rules, field mappings and schedule, and grant the appropriate data and Security Analytics permissions.",
      "versionNote": "Use a supported OCI OpenSearch version with Security Analytics and its Dashboards plugin; confirm availability for your target version before configuring detectors. The documentation example uses Azure/AD log fields, which need appropriate ingestion and mappings.",
      "details": "Configure alert conditions and a notification channel when notifications are required. Assign scoped read, management or alert-acknowledgment access, and restrict access to finding and notification metadata."
    }
  }
};
window.FIXTURES.catalog.matches.response = window.RESPONSE_FIXTURES["opensearch.catalog.matches.response"].payload;
