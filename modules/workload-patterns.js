'use strict';
// Workload-only presentation primitives. Each adapter owns its story and state.
window.WorkloadPatterns = {
  landing(service,h) {
    return '<section class="workload-landing" aria-label="Choose a customer task">'+Object.entries(service.workloads).map(([key,m])=>'<article class="panel">'+h.iconTile(m.icon,m.tone)+'<h2>'+h.escape(m.selectorLabel)+'</h2><p>'+h.escape(m.cardProblem)+'</p><p><strong>Outcome:</strong> '+h.escape(m.cardOutcome)+'</p><a class="case-link" href="#patterns/'+key+'">'+h.escape(m.action)+' →</a></article>').join('')+'</section>';
  },
  frame(m,body,h){return '<div class="workload-pattern">'+h.panel(m.patternTitle,body,'','','Synthetic example')+'</div>';},
  stage(number,title,body,h,id=''){return '<section class="workload-stage" data-workload-stage'+(id?' id="'+id+'"':'')+'><h3 tabindex="-1"><span>'+number+'</span> '+h.escape(title)+'</h3>'+body+'</section>';},
  sample(s,h){return s?'<div class="code"><div class="code-head"><span>'+h.escape(s.label)+'</span><span>Display only</span></div><pre><code>'+h.escape(s.text)+'</code></pre></div>':'';},
  technical(m,f,h,extra=''){
    const e=h.escape;
    return '<details class="operator-details"><summary>Technical details and sources</summary><h4>Prerequisites</h4><p>'+e(m.prerequisite)+'</p>'+extra+
      '<p>'+(m.renderer==='catalog'?'Preset synthetic example. No request is sent.':'Controls filter local synthetic records only. No requests are sent.')+(m.renderer==='catalog'?'':' Dashboard panels and the “Investigate” shortcut are simplified showcase illustrations of a configured dashboard → Discover workflow, not supplied dashboards or an exact product interface.')+'</p>'+
      '<details class="supporting-case"><summary>Default request and response samples</summary>'+this.sample(m.setup,h)+this.sample(f.code,h)+this.sample(f.json,h)+'</details><a class="ingestion-link" href="'+e(m.ingestionLink)+'">Collection and ingestion: OCI OpenSearch Pipelines →</a><div class="source-list">'+m.sources.map(k=>'<a href="'+e(window.SERVICE.sources[k][1])+'" target="_blank" rel="noopener noreferrer">'+e(window.SERVICE.sources[k][0])+'</a>').join('')+'</div></details>';
  },
  select(name,label,options,h){return '<label>'+h.escape(label)+'<select name="'+name+'">'+options.map(([value,text])=>'<option value="'+h.escape(value)+'">'+h.escape(text)+'</option>').join('')+'</select></label>';},
  time(h){return this.select('window','Time range · 15 Oct 2026 UTC',[['all','08:00 to before 08:03'],['spike','08:01 to before 08:02']],h);},
  filter(records,{window='all',fields={},message=''}={}){
    const start=window==='spike'?'2026-10-15T08:01:00Z':'2026-10-15T08:00:00Z',end=window==='spike'?'2026-10-15T08:02:00Z':'2026-10-15T08:03:00Z';
    return records.filter(r=>r['@timestamp']>=start&&r['@timestamp']<end&&Object.entries(fields).every(([k,v])=>!v||r[k]===v)&&(!message||String(r.message||'').toLowerCase().includes(message.toLowerCase()))).sort((a,b)=>a['@timestamp'].localeCompare(b['@timestamp']));
  },
  counts(records,key){return Object.entries(records.reduce((all,r)=>(all[r[key]]=(all[r[key]]||0)+1,all),{}));},
  breakdown(title,items,h){return '<div class="workload-breakdown"><h4>'+h.escape(title)+'</h4><dl>'+items.map(([k,n])=>'<div><dt>'+h.escape(k)+'</dt><dd>'+h.escape(n)+'</dd></div>').join('')+'</dl></div>';},
  documents(records,h,kind){
    const e=h.escape;
    if(!records.length)return '<p class="workload-empty">No matching documents. Adjust the time range or filters.</p>';
    return '<div class="workload-documents">'+records.map(r=>'<details class="event-document"><summary><time datetime="'+e(r['@timestamp'])+'">'+e(r['@timestamp'].slice(11,19))+'</time><strong>'+e(kind==='logs'?r.severity+' · '+r.message:r.outcome==='success'?'Successful sign-in':'Failed sign-in')+'</strong><span>Inspect event</span></summary><dl>'+Object.entries(r).map(([k,v])=>'<div><dt>'+e(k)+'</dt><dd>'+e(v)+'</dd></div>').join('')+'</dl>'+(kind==='logs'?'<p><strong>Dependency context:</strong> '+(r.message.includes('Payment')?'The message points to the payment upstream. This is an interpretation of the message, not a verified dependency trace.':'This event does not identify a failing dependency.')+'</p>':'')+'</details>').join('')+'</div>';
  },
  investigate(root){const section=root.querySelector('#workload-discover');section.classList.add('workload-highlight');section.querySelector('h3').focus();section.scrollIntoView({block:'start',behavior:'instant'});}
};
