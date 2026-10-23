'use strict';
// User-controlled image exploration; no slideshow, external service or timers.
window.CaptureGallery = {
  render(h,items=window.APPLICATION_CAPTURES){
    const available=items.filter(x=>x.available);if(!available.length)return '';
    const e=h.escape;
    const card=x=>'<figure class="capture-card" data-capture="'+e(x.id)+'"><button type="button" class="capture-open" aria-label="Enlarge '+e(x.title)+'"><img src="'+e(x.src)+'" alt="'+e(x.alt)+'" loading="lazy" decoding="async"><span>Enlarge image</span></button><figcaption><h3>'+e(x.title)+'</h3><p>'+e(x.caption)+'</p>'+(x.sourceUrl?'<small><a href="'+e(x.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Source: OpenSearch documentation</a> · '+e(x.credit)+' · <a href="'+e(x.licenseUrl)+'" target="_blank" rel="noopener noreferrer">License</a></small>':'')+'</figcaption></figure>';
    return '<section class="panel application-captures" aria-label="Screenshot example">'+available.map(card).join('')+'<dialog class="capture-dialog" aria-labelledby="capture-title"><div class="capture-dialog-head"><h2 id="capture-title"></h2><button class="button capture-close" type="button" autofocus>Close image</button></div><p class="capture-caption"></p><div class="capture-image-scroll" tabindex="0" role="region" aria-label="Full-size capture, scroll to inspect"><img alt=""></div></dialog></section>';
  },
  mount(root,items=window.APPLICATION_CAPTURES){
    const gallery=root.querySelector('.application-captures');if(!gallery)return ()=>{};
    const dialog=gallery.querySelector('dialog');let opener=null;
    const open=event=>{const button=event.target.closest('.capture-open');if(!button)return;const x=items.find(x=>x.id===button.closest('[data-capture]').dataset.capture);if(!x)return;opener=button;dialog.querySelector('h2').textContent=x.title;dialog.querySelector('.capture-caption').textContent=x.caption;const img=dialog.querySelector('img');img.src=x.src;img.alt=x.alt;dialog.showModal();};
    const close=()=>dialog.close(),restore=()=>{if(opener?.isConnected)opener.focus();};
    const trap=event=>{if(event.key!=='Tab')return;const first=dialog.querySelector('.capture-close'),last=dialog.querySelector('.capture-image-scroll');if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}};
    gallery.addEventListener('click',open);dialog.querySelector('.capture-close').addEventListener('click',close);dialog.addEventListener('close',restore);dialog.addEventListener('keydown',trap);
    return ()=>{gallery.removeEventListener('click',open);dialog.querySelector('.capture-close').removeEventListener('click',close);dialog.removeEventListener('close',restore);dialog.removeEventListener('keydown',trap);if(dialog.open)dialog.close();opener=null;};
  }
};
