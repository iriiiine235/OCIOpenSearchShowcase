'use strict';
window.SERVICE.renderers ??= {};
window.SERVICE.initializers ??= {};
window.CatalogPattern = {
  match(records,term,category){return records.filter(r=>r.title.toLowerCase().includes(term.toLowerCase())&&r.category===category);},
  render(m){
    const w=window.WorkloadPatterns,h=window.ShowcaseComponents.helpers,e=h.escape,f=m.scenarios.matches,{keyword,category}=f.input;
    const records=this.match(f.records,keyword,category);
    const products='<ul class="sample-products">'+f.records.map(r=>'<li>'+h.iconTile('shopping-bag','teal')+'<strong>'+e(r.title)+'</strong><span>'+e(r.category)+'</span></li>').join('')+'</ul>';
    const conditions='<div class="responsibilities"><div><h4>Title matches</h4><p><code>'+e(keyword)+'</code></p></div><div><h4>Category equals</h4><p><code>'+e(category)+'</code></p></div></div><p>Both conditions must hold. City daypack has a different category; Trail bottle has no title match.</p>';
    const results='<p id="catalog-count">'+records.length+' matching product</p><div id="catalog-results" data-visual>'+records.map(r=>'<div class="pattern-result">'+h.iconTile('shopping-bag','teal')+'<div><strong>'+e(r.title)+'</strong><p>Included: title matches “'+e(keyword)+'” and category is “'+e(category)+'”.</p></div></div>').join('')+'</div><p class="pattern-context">This preset explains inclusion, not measured relevance or ranking.</p>';
    return w.frame(m,w.stage('01','Sample catalog',products,h)+w.stage('02','Preset request conditions',conditions,h)+w.stage('03','Matching product',results,h)+'<p>Requires permission to search the catalog index. <a href="#security">Review access responsibilities →</a></p>'+w.technical(m,f,h,'<p>The fixture supplies the preset documents and conditions. The display-only OpenSearch request uses a text match and an exact category filter; actual matching depends on mappings and analyzers.</p>'),h);
  }
};
window.SERVICE.renderers.catalog=m=>window.CatalogPattern.render(m);
window.SERVICE.initializers.catalog=()=>()=>{};
