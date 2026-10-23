'use strict';
// Migration owns its finite state sequence. No cloud calls or simulated timing promises.
window.MigrationPlayback = function({change,delay=3200,clock=()=>performance.now(),schedule=setTimeout,cancel=clearTimeout,reduced=false}) {
  let step=0,playing=false,started=false,visible=false,hidden=false,disposed=false,timer=null,since=0,remaining=delay;
  const snapshot=()=>({step,playing,started,visible,hidden,reduced,finished:step===4});
  function stopClock(){if(timer!==null){cancel(timer);timer=null;remaining=Math.max(0,remaining-(clock()-since));}}
  function sync(){
    if(disposed)return;
    stopClock();change(snapshot());
    if(playing&&visible&&!hidden&&!reduced&&step<4){since=clock();timer=schedule(()=>{timer=null;step++;remaining=delay;if(step===4)playing=false;sync();},remaining);}
  }
  return {
    state:snapshot,
    visibility(value){visible=value;if(visible&&!hidden&&!started&&!reduced){started=true;playing=true;}sync();},
    hidden(value){hidden=value;if(!hidden&&visible&&!started&&!reduced){started=true;playing=true;}sync();},
    preference(value){reduced=value;if(value)playing=false;sync();},
    toggle(){started=true;if(!reduced&&step<4)playing=!playing;sync();},
    replay(){stopClock();step=0;remaining=delay;started=true;playing=!reduced;sync();},
    seek(value){stopClock();step=Math.max(0,Math.min(4,value));remaining=delay;started=true;playing=false;sync();},
    dispose(){stopClock();disposed=true;playing=false;}
  };
};

window.MigrationPage = {
  render(m,h){
    const f=m.scenarios.import;
    const controls='<div class="diagram-controls migration-controls" aria-label="Migration illustration playback">'+['previous','play','next','replay'].map(k=>'<button type="button" class="button'+(k==='play'?' primary':'')+'" id="migration-'+k+'" aria-controls="migration-diagram">'+k[0].toUpperCase()+k.slice(1)+'</button>').join('')+'<span id="migration-motion-note"></span></div>';
    return h.panel(m.panelTitle,controls+'<p class="migration-status" id="migration-status"></p><div class="diagram migration-diagram" id="migration-diagram" data-step="0">'+h.stream(f.nodes,f.edges)+'</div><p class="flow-disclaimer">'+h.escape(f.flowCaption)+'</p><h3 class="story-heading">Migration stages</h3>'+window.ShowcasePresentation.stages(f,h),'Compatibility and rehearsal are approval gates within snapshot migration.','','Illustrative walkthrough')+
      h.panel('Migration readiness','<div class="migration-readiness">'+m.readiness.map(([a,b])=>'<div><h3>'+h.escape(a)+'</h3><p>'+h.escape(b)+'</p></div>').join('')+'</div><a class="ingestion-link" href="#recovery">For Cross-cluster replication (CCR), see Recovery →</a>','','','')+
      '<details class="panel operator-details"><summary>Snapshot request examples</summary><p>Display-only examples; adapt and validate against your actual cluster version.</p>'+[f.code,f.json].map(x=>'<h3>'+h.escape(x.label)+'</h3><p>'+h.escape(x.prerequisite||x.prerequisites||'')+'</p><pre><code>'+h.escape(x.text)+'</code></pre>').join('')+'</details>';
  },
  init(root,m,h){
    const diagram=root.querySelector('#migration-diagram'),nodes=[...diagram.querySelectorAll('.stream-node')],links=[...diagram.querySelectorAll('.stream-link')],f=m.scenarios.import,media=matchMedia('(prefers-reduced-motion: reduce)');
    const button=k=>root.querySelector('#migration-'+k),play=button('play'),previous=button('previous'),next=button('next'),replay=button('replay');
    const paint=s=>{
      diagram.dataset.step=String(s.step);diagram.dataset.playing=String(s.playing&&s.visible&&!s.hidden&&!s.reduced);
      const active=[[0,2],[2],[0],[1,2],[3]][s.step];
      nodes.forEach((n,i)=>n.classList.toggle('migration-active',active.includes(i)));
      links.forEach((n,i)=>n.classList.toggle('migration-transfer',s.step===3&&i<2||s.step===4&&i===2));
      root.querySelector('#migration-status').textContent='Illustrated stage '+(s.step+1)+' / 5 · '+f.steps[s.step][0];
      root.querySelectorAll('.story-stages li').forEach((li,i)=>{li.classList.toggle('illustrated-stage',i===s.step);if(i===s.step)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
      play.textContent=s.reduced?'Motion off':s.finished?'Complete':s.playing?'Pause':s.started?'Resume':'Play';play.disabled=s.reduced||s.finished;play.setAttribute('aria-pressed',String(s.playing));previous.disabled=s.step===0;next.disabled=s.finished;
      root.querySelector('#migration-motion-note').textContent=s.reduced?'Reduced motion: use Previous and Next.':'Plays once when visible. Pause to read; Replay to watch again.';
    };
    const player=window.MigrationPlayback({change:paint,reduced:media.matches});
    previous.onclick=()=>player.seek(player.state().step-1);next.onclick=()=>player.seek(player.state().step+1);play.onclick=()=>player.toggle();replay.onclick=()=>player.replay();
    const preference=()=>player.preference(media.matches),visibility=()=>player.hidden(document.hidden);
    media.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);player.hidden(document.hidden);
    const observer=new IntersectionObserver(entries=>player.visibility(entries[0].isIntersecting&&entries[0].intersectionRatio>=0.15),{threshold:0.15});observer.observe(diagram);h.icons();
    return ()=>{observer.disconnect();player.dispose();media.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);previous.onclick=next.onclick=play.onclick=replay.onclick=null;};
  }
};
