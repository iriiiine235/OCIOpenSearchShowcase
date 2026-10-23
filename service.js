'use strict';
window.SERVICE = {
  "name": "OCI Search with OpenSearch",
  "shortName": "OCI OpenSearch",
  "icon": "search",
  "status": "Service showcase",
  "designDate": "15 October 2026",
  "reviewDate": "15 October 2026",
  "defaultWorkload": "catalog",
  "aliases": {
    "workloads": "patterns/catalog",
    "availability/resize": "capacity",
    "availability/history": "capacity",
    "capacity-history": "capacity"
  },
  "sources": {
    "obsVersion": [
      "OCI OpenSearch 3.6 support",
      "https://docs.oracle.com/en-us/iaas/releasenotes/search-opensearch/opensearch-v36-support.htm"
    ],
    "obsAlarm": [
      "Configure an OCI Monitoring alarm",
      "https://docs.oracle.com/en-us/iaas/Content/Monitoring/Tasks/create-alarm-basic.htm"
    ],
    "obsMql": [
      "Monitoring Query Language",
      "https://docs.oracle.com/en-us/iaas/Content/Monitoring/Reference/mql.htm"
    ],
    "obsNotify": [
      "OCI Notifications topics and subscriptions",
      "https://docs.oracle.com/en-us/iaas/Content/Notification/Concepts/notificationoverview.htm"
    ],
    "obsIam": [
      "Monitoring and alarm access",
      "https://docs.oracle.com/en-us/iaas/Content/Security/Reference/monitoring_security.htm"
    ],
    "obsTop": [
      "OpenSearch 3.6 Top N queries",
      "https://docs.opensearch.org/3.6/observing-your-data/query-insights/top-n-queries/"
    ],
    "obsPermissions": [
      "OpenSearch 3.6 permissions",
      "https://docs.opensearch.org/3.6/security/access-control/permissions/"
    ],
    "obsHealth": [
      "OpenSearch 3.6 cluster health",
      "https://docs.opensearch.org/3.6/api-reference/cluster-api/cluster-health/"
    ],
    "obsSlow": [
      "OpenSearch slow-log configuration (upstream)",
      "https://docs.opensearch.org/latest/install-and-configure/configuring-opensearch/logs/"
    ],
    "migrationSnapshots": [
      "Snapshot behavior and compatibility",
      "https://docs.opensearch.org/3.6/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/"
    ],
    "overview": [
      "Service overview",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/ociopensearch.htm"
    ],
    "nodes": [
      "Cluster configuration",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/creatingsearchclusters.htm"
    ],
    "ha": [
      "Availability and shard placement",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/high-availability.htm"
    ],
    "resize": [
      "Resizing constraints",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/resizingacluster.htm"
    ],
    "backup": [
      "Backup workflow choices",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/backup-restoration.htm"
    ],
    "daily": [
      "Automated backups",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/ociopensearchbackups.htm"
    ],
    "manual": [
      "Manual backups",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/manual-backups.htm"
    ],
    "snapshots": [
      "Searchable snapshots",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/searchable-snapshots.htm"
    ],
    "cross": [
      "CCS and CCR",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/opensearchcrossclustersearch.htm"
    ],
    "migration": [
      "Import an external cluster",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/importingacluster.htm"
    ],
    "metrics": [
      "Cluster metrics",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/ociopensearchmetrics.htm"
    ],
    "rbac": [
      "OpenSearch roles",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/clustersecurity.htm"
    ],
    "connect": [
      "Private connectivity",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/ingestingociopensearchdata.htm"
    ],
    "ingest": [
      "Data ingestion",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/ociopensearchingestingdata.htm"
    ],
    "releases": [
      "Service release notes",
      "https://docs.oracle.com/en-us/iaas/releasenotes/services/search-opensearch/"
    ],
    "search": [
      "OpenSearch 3.6 Search API",
      "https://docs.opensearch.org/3.6/api-reference/search-apis/search/"
    ],
    "bool": [
      "OpenSearch 3.6 Boolean queries",
      "https://docs.opensearch.org/3.6/query-dsl/compound/bool/"
    ],
    "index": [
      "OpenSearch 3.6 Index API",
      "https://docs.opensearch.org/3.6/api-reference/document-apis/index-document/"
    ],
    "createSnapshot": [
      "OpenSearch 3.6 snapshot creation",
      "https://docs.opensearch.org/3.6/api-reference/snapshots/create-snapshot/"
    ],
    "restore": [
      "OpenSearch 3.6 snapshot restoration",
      "https://docs.opensearch.org/3.6/api-reference/snapshots/restore-snapshot/"
    ],
    "range": [
      "OpenSearch 3.6 range queries",
      "https://docs.opensearch.org/3.6/query-dsl/term/range/"
    ],
    "histogram": [
      "Date histogram aggregation",
      "https://docs.opensearch.org/latest/aggregations/bucket/date-histogram/"
    ],
    "ccs": [
      "OpenSearch 3.6 CCS",
      "https://docs.opensearch.org/3.6/search-plugins/cross-cluster-search/"
    ],
    "plugins": [
      "Supported plugins",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/supportedplugins.htm"
    ],
    "shapes": [
      "Supported shapes",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/supportedchipsets.htm"
    ],
    "remoteSettings": [
      "OpenSearch 3.6 remote-cluster settings",
      "https://docs.opensearch.org/3.6/install-and-configure/configuring-opensearch/cluster-settings/"
    ],
    "createIndex": [
      "OpenSearch 3.6 index creation",
      "https://docs.opensearch.org/3.6/api-reference/index-apis/create-index/"
    ],
    "snapshotAPI": [
      "Snapshot repository workflow",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/snapshotapibackups.htm"
    ],
    "pipelines": [
      "OCI OpenSearch Pipelines",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/ociopensearchpipelines.htm"
    ],
    "createPipeline": [
      "Create a pipeline",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/create-pipeline.htm"
    ],
    "pipelineRelease": [
      "Data Prepper support",
      "https://docs.oracle.com/en-us/iaas/releasenotes/search-opensearch/data-prepper.htm"
    ],
    "workDiscover": [
      "OpenSearch 3.6 Discover",
      "https://docs.opensearch.org/3.6/dashboards/discover/index-discover/"
    ],
    "workPatterns": [
      "OpenSearch 3.6 index patterns",
      "https://docs.opensearch.org/3.6/dashboards/management/index-patterns/"
    ],
    "workDashboards": [
      "OpenSearch 3.6 dashboards",
      "https://docs.opensearch.org/3.6/dashboards/dashboard/index/"
    ],
    "workDql": [
      "OpenSearch 3.6 DQL",
      "https://docs.opensearch.org/3.6/dashboards/dql/"
    ],
    "resizeHorizontal": [
      "Horizontal resize guidance",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/resizehorizontal-opensearch-cluster.htm"
    ],
    "resizeML": [
      "ML-node scaling guidance",
      "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Tasks/manageociopensearch.htm"
    ],
    "saOverview": [
      "Security Analytics overview",
      "https://docs.opensearch.org/latest/security-analytics/usage/overview/"
    ],
    "saFindings": [
      "Findings and supporting documents",
      "https://docs.opensearch.org/latest/security-analytics/usage/findings/"
    ],
    "saDetectors": [
      "Configure detectors (OpenSearch 3.2)",
      "https://docs.opensearch.org/3.2/security-analytics/sec-analytics-config/detectors-config/"
    ],
    "saAccess": [
      "Security Analytics permissions (3.2)",
      "https://docs.opensearch.org/3.2/security-analytics/security/"
    ]
  },
  "glance": [
    [
      "Search",
      "Help people find products and content.",
      "catalog",
      "search",
      "teal"
    ],
    [
      "Observability",
      "Investigate application errors with indexed logs.",
      "logs",
      "activity",
      "violet"
    ],
    [
      "Security",
      "Explore sign-in events and investigate suspicious activity.",
      "auth",
      "shield-check",
      "amber"
    ]
  ],
  "overviewTitle": "The complete path from source to insight",
  "overviewFlow": [
    [
      "Your sources",
      "Application events, catalog files and sign-in records",
      "files",
      "teal"
    ],
    [
      "OCI OpenSearch Pipelines",
      "Data Prepper ingests and prepares your data",
      "workflow",
      "violet"
    ],
    [
      "OCI OpenSearch",
      "Index documents; search through authorized private access",
      "database",
      "amber"
    ],
    [
      "Application outcomes",
      "Find products, investigate errors and review security events",
      "chart-no-axes-combined",
      "teal"
    ]
  ],
  "overviewEdges": [
    "Prepare",
    "Query",
    "Act"
  ],
  "overviewBoundary": "Oracle manages the service infrastructure. Your team connects sources, configures pipelines and mappings, grants access, and validates data freshness and results.",
  "pages": {
    "overview": {
      "label": "Overview",
      "title": "OCI OpenSearch Showcase",
      "hero": "Your data, ready for useful answers",
      "summary": "Managed OpenSearch for search, observability and security investigation.",
      "icon": "search",
      "sources": [
        "overview",
        "nodes",
        "ingest",
        "search",
        "rbac",
        "pipelines"
      ],
      "help": {
        "Cluster": "An OCI-managed deployment containing nodes with distinct responsibilities.",
        "Index and shard": "Documents live in indexes, divided into primary and replica shards on data nodes.",
        "Ownership": "Oracle operates the managed infrastructure. Customers own ingestion, index design, capacity choices, access and application outcomes."
      }
    },
    "pipelines": {
      "label": "Pipelines",
      "title": "OCI OpenSearch Pipelines",
      "hero": "Bring your data into OpenSearch",
      "summary": "Choose how data arrives. Data Prepper processes it before indexing.",
      "icon": "workflow",
      "pillar": "Ingest",
      "tone": "violet",
      "tags": [
        "Pull",
        "Push"
      ],
      "renderer": "connectors",
      "panelTitle": "Choose a connector",
      "panelSummary": "Pull from a source, or push to an endpoint.",
      "sources": [
        "pipelines"
      ],
      "processorUrl": "https://docs.oracle.com/en-us/iaas/Content/search-opensearch/Concepts/ociopensearchpipelines.htm#ariaid-title4",
      "designDate": "21 October 2026",
      "reviewDate": "21 October 2026",
      "help": {
        "Pull connectors": "Object Storage scans or Kafka-compatible consumption from OCI Streaming and self-managed Kafka.",
        "Push connectors": "HTTP and OpenTelemetry endpoints require a dedicated OCI Streaming persistent buffer per pipeline.",
        "Before you start": "OC1 realm; OpenSearch 2.x or later. Configure source access, networking, IAM, Vault secrets and the target index.",
        "Scope": "Data Prepper ingestion pipelines. Illustrations do not run a pipeline or validate delivery."
      },
      "prerequisites": "OC1 · OpenSearch 2.x+. Configure source access, network/IAM permissions, Vault secrets and the target index."
    },
    "availability": {
      "label": "Availability",
      "summary": "OCI separates nodes across availability domains or fault domains. Follow one shard as its in-sync replica takes over.",
      "renderer": "availability",
      "panelTitle": "How a replica becomes primary",
      "sources": [
        "ha",
        "nodes"
      ],
      "help": {
        "Leader node": "Manages cluster state; it is distinct from a primary shard.",
        "Replica promotion": "An available in-sync shard replica can become primary. Client retry and recovery validation remain necessary.",
        "Domains": "Multi-AD regions use availability domains; single-AD regions use fault domains.",
        "Playback": "Six seconds per illustrated stage; pause or use Previous and Next to read at your pace. Timing is not a failover estimate."
      },
      "title": "Availability",
      "hero": "Keep serving through a data-node failure",
      "icon": "network",
      "pillar": "Foundation",
      "tone": "teal",
      "tags": [
        "Shard resilience",
        "Client retry"
      ],
      "panelSummary": "One data node fails. The surviving in-sync replica is promoted automatically; application retries reach the new primary.",
      "topology": {
        "modes": {
          "ad": {
            "label": "Multiple ADs",
            "domain": "Availability domain",
            "caption": "Multi-AD region · nodes are placed across separate availability domains."
          },
          "fd": {
            "label": "Single AD",
            "domain": "Fault domain",
            "caption": "Single-AD region · nodes are placed across separate fault domains within one availability domain."
          }
        },
        "notes": [
          [
            "Oracle manages",
            "Infrastructure provisioning and node placement across ADs or FDs."
          ],
          [
            "OpenSearch handles",
            "Domain-aware shard allocation and promotion of an available in-sync replica."
          ],
          [
            "You configure",
            "HA capacity, replica counts, access and application retries."
          ]
        ]
      },
      "designDate": "22 October 2026",
      "reviewDate": "21 October 2026"
    },
    "capacity": {
      "label": "Capacity & historical data",
      "title": "Capacity & historical data",
      "icon": "sliders-horizontal",
      "hero": "Plan capacity and access historical indexes",
      "summary": "Two independent planning choices: resize the cluster or query snapshot-backed indexes.",
      "sources": [
        "resize",
        "snapshots",
        "nodes",
        "snapshotAPI",
        "resizeHorizontal",
        "resizeML"
      ],
      "designDate": "22 October 2026",
      "reviewDate": "22 October 2026",
      "help": {
        "Choice": "Resizing and historical search solve different workload needs; they are not stages in a sequence.",
        "Ownership": "Customers choose capacity and repositories. This guide provisions nothing.",
        "Boundary": "Historical search is not managed-backup restoration. See Recovery for recovery options.",
        "Eligibility": "Node counts can be reduced where supported. Verify the selected role and cluster; the owner’s observed reductions conflict with the general guide."
      }
    },
    "recovery": {
      "label": "Recovery",
      "summary": "Cross-cluster replication (CCR) maintains a replicated follower. Managed restore recovers a retained managed backup. Snapshot & restore recovers selected indexes from a repository snapshot.",
      "renderer": "scenario",
      "panelTitle": "Choose a recovery option",
      "sources": [
        "backup",
        "daily",
        "manual",
        "cross",
        "restore",
        "snapshotAPI"
      ],
      "help": {
        "Managed backup": "An OCI backup resource created daily or on demand and recovered through managed restore.",
        "Repository snapshot": "An OpenSearch Snapshot API capture stored in a customer Object Storage repository. It is separate from the managed backup list.",
        "Cross-cluster replication (CCR)": "Copies index changes between configured clusters. It is a standby strategy, not a retained backup.",
        "RPO / RTO": "Targets for acceptable data loss and recovery duration; validate them in recovery rehearsals."
      },
      "comparison": {
        "headers": [
          "Option",
          "Available recovery data",
          "What determines recovery time",
          "When to use it"
        ],
        "rows": [
          [
            "CCR standby",
            "Latest replicated changes",
            "Lag assessment, operator decision and application cutover",
            "Prepare another cluster before an incident"
          ],
          [
            "Managed restore",
            "A retained daily or manual managed backup",
            "Target preparation, restore work and validation",
            "Recover data from an available managed backup"
          ],
          [
            "Snapshot & restore",
            "Selected indexes in a repository snapshot",
            "Index volume, target readiness and validation",
            "Control which indexes to recover"
          ]
        ]
      },
      "benefits": [
        "Use the same recovery criteria when comparing standby and backup options.",
        "Choose index-level control when a full managed restore is not the intended workflow."
      ],
      "considerations": [
        "Rehearse with representative data and application checks.",
        "Measure data loss and downtime against your objectives; no fixed recovery time is promised."
      ],
      "title": "Data protection & disaster recovery",
      "hero": "Prepare a standby or restore a backup",
      "icon": "shield-check",
      "pillar": "Protect",
      "tone": "coral",
      "tags": [
        "Backups",
        "CCR"
      ],
      "panelSummary": "Choose based on the copy you need and the recovery work your team can perform.",
      "compactDetails": true,
      "storyHeading": "Recovery steps",
      "outcomeLabel": "Operator decision",
      "considerationLabel": "Key limitations",
      "detailsTitle": "Operator prerequisites",
      "comparisonBadge": "",
      "designDate": "22 October 2026",
      "reviewDate": "21 October 2026",
      "comparisonTitle": "Choose standby or backup recovery",
      "hideTradeoffs": true
    },
    "migration": {
      "designDate": "21 October 2026",
      "label": "Migration",
      "summary": "Rehearse the move, establish a write boundary, and approve application cutover from validation evidence.",
      "renderer": "migration",
      "panelTitle": "Snapshot migration walkthrough",
      "sources": [
        "migration",
        "migrationSnapshots",
        "createSnapshot",
        "restore",
        "releases"
      ],
      "help": {
        "Snapshot migration": "Transfers captured index data through a repository; it does not synchronize later changes.",
        "Compatibility": "A prerequisite for migration, checked against the actual source and target versions and rehearsed on an isolated target.",
        "Rollback": "A tested operator plan. Destination writes require reconciliation before returning to the source, unless the resulting data loss is explicitly accepted."
      },
      "title": "Snapshot migration",
      "hero": "Move indexed data with a tested plan",
      "icon": "arrow-right-left",
      "pillar": "Move",
      "tone": "teal",
      "tags": [
        "Snapshots",
        "Compatibility"
      ],
      "reviewDate": "21 October 2026",
      "readiness": [
        [
          "Access and target",
          "Prepare private connectivity, cluster and bucket permissions, and repository access. Oracle’s import guide requires the destination to match the source node configuration."
        ],
        [
          "Application acceptance",
          "Record checks for index completeness, representative search results, ingestion, identities and integrations. Restore alone does not configure application access or switch clients."
        ],
        [
          "Rollback after destination writes",
          "Test the rollback plan before cutover. Once the destination accepts writes, the source is stale: reconcile those changes before returning, or explicitly approve the resulting data loss. Repointing clients alone is insufficient."
        ]
      ]
    },
    "observability": {
      "label": "Observability",
      "summary": "Follow one slow-search incident from cluster telemetry to an operator-tested query change.",
      "renderer": "observability",
      "panelTitle": "Investigate a slow search",
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
      "help": {
        "OCI service metrics": "Automatically emitted telemetry in oci_opensearch. Access still requires OCI permissions.",
        "OCI Monitoring alarm": "A customer-configured metric rule with an evaluation interval and trigger delay. Notifications routes messages to configured subscriptions.",
        "Query Insights": "Separately configured Top N query collection on a supported OpenSearch version; distinct from OCI service metrics.",
        "Slow logs": "Threshold-based logging with separate output access requirements. A supported OCI output path has not been verified here."
      },
      "comparison": {
        "headers": [
          "Signal",
          "Unit / meaning",
          "What it helps investigate"
        ],
        "rows": [
          [
            "CPUUtilization / JVMMemoryPressure",
            "% CPU / % JVM heap in use",
            "Resource pressure; correlate with demand and query changes."
          ],
          [
            "SearchLatency / IndexingLatency",
            "ms; selected stream and statistic",
            "Latency trends, not end-user percentiles or a query-level trace."
          ],
          [
            "SearchRate / IndexingRate",
            "Operations/minute",
            "Changing demand; compare equivalent windows."
          ],
          [
            "CurrentClusterStorage",
            "GB; total cluster storage",
            "Storage growth and capacity planning."
          ],
          [
            "OpenSearch cluster health",
            "Green / yellow / red shard allocation",
            "Separate Health API check; green does not guarantee fast searches."
          ],
          [
            "Missing samples",
            "Unknown, never zero",
            "Check access, dimensions, timestamps and telemetry cadence."
          ]
        ]
      },
      "title": "Observability & operations",
      "hero": "Monitor cluster health and investigate slow searches.",
      "icon": "activity",
      "pillar": "Operate",
      "tone": "teal",
      "tags": [
        "Service metrics",
        "Response"
      ],
      "reviewDate": "21 October 2026",
      "designDate": "21 October 2026"
    },
    "security": {
      "label": "Security",
      "title": "Security & governance",
      "hero": "Separate management, network and data access",
      "summary": "Give administrators, writers, readers and analysts only the access their work requires, and retain clear ownership of data and incident response.",
      "icon": "lock-keyhole",
      "pillar": "Govern",
      "tone": "violet",
      "tags": [
        "IAM and network",
        "Data roles"
      ],
      "sources": [
        "overview",
        "connect",
        "rbac",
        "plugins"
      ],
      "help": {
        "OCI IAM": "Controls management of service resources.",
        "Private endpoint": "Provides network access after reachability and security rules are configured.",
        "Data roles": "OpenSearch users and role mappings control index operations.",
        "Customer governance": "Retention, identity lifecycle, access reviews and incident response remain customer decisions."
      },
      "layers": [
        [
          "OCI management identity",
          "Administrators manage cluster resources under OCI IAM. Management permission is separate from index data access.",
          "user",
          "teal"
        ],
        [
          "Private network boundary",
          "Customers configure VCN reachability, security rules and trusted TLS connections to API and Dashboards endpoints.",
          "network",
          "violet"
        ],
        [
          "OpenSearch data authorization",
          "Separate ingestion writers, application readers and security analysts; verify role mappings and index permissions.",
          "key",
          "amber"
        ],
        [
          "Data lifecycle and response",
          "Customers design retention, review access, manage credentials and investigate application/security incidents.",
          "shield-check",
          "coral"
        ]
      ],
      "comparison": {
        "headers": [
          "Control",
          "Protects",
          "Responsibility",
          "Consideration"
        ],
        "rows": [
          [
            "OCI IAM",
            "Service-resource management",
            "Customer policies; Oracle enforces service permissions",
            "Does not grant automatic index search access"
          ],
          [
            "Private connectivity",
            "Network path",
            "Customer routes and security rules",
            "Reachability alone does not authorize data"
          ],
          [
            "Ingestion identity",
            "Catalog or event writes",
            "Customer role and mapping",
            "Avoid using the primary administrator account"
          ],
          [
            "Search identity",
            "Application query scope",
            "Customer read permissions",
            "Denied requests must remain distinct from empty results"
          ],
          [
            "Security analyst",
            "Permitted event investigation",
            "Customer index scope and review",
            "No automatic incident containment"
          ],
          [
            "Retention and credentials",
            "Data lifecycle and identities",
            "Customer review and procedures",
            "Repository lifecycle and index retention need coordination"
          ]
        ]
      },
      "consideration": "Check the cluster security mode and test least-privilege roles before granting access.",
      "designDate": "22 October 2026"
    },
    "patterns": {
      "label": "Workload patterns",
      "title": "Workload patterns",
      "hero": "Explore what you can build with OpenSearch.",
      "summary": "Choose product search, application-log investigation or security findings. Explore a focused example and the setup it needs.",
      "icon": "blocks",
      "pillar": "Apply",
      "tone": "teal",
      "tags": [
        "Search",
        "Investigation"
      ],
      "sources": [
        "search",
        "workDiscover",
        "saFindings",
        "plugins"
      ],
      "help": {
        "Patterns": "Three use cases: preset product search, indexed application logs and security findings.",
        "Examples": "Product results are synthetic. Application Logs uses a supplied capture; Security Analytics uses an attributed documentation example."
      },
      "reviewDate": "22 October 2026",
      "designDate": "22 October 2026"
    },
    "distributed": {
      "label": "Distributed search",
      "summary": "Search permitted indexes across local and remote clusters while keeping each index in its source cluster.",
      "renderer": "distributed",
      "panelTitle": "One search across participating clusters",
      "sources": [
        "cross",
        "ccs",
        "search",
        "remoteSettings"
      ],
      "help": {
        "CCS": "Cross-cluster search queries remote indexes without creating recovery copies.",
        "CCR": "Cross-cluster replication copies index changes; see Recovery.",
        "Remote coverage": "A failed or skipped cluster is missing evidence, not evidence of no matches."
      },
      "title": "Distributed search",
      "hero": "Search across clusters with clear boundaries",
      "icon": "waypoints",
      "pillar": "Connect",
      "tone": "violet",
      "tags": [
        "CCS",
        "Coverage"
      ],
      "storyHeading": "How the search reaches each cluster",
      "designDate": "22 October 2026",
      "reviewDate": "22 October 2026"
    }
  },
  "workloads": {
    "catalog": {
      "label": "Product catalog search",
      "summary": "See how one keyword and category filter select a product from a small catalog.",
      "renderer": "catalog",
      "sources": [
        "index",
        "search",
        "bool",
        "rbac",
        "connect",
        "createIndex"
      ],
      "help": {
        "Pattern": "See how one keyword and category filter select a product from a small catalog.",
        "Prerequisites": "Map product titles as text and categories as keyword fields. Verify private connectivity and refresh indexed data before searching. Keep ingestion writes separate from application search permissions.",
        "Boundary": "Preset synthetic documents and response; no live query or relevance measurement."
      },
      "pillar": "Customer story",
      "tags": [],
      "setup": {
        "label": "OpenSearch 3.6 REST · catalog preparation",
        "text": "PUT /catalog\n{\n  \"mappings\": {\n    \"properties\": {\n      \"title\": {\"type\": \"text\"},\n      \"category\": {\"type\": \"keyword\"},\n      \"price\": {\"type\": \"float\"}\n    }\n  }\n}\n\nPUT /catalog/_doc/p-101\n{\n  \"id\": \"p-101\",\n  \"title\": \"Trail daypack\",\n  \"category\": \"outdoors\",\n  \"price\": 49\n}\n\nPUT /catalog/_doc/p-102\n{\n  \"id\": \"p-102\",\n  \"title\": \"City daypack\",\n  \"category\": \"commute\",\n  \"price\": 39\n}\n\nPUT /catalog/_doc/p-103\n{\n  \"id\": \"p-103\",\n  \"title\": \"Trail bottle\",\n  \"category\": \"outdoors\",\n  \"price\": 19\n}",
        "prerequisites": "Display only. Creates the catalog index and writes synthetic documents when executed in an authorized environment. Requires create/index permissions and private connectivity; wait for index refresh before searching. No operation executes in this showcase."
      },
      "ingestionLink": "#pipelines/catalog",
      "selectorLabel": "Product search",
      "patternTitle": "Find a product",
      "prerequisite": "Map product titles as text and categories as keyword fields. Verify private connectivity and refresh indexed data before searching. Keep ingestion writes separate from application search permissions.",
      "reviewDate": "22 October 2026",
      "designDate": "22 October 2026",
      "hero": "Help shoppers find the right product",
      "cardProblem": "Shoppers need to find a relevant product in a catalog.",
      "cardOutcome": "Find products using keywords and category filters.",
      "action": "Explore product search",
      "icon": "shopping-bag",
      "tone": "teal"
    },
    "logs": {
      "label": "Application Logs",
      "summary": "When an application behaves unexpectedly, teams need to find the relevant requests and see what its services recorded.",
      "renderer": "logs",
      "sources": [
        "workDiscover",
        "workPatterns",
        "connect",
        "rbac"
      ],
      "help": {
        "Discover": "Explore indexed documents by time, query and field; the supplied image is static.",
        "Scope": "Application logs belong here; cluster metrics belong to Observability."
      },
      "ingestionLink": "#pipelines/logs",
      "selectorLabel": "Application Logs",
      "prerequisite": "Collect and index application logs, map a timestamp field, and configure an index pattern with access to the relevant data.",
      "reviewDate": "22 October 2026",
      "designDate": "22 October 2026",
      "hero": "Investigate errors and application service behavior.",
      "cardProblem": "Find what an application recorded when requests failed or behavior changed.",
      "cardOutcome": "Use Discover to inspect indexed logs and their context.",
      "action": "Explore application logs",
      "icon": "activity",
      "tone": "amber"
    },
    "auth": {
      "label": "Security Analytics",
      "summary": "Security teams need to connect suspicious log activity to the rule that flagged it and the events that warrant further investigation.",
      "renderer": "auth",
      "sources": [
        "plugins",
        "saOverview",
        "saFindings",
        "saDetectors",
        "saAccess"
      ],
      "help": {
        "Finding": "A rule match requiring analyst investigation, not proof of an incident.",
        "Configuration": "Log ingestion, detectors, rules, permissions and notification routing must be configured."
      },
      "ingestionLink": "#pipelines/auth",
      "selectorLabel": "Security Analytics",
      "prerequisite": "Ingest the required security logs, configure a detector’s log type, rules, field mappings and schedule, and grant the appropriate data and Security Analytics permissions.",
      "reviewDate": "22 October 2026",
      "designDate": "22 October 2026",
      "hero": "Investigate security findings with supporting log evidence.",
      "cardProblem": "Understand why security activity was flagged and what evidence supports investigation.",
      "cardOutcome": "Connect a configured detection rule to a finding and its source document.",
      "action": "Explore security analytics",
      "icon": "shield-check",
      "tone": "violet"
    }
  },
  "showcaseTitle": "OCI OpenSearch Showcase",
  "journeys": [
    [
      "pipelines",
      "Ingest",
      "Connect sources to indexed data.",
      "Data Prepper",
      "Source → index"
    ],
    [
      "availability",
      "Foundation",
      "See how OCI separates failure domains.",
      "AD / FD",
      "Resilience"
    ],
    [
      "recovery",
      "Recover",
      "Keep a CCR standby and retain recovery points.",
      "CCR",
      "Backups"
    ],
    [
      "migration",
      "Adopt",
      "Move data with a validated cutover plan.",
      "Snapshots",
      "Validation"
    ],
    [
      "observability",
      "Operate",
      "Monitor the cluster and investigate pressure.",
      "Metrics",
      "Operations"
    ],
    [
      "security",
      "Govern",
      "Separate management, network and data access.",
      "Access",
      "Ownership"
    ],
    [
      "patterns",
      "Explore",
      "Use indexed data for search and investigation.",
      "Search",
      "Analytics"
    ],
    [
      "distributed",
      "Connect",
      "Query across clusters and check coverage.",
      "CCS",
      "Completeness"
    ]
  ]
};
window.SERVICE.pages.availability.scenarios = window.FIXTURES.availability;
window.SERVICE.pages.recovery.scenarios = window.FIXTURES.recovery;
window.SERVICE.pages.migration.scenarios = window.FIXTURES.migration;
window.SERVICE.pages.observability.scenarios = window.FIXTURES.observability;
window.SERVICE.pages.distributed.scenarios = window.FIXTURES.distributed;
window.SERVICE.workloads.catalog.scenarios = window.FIXTURES.catalog;
window.SERVICE.workloads.logs.scenarios = window.FIXTURES.logs;
window.SERVICE.workloads.auth.scenarios = window.FIXTURES.auth;

window.SERVICE.pages.pipelines.scenarios = window.FIXTURES.pipelines;

window.SERVICE.pages.capacity.scenarios = window.FIXTURES.capacity;
