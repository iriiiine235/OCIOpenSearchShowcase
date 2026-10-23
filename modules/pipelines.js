'use strict';
// Page-owned presentation; shared tabs, motion and routing remain in the shell.
window.PipelinePage = {
  body(f,m,h){
    const esc=h.escape;
    return `<div class="connector-guide"><h3>${esc(f.title)}</h3><p>${esc(f.summary)}</p>
      <div class="connector-options">${f.connectors.map(([title,copy,glyph])=>`<div>${h.iconTile(glyph,'teal')}<div><h4>${esc(title)}</h4><p>${esc(copy)}</p></div></div>`).join('')}</div>
      <div class="diagram story-diagram ambient-flow connector-diagram" data-visual>${h.stream(f.nodes,f.edges)}</div>
      <p class="flow-disclaimer">Illustrative data flow · no live ingestion</p>
      <p class="connector-requirement"><strong>Buffering</strong> ${esc(f.requirement)}</p>
      <div class="processor-reference"><div><h3>Prepare data with processors</h3><p>Filter, transform and enrich before indexing.</p></div><a class="button primary processor-link" href="${esc(m.processorUrl)}" target="_blank" rel="noopener noreferrer">View supported processors ${h.icon('arrow-up-right')}</a></div>
      <p class="connector-prerequisites"><strong>Before you start</strong> ${esc(m.prerequisites)}</p></div>`;
  }
};
