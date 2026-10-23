'use strict';
window.CapacityPage = {
  render(m,h){
    const e=h.escape,r=m.scenarios.resize,s=m.scenarios.history;
    const sources=f=>'<div class="source-list">'+f.sources.map(k=>'<a href="'+e(window.SERVICE.sources[k][1])+'" target="_blank" rel="noopener noreferrer">'+e(window.SERVICE.sources[k][0])+'</a>').join('')+'</div>';
    const resize='<div class="responsibilities">'+r.choices.map(([a,b])=>'<div><h3>'+e(a)+'</h3><p>'+e(b)+'</p></div>').join('')+'</div><p class="note"><strong>Plan writes:</strong> '+e(r.consideration)+'</p><details class="operator-details"><summary>Readiness and official guidance</summary><p>'+e(r.prerequisite)+'</p>'+sources(r)+'</details>';
    const history='<div class="capacity-path" aria-label="Historical search architecture"><div>'+h.iconTile('search','teal')+'<strong>Search nodes</strong><span>Query snapshot-backed indexes</span></div><span aria-hidden="true">↔</span><div>'+h.iconTile('hard-drive','teal')+'<strong>Local cache</strong><span>Frequently queried segments</span></div><span aria-hidden="true">↔</span><div>'+h.iconTile('archive','teal')+'<strong>Object Storage</strong><span>Customer snapshot repository</span></div></div><p>'+e(s.consideration)+'</p><p>No automatic tiering or retention is configured by choosing this pattern. <a href="#recovery">Backup restoration and DR →</a></p><details class="operator-details"><summary>Repository and search-node prerequisites</summary><p>'+e(s.prerequisite)+'</p><p>Customers own snapshot selection, retention and any separately configured lifecycle policy.</p>'+sources(s)+'</details>';
    return '<div class="capacity-page">'+h.panel(r.label,resize,r.summary,'Resource planning','')+h.panel(s.label,history,s.summary,'Historical access','')+'</div>';
  }
};
