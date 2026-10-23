'use strict';
window.SERVICE.renderers ??= {};
window.SERVICE.initializers ??= {};
window.LogsPattern = {
  render(m){
    const h=window.ShowcaseComponents.helpers,f=m.scenarios.discover;
    return '<div class="workload-pattern">'+h.panel('Investigate service behavior','<p>'+h.escape(f.outcome)+'</p>'+(f.limitation?'<p class="note">'+h.escape(f.limitation)+'</p>':''),'','','Application Logs')+
      window.CaptureGallery.render(h,window.APPLICATION_CAPTURES.filter(x=>f.captureIds.includes(x.id)))+
      h.panel('Before you start','<p>'+h.escape(f.prerequisite)+'</p><details class="operator-details"><summary>Access and documentation</summary>'+(f.versionNote?'<p>'+h.escape(f.versionNote)+'</p>':'')+'<p>'+h.escape(f.details)+'</p><p><a class="ingestion-link" href="#pipelines">Collection and ingestion: Pipelines</a> · <a href="#observability">Monitor the OpenSearch cluster: Observability</a></p><div class="source-list">'+m.sources.map(k=>'<a href="'+h.escape(window.SERVICE.sources[k][1])+'" target="_blank" rel="noopener noreferrer">'+h.escape(window.SERVICE.sources[k][0])+'</a>').join('')+'</div></details>','','','Prerequisites')+'</div>';
  },
  mount(){return window.CaptureGallery.mount(document.querySelector('main'),window.APPLICATION_CAPTURES);}
};
window.SERVICE.renderers.logs=m=>window.LogsPattern.render(m);
window.SERVICE.initializers.logs=()=>window.LogsPattern.mount();
