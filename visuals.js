'use strict';
(() => {
  const V = {};
  const node = (h,label,description,icon='database',tone='teal',state='') =>
    '<div class="node '+(state==='Unavailable'?'failed':state?'active':'')+'">'+h.iconTile(icon,tone)+'<strong>'+h.escape(label)+'</strong><small>'+h.escape(description)+'</small>'+(state?'<span class="node-state">'+h.escape(state)+'</span>':'')+'</div>';
  const caption=(h,s)=>'<p class="diagram-caption">'+h.escape(s)+'</p>';
  const edge=(h,s)=>'<p class="branch-label"><span aria-hidden="true">↓ </span>'+h.escape(s)+'</p>';
  V.availability=(mode,h)=>'<div class="ha-region"><p class="region-label">'+h.escape(mode.caption)+'</p><div class="ha-domains">'+[1,2,3].map(i=>'<section class="ha-domain"><h3>'+h.escape(mode.domain)+' '+i+'</h3><div class="ha-node">'+h.iconTile('network','violet')+'<span><strong>Leader '+i+'</strong><small>Cluster coordination</small></span></div><div class="ha-node">'+h.iconTile('layers',i===1?'amber':'teal')+'<span><strong>Data node '+i+'</strong><small>'+(i===1?'Shard 0 · primary':i===2?'Shard 0 · replica':'Other shards · capacity')+'</small></span></div>'+(i<3?'<div class="ha-node">'+h.iconTile('chart-no-axes-combined','teal')+'<span><strong>Dashboards '+i+'</strong><small>Visualization interface</small></span></div>':'<p class="domain-note">Three leaders protect cluster coordination.</p>')+'</section>').join('')+'<p class="shard-link">Primary and replica copies separated across domains</p></div><div class="ha-access"><span>Analysts</span><span aria-hidden="true">→</span><strong>Load balancer</strong><span aria-hidden="true">→</span><span>Dashboards 1 + 2</span></div></div><p class="diagram-caption">Example HA configuration. Placement is best effort and needs healthy nodes, configured replicas and spare capacity. Regional HA does not replace disaster recovery.</p>';
  V.snapshot=(f,step,h)=>{
    const repository=f.input.scenario==='repository';
    const nodes=repository?[
      ['Source indexes','Indexes selected for capture','layers','teal'],
      ['Object Storage','Customer snapshot repository','cloud','violet'],
      ['Target indexes','Selected indexes in a compatible target','database','amber'],
      ['Application','Validation and planned cutover','app-window','teal']
    ]:[
      ['Managed backup','Selected daily or manual backup','archive','teal'],
      ['Restore target','Source or prepared new cluster','database','violet'],
      ['Validation','Data, access and application checks','list-checks','amber'],
      ['Application','Resumption after operator approval','app-window','teal']
    ];
    return '<div class="recovery-visual">'+h.flow(nodes,step,repository?['Snapshot','Restore','Validate & switch']:['Restore','Validate','Resume'],'Illustrated stage')+'</div>';
  };
  V.promotion=(f,step,h)=>{
    const failed=step>=1, promoted=step>=2;
    return h.flow([['Application',step===1?'Request interrupted; owns retry':step===3?'Reconnect, retry and validate':'Index and query client','app-window','teal'],['Private API','Cluster entry; verify reachability after an incident','network','violet']],step===3?0:1,['Connect'])
      +edge(h,failed&&!promoted?'Interrupted shard route':promoted?'Route to surviving shard copy':'Route operations to shard copies')
      +'<div class="domain-grid"><section class="domain"><h4>Fault domain 1</h4>'+node(h,'Leader 1','Cluster-state quorum peer','network','violet')+node(h,'Data node A · shard 0',failed?'Former primary unavailable':'Primary shard','layers',failed?'coral':'amber',failed?'Unavailable':'Primary')+'</section><section class="domain"><h4>Fault domain 2</h4>'+node(h,'Leader 2','Cluster-state quorum peer','network','violet')+node(h,'Data node B · shard 0',promoted?'Promoted primary; replica coverage still needs repair':'In-sync replica shard','layers','teal',promoted?'Primary after promotion':'Replica')+'</section><section class="domain"><h4>Fault domain 3</h4>'+node(h,'Leader 3','Cluster-state quorum peer; no shard-0 data copy here','network','violet')+'</section></div>'
      +caption(h,'Single-AD placement illustration: three separate leaders form the leader quorum. Only data node A fails in this scenario. Dashboards has a separate access path with at least two nodes for HA. Multi-AD regions use AD placement.')
      +caption(h,step===3?'Client retries are an application responsibility. No endpoint-stability or recovery-time guarantee is assumed.':'Primary/replica labels describe shard copies, not whole-cluster database roles.');
  };
  V.ccr=(f,step,h)=>'<div class="recovery-visual ccr-visual'+(step===0?' replicating':'')+'">'+h.flow([['Leader cluster',step===0?'Source index receives application writes':step===1?'Incident: assess availability':'Original source · recovery/failback pending','database','teal'],['Follower cluster',step<2?'Read-only index · monitor replication lag':'Replication stopped · standard writable index','copy','violet']],step<2?0:1,[step===0?'Asynchronous replication':step===1?'Assess replication progress':'Replication stopped'])+'<div class="cutover-path">'+h.iconTile('app-window','amber')+'<div><strong>'+(step===3?'Application → former follower':'Application → leader cluster')+'</strong><p>'+h.escape(step===3?'Customer redirects writes, validates the new path and plans failback.':step===2?'Customer stops replication before switching writes.':step===1?'Customer assesses the recovery point; unknown lag is not zero.':'Customer configures replication and defines recovery criteria.')+'</p></div></div></div>'+caption(h,'Index leader/follower roles differ from cluster leader nodes. Deletions also replicate; keep independent backups.');
  V.ccrSteady=(f,step,h)=>'<div class="replication-diagram">'+h.stream([['Leader cluster','Primary region · index accepts writes','database','coral'],['Follower cluster','Recovery region · replicated index stays read-only','database','teal']],['Asynchronous index replication'])+'</div><p class="diagram-caption">Example: clusters in different OC1 regions.</p>';
  V.ccs=(f,step,h)=>h.flow([['Search client','Authorized request','search','teal'],['Coordinating cluster','Distributes queries and combines responses','network','violet']],step===0?0:1,['Query'],'Coordinates search')
      +'<div class="branch-grid"><section>'+edge(h,'Search local indexes')+h.flow([['Local cluster','guides index; local search permissions','layers','amber']],-1)+'</section><section>'+edge(h,'Search remote indexes')+h.flow([['Remote cluster','remote_docs alias; remote search permissions','database','teal']],-1)+'</section></div>'
    +edge(h,'Return results to coordinating cluster')
      +caption(h,'Combine matching documents; indexes remain in their source clusters.');
  V.catalog=(f,step,h)=>{
    const denied=f.responseStatus===403;
    return '<div class="branch-grid client-paths"><section><h4>Ingestion path</h4>'+h.flow([['Ingestion client','Separate catalog-writer identity','upload','teal']])+edge(h,'Write to the shared API below')+'</section><section><h4>Search path</h4>'+h.flow([['Search client','Application search identity','search','violet']])+edge(h,'Query the shared API below')+'</section></div>'
      +caption(h,'Two independent clients enter the same private API; neither client forwards requests through the other.')
      +h.flow([['Private API','Network reachability and OpenSearch authorization','network','violet']],step===1?0:-1)
      +'<div class="branch-grid"><section>'+edge(h,denied&&step>=2?'Rejected before data access':'Authorized operations')+node(h,denied&&step>=2?'Data nodes · not queried':'Data nodes',denied&&step>=2?'Catalog retained; denied request returns no index data':'Index shards contain the synthetic catalog','layers','amber',!denied&&step>=2?'Search permitted':'')+'</section><section>'+edge(h,'Cluster management; separate role')+node(h,'Leader nodes','Manage cluster state and shard allocation','network','teal')+'</section></div>'
      +(step===3?'<div class="answer" role="status"><strong>'+h.escape(denied?'403 · access denied':f.response.hits.total.value?'1 matching product':'0 matching products')+'</strong><p>'+h.escape(f.finalState)+'</p></div>':caption(h,'Synthetic catalog: Trail daypack / outdoors; City daypack / commute; Trail bottle / outdoors.'))
      +caption(h,'No request goes from the search client through the ingestion client. Data nodes serve indexed data; leader nodes coordinate cluster state.');
  };
  V.logs=(f,step,h)=>{
    let out=h.flow(f.nodes,Math.min(step,3),f.edges);
    if(step>=2){
      const buckets=f.response.aggregations.errors_by_minute.buckets;
      out+='<div class="event-trend" aria-label="Illustrative indexed ERROR counts by UTC minute"><strong>Indexed ERROR events · illustrative</strong>';
      for(const b of buckets)out+='<div class="trend-row"><span>'+h.escape(b.key_as_string.slice(11,16))+' UTC</span><span class="trend-track"><span style="width:'+b.doc_count*34+'%"></span></span><strong>'+b.doc_count+'</strong></div>';
      out+='<p>'+h.escape(f.input.buffered?f.input.buffered+' additional ERROR events remain buffered; freshness is incomplete.':'All four source events are indexed; three are errors.')+'</p></div>';
    }
    return out+caption(h,'Application logs are customer-collected. OCI service metrics monitor the OpenSearch cluster separately.');
  };
  V.auth=(f,step,h)=>{
    let out=h.flow(f.nodes,Math.min(step,3),f.edges);
    if(step>=2)out+='<ol class="event-timeline" aria-label="Synthetic sign-in sequence">'+f.records.map(r=>'<li><strong>'+h.escape(r['@timestamp'].slice(11,19))+' UTC · '+h.escape(r.outcome)+'</strong><span>'+h.escape(r.user+' · '+r.source_ip+' · '+r.application)+'</span></li>').join('')+'</ol>';
    return out+caption(h,step===3?f.finalState:'Analyst investigation only. A sequence of events does not itself prove compromise.');
  };
  window.SERVICE_VISUALS=V;
  const modules=[...Object.values(window.SERVICE.pages),...Object.values(window.SERVICE.workloads)];
  for(const m of modules)for(const f of Object.values(m.scenarios||{}))if(f.visual)f.renderVisual=(step,h)=>V[f.visual](f,step,h);
})();

