'use strict';
window.SERVICE.renderers ??= {};
window.SERVICE.initializers ??= {};
window.AuthPattern = {
  render(m){
    const h=window.ShowcaseComponents.helpers,f=m.scenarios.finding;
    return '<div class="workload-pattern">'+h.panel('Connect a finding to its evidence','<p>'+h.escape(f.outcome)+'</p>'+(f.limitation?'<p class="note">'+h.escape(f.limitation)+'</p>':''),'','','Security Analytics')+
      window.CaptureGallery.render(h,window.SECURITY_CAPTURES.filter(x=>f.captureIds.includes(x.id)))+
      h.panel('Before you start','<p>'+h.escape(f.prerequisite)+'</p><details class="operator-details"><summary>Version, access and documentation</summary>'+(f.versionNote?'<p>'+h.escape(f.versionNote)+'</p>':'')+'<p>'+h.escape(f.details)+'</p><p><a class="ingestion-link" href="#pipelines">Collection and ingestion: Pipelines</a></p><div class="source-list">'+m.sources.map(k=>'<a href="'+h.escape(window.SERVICE.sources[k][1])+'" target="_blank" rel="noopener noreferrer">'+h.escape(window.SERVICE.sources[k][0])+'</a>').join('')+'</div></details>','','','Prerequisites')+'</div>';
  },
  mount(){return window.CaptureGallery.mount(document.querySelector('main'),window.SECURITY_CAPTURES);}
};
window.SERVICE.renderers.auth=m=>window.AuthPattern.render(m);
window.SERVICE.initializers.auth=()=>window.AuthPattern.mount();
