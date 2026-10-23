'use strict';
window.DistributedPage = {
  render(m,h){
    const f=m.scenarios.federated,e=h.escape;
    const results='<div class="table-scroll" tabindex="0" role="region" aria-label="Simulated results by source"><table><thead><tr><th scope="col">Source</th><th scope="col">Index</th><th scope="col">Example result</th></tr></thead><tbody>'+f.results.map(r=>'<tr><th scope="row">'+e(r.source)+'</th><td>'+e(r.index)+'</td><td>'+e(r.document)+'</td></tr>').join('')+'</tbody></table></div>';
    const details='<details class="operator-details"><summary>Connections, compatibility and permissions</summary><ul>'+f.runbook.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul><div class="code"><div class="code-head"><span>'+e(f.code.label)+'</span><span>Display only</span></div><pre><code>'+e(f.code.text)+'</code></pre><p>'+e(f.code.prerequisites)+'</p></div></details>';
    return h.panel(f.title,'<div class="diagram story-diagram ambient-flow" data-visual>'+window.SERVICE_VISUALS.ccs(f,3,h)+'</div><h3>Search results by source</h3>'+results+'<p class="note">'+e(f.consideration)+'</p><h3 class="story-heading">How the search reaches each cluster</h3>'+window.ShowcasePresentation.stages(f,h)+details,'','','Simulated search')+h.panel('Search across clusters or replicate data?','<p>CCS queries indexes where they are stored. CCR maintains a replicated follower for a different purpose: <a href="#recovery">explore standby and recovery options</a>.</p>','','','');
  },
  init(root,media){return window.ShowcasePresentation.mountMotion(root,media,document);}
};
