/* Contract-shaped presentation. Existing nodes are moved, preserving review handlers. */
window.layoutContract = function(meta) {
  const host=document.getElementById('preview-content');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nodes=Array.from(host.children), sections=nodes.filter(n=>n.matches('.lc-contract-section'));
  const counter=nodes[0]?.querySelector('.lc-tag')?.textContent||'';
  const error=host.querySelector('#lc-preview-error');
  const source=nodes.slice(3); // summary, explanatory note, error remain outside paper
  if(source[0]?.querySelector('h3')?.textContent==='Vertragsparteien und Mietobjekte')source.shift();
  host.replaceChildren(); if(error)host.append(error);
  const pages=[];
  function sheet(label){
    const page=document.createElement('article');page.className='contract-sheet';
    page.innerHTML='<header class="sheet-head"><strong>NIEDERHAUSER CONSULTING</strong><span>'+esc(meta.id)+' · '+esc(label)+'</span></header><div class="sheet-body"></div><footer class="sheet-foot"><span>Verhandlungsentwurf · '+esc(meta.country)+' · Nicht unterzeichnet</span><span class="page-number"></span></footer>';
    host.append(page);pages.push(page);return page.querySelector('.sheet-body');
  }
  const cover=sheet('Mietvertrag');
  const field=(label,value)=>'<label>'+esc(label)+'</label><div class="party-value'+(!value?' party-empty':'')+'">'+esc(value||'Noch zu ergänzen')+'</div>';
  cover.innerHTML='<div class="contract-kicker">Vertragsentwurf · '+esc(meta.country)+' / '+esc(meta.currency)+'</div><h1>MIETVERTRAG<br>FÜR GESCHÄFTSRÄUME</h1><p class="contract-subtitle">'+esc(meta.company)+' · '+esc(meta.id)+'</p><h2>Vertragsparteien</h2><div class="party-grid"><div><h3>Vermieterin / Vermieter</h3>'+field('Name / Firma','')+field('Adresse / Ort','')+field('Vertreten durch','')+'</div><div><h3>Mieterin / Mieter</h3>'+field('Name / Firma',meta.company)+field('Adresse / Ort','')+field('Kontaktperson',meta.contact)+'</div></div><h2>Mietobjekte und Mietzins</h2><table class="contract-table"><thead><tr><th>Mietobjekt</th><th class="num">Fläche m²</th><th class="num">'+esc(meta.currency)+'/m²/'+esc(meta.period)+'</th><th class="num">Netto / Monat</th></tr></thead><tbody>'+meta.objects.map(o=>'<tr><td>'+esc(o.name)+'</td><td class="num">'+esc(o.area)+'</td><td class="num">'+esc(o.rate)+'</td><td class="num">'+esc(o.monthly)+'</td></tr>').join('')+'</tbody><tfoot><tr><td colspan="3">Nettomietzins gesamt · '+esc(meta.currency)+'</td><td class="num">'+esc(meta.total)+'</td></tr></tfoot></table><div class="contract-facts"><div><small>Vertragsbeginn / Vertragsende</small><strong>'+esc(meta.term)+'</strong></div><div><small>Indexierung</small><strong>'+esc(meta.index)+'</strong></div><div><small>Nebenkosten-Akonto / Monat</small><strong>'+esc(meta.nk)+'</strong></div><div><small>Mietsicherheit</small><strong>'+esc(meta.deposit)+'</strong></div></div><div class="document-note">'+esc(counter)+'. Die Übersicht zeigt die aktuell vereinbarten Entwurfswerte. Offene Vorschläge sind in den folgenden Artikeln gelb markiert. Fehlende Parteidaten sind vor Abschluss zu ergänzen.</div>';
  let body=null,annex=false;
  const importedAnnexes=[];
  for(const n of source){if(n.querySelector?.('h3')?.textContent.startsWith('Beilage ·')) importedAnnexes.push(n);}
  function place(n){
    if(!body)body=sheet(annex?'Beilagen':'Vertragsbestimmungen');
    body.append(n);
    if(n.getBoundingClientRect().bottom-body.getBoundingClientRect().top>790 && body.children.length>1){
      const previous=n.previousElementSibling;body=sheet(annex?'Beilagen':'Vertragsbestimmungen');if(previous?.matches('h2,h3'))body.append(previous);body.append(n);
    }
  }
  for(const n of source){
    if(importedAnnexes.includes(n))continue;
    if(n.tagName==='H2'){annex=true;body=sheet('Beilagen');place(n);for(const a of importedAnnexes)place(a);continue;}
    // Split long imported plain text into readable continuation sections without changing content.
    const copy=n.querySelector?.(':scope > .lc-preview-copy');
    if(copy && copy.textContent.length>2200 && !n.querySelector('[data-preview-accept]')){
      const text=copy.textContent;const chunks=text.match(/[\s\S]{1,2000}(?:\s|$)|[\s\S]{1,2000}/g)||[text];
      const title=n.querySelector('h3')?.textContent||'Vertragsbestimmung';
      copy.textContent=chunks.shift();place(n);
      for(const chunk of chunks){const continuation=document.createElement('section');continuation.className='lc-contract-section';continuation.innerHTML='<h3>'+esc(title)+' · Fortsetzung</h3><div class="lc-preview-copy">'+esc(chunk)+'</div>';place(continuation);}
    }else place(n);
  }
  pages.forEach((p,i)=>p.querySelector('.page-number').textContent='Seite '+(i+1)+' / '+pages.length);
};
