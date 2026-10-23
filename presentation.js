'use strict';
// Shared decorative motion; Availability owns its finite illustrative sequence.
window.ShowcasePresentation = {
  stream(nodes,edges,h){
    return '<div class="stream-flow">'+nodes.map((n,i)=>(i?'<div class="stream-link"><div class="stream-track" aria-hidden="true"><b></b><b></b><b></b></div><span>'+h.escape(edges[i-1]||'Transfer')+'</span></div>':'')+'<div class="stream-node tone-border-'+h.escape(n[3]||'teal')+'">'+h.iconTile(n[2],n[3])+'<strong>'+h.escape(n[0])+'</strong><p>'+h.escape(n[1])+'</p></div>').join('')+'</div>';
  },
  stages(f,h){return '<ol class="story-stages">'+f.steps.map(([title,description],i)=>'<li><span>'+String(i+1).padStart(2,'0')+'</span><div><h4>'+h.escape(title)+'</h4><p>'+h.escape(description)+'</p></div></li>').join('')+'</ol>';},
  pipeline(f,h){const p=f.pipeline;return '<div class="pipeline-proof"><div><span class="eyebrow">Source setup</span><p>'+h.escape(p.sourceRequirement)+'</p></div><div><span class="eyebrow">Index contract</span><strong>'+h.escape(p.index)+'</strong><p>'+h.escape(p.mappings)+'</p></div><div><span class="eyebrow">Synthetic evidence</span><strong>'+p.recordCount+' prepared documents</strong><p>'+h.escape(p.result)+'</p></div></div><a class="button primary story-next" href="#patterns/'+h.escape(p.workload)+'">Explore this use case →</a>';},
  mountMotion(container,media,doc){
    const cleanups=[];
    for(const diagram of container.querySelectorAll('.story-diagram.ambient-flow')){
      cleanups.push(this.motion(diagram,media,doc));
    }
    return ()=>cleanups.forEach(fn=>fn());
  },
  motion(root,media,doc){
    const sync=()=>{root.classList.toggle('motion-paused',media.matches);root.classList.toggle('document-hidden',doc.hidden);};
    media.addEventListener('change',sync);doc.addEventListener('visibilitychange',sync);sync();
    return ()=>{media.removeEventListener('change',sync);doc.removeEventListener('visibilitychange',sync);};
  }
};
