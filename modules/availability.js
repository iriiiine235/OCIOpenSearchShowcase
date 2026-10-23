'use strict';
// Availability owns its finite state sequence. No cloud calls or simulated timing promises.
window.AvailabilityPlayback = function({change,delay=6000,clock=()=>performance.now(),schedule=setTimeout,cancel=clearTimeout,reduced=false}) {
  let step=0,playing=false,started=false,visible=false,hidden=false,disposed=false,timer=null,since=0,remaining=delay;
  const snapshot=()=>({step,playing,started,visible,hidden,reduced,finished:step===3});
  function stopClock(){if(timer!==null){cancel(timer);timer=null;remaining=Math.max(0,remaining-(clock()-since));}}
  function sync(){
    if(disposed)return;
    stopClock();change(snapshot());
    if(playing&&visible&&!hidden&&!reduced&&step<3){since=clock();timer=schedule(()=>{timer=null;step++;remaining=delay;if(step===3)playing=false;sync();},remaining);}
  }
  return {
    state:snapshot,
    visibility(value){visible=value;if(visible&&!hidden&&!started&&!reduced){started=true;playing=true;}sync();},
    hidden(value){hidden=value;if(!hidden&&visible&&!started&&!reduced){started=true;playing=true;}sync();},
    preference(value){reduced=value;if(value)playing=false;sync();},
    toggle(){started=true;if(!reduced&&step<3)playing=!playing;sync();},
    replay(){stopClock();step=0;remaining=delay;started=true;playing=!reduced;sync();},
    seek(value){stopClock();step=Math.max(0,Math.min(3,value));remaining=delay;started=true;playing=false;sync();},
    dispose(){stopClock();disposed=true;playing=false;}
  };
};

window.AvailabilityPage = {
  render(m,h){
    const f=m.scenarios.promotion;
    return h.panel(m.panelTitle,
      h.tabs('placement',Object.entries(m.topology.modes).map(([k,v])=>[k,v.label]),'ad')+
      '<div class="diagram-controls promotion-controls" aria-label="Shard promotion playback"><button class="button" id="promotion-previous" type="button" aria-controls="promotion-diagram">Previous</button><button class="button primary" id="promotion-play" type="button" aria-controls="promotion-diagram">Play</button><button class="button" id="promotion-next" type="button" aria-controls="promotion-diagram">Next</button><button class="button" id="promotion-replay" type="button" aria-controls="promotion-diagram">Replay</button><span id="promotion-motion-note"></span></div>'+
      '<p class="promotion-status" id="promotion-status"></p><div id="placement-panel" role="tabpanel" aria-labelledby="placement-ad"><div class="promotion-diagram" id="promotion-diagram" data-step="0">'+window.SERVICE_VISUALS.availability(m.topology.modes.ad,h)+'</div></div>'+
      '<p class="flow-disclaimer">'+h.escape(f.flowCaption)+'</p>'+window.ShowcasePresentation.stages(f,h)+
      '<div class="responsibilities">'+m.topology.notes.map(([a,b])=>'<div><h3>'+h.escape(a)+'</h3><p>'+h.escape(b)+'</p></div>').join('')+'</div>',m.panelSummary,'Oracle-managed HA','Illustrative sequence')+
      '<p class="ingestion-link"><a href="#capacity">Capacity &amp; historical data: plan resizing or older-index access →</a></p>';
  },
  init(root,m,h){
    const diagram=root.querySelector('#promotion-diagram'),region=diagram.querySelector('.ha-region'),domains=[...diagram.querySelectorAll('.ha-domain')],f=m.scenarios.promotion;
    const nodes=domains.slice(0,2).map((d,i)=>{const n=d.querySelectorAll('.ha-node')[1];n.dataset.dataNode=i===0?'a':'b';n.classList.add('promotion-data-node');n.insertAdjacentHTML('beforeend','<span class="traffic-indicator" aria-hidden="true"></span>');return n;});
    region.insertAdjacentHTML('afterbegin','<div class="promotion-traffic"><span>Application</span><span aria-hidden="true">→</span><strong>Private API</strong><span aria-hidden="true">→</span><span data-traffic-destination></span></div>');
    const status=root.querySelector('#promotion-status'),play=root.querySelector('#promotion-play'),previous=root.querySelector('#promotion-previous'),next=root.querySelector('#promotion-next'),replay=root.querySelector('#promotion-replay'),note=root.querySelector('#promotion-motion-note'),media=matchMedia('(prefers-reduced-motion: reduce)');
    let mode='ad';
    const paint=s=>{
      diagram.dataset.step=String(s.step);diagram.dataset.playing=String(s.playing&&s.visible&&!s.hidden&&!s.reduced);diagram.classList.toggle('promotion-motion-off',s.reduced);
      const failed=s.step>=1,promoted=s.step>=2;
      nodes[0].classList.toggle('data-node-failed',failed);nodes[1].classList.toggle('data-node-promoted',promoted);
      nodes[0].querySelector('strong').textContent='Data node A';nodes[0].querySelector('small').textContent=failed?'Shard 0 · former primary unavailable':'Shard 0 · primary';
      nodes[1].querySelector('strong').textContent='Data node B';nodes[1].querySelector('small').textContent=promoted?'Shard 0 · promoted primary':'Shard 0 · in-sync replica';
      nodes[0].dataset.traffic=String(s.step===0);nodes[1].dataset.traffic=String(s.step===3);
      diagram.querySelector('[data-traffic-destination]').textContent=['Data node A · primary','Interrupted · retry required','Promotion · awaiting client retry','Data node B · new primary'][s.step];
      diagram.querySelector('.shard-link').textContent=promoted?'Primary available on B · replica coverage still needs repair':failed?'Primary unavailable · in-sync replica survives on B':'Primary and in-sync replica in separate '+(mode==='ad'?'availability':'fault')+' domains';
      status.textContent=(s.step+1)+' / 4 · '+f.steps[s.step][0];
      root.querySelectorAll('.story-stages li').forEach((li,i)=>{li.classList.toggle('illustrated-stage',i===s.step);if(i===s.step)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
      play.textContent=s.reduced?'Motion off':s.finished?'Complete':s.playing?'Pause':s.started?'Resume':'Play';play.disabled=s.reduced||s.finished;play.setAttribute('aria-pressed',String(s.playing));previous.disabled=s.step===0;next.disabled=s.finished;
      note.textContent=s.reduced?'Reduced motion: use Previous and Next.':'Plays once when visible. Replay to watch again.';
    };
    const player=window.AvailabilityPlayback({change:paint,reduced:media.matches});
    // Keep the topology mounted; only labels, role classes and traffic indicators change.
    h.bindTabs(root,'placement',key=>{mode=key;const model=m.topology.modes[key];root.querySelector('#placement-panel').setAttribute('aria-labelledby','placement-'+key);diagram.querySelector('.region-label').textContent=model.caption;domains.forEach((d,i)=>d.querySelector('h3').textContent=model.domain+' '+(i+1));paint(player.state());});
    previous.onclick=()=>player.seek(player.state().step-1);next.onclick=()=>player.seek(player.state().step+1);play.onclick=()=>player.toggle();replay.onclick=()=>player.replay();
    const preference=()=>player.preference(media.matches),visibility=()=>player.hidden(document.hidden);
    media.addEventListener('change',preference);document.addEventListener('visibilitychange',visibility);player.hidden(document.hidden);
    const observer=new IntersectionObserver(entries=>player.visibility(entries[0].isIntersecting&&entries[0].intersectionRatio>=0.15),{threshold:0.15});observer.observe(diagram.querySelector('.ha-domains'));h.icons();
    return ()=>{observer.disconnect();player.dispose();media.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility);previous.onclick=next.onclick=play.onclick=replay.onclick=null;};
  }
};
