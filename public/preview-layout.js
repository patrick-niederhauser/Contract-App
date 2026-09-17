/* Contract-shaped presentation. Existing nodes are moved, preserving review handlers. */
window.layoutContract = function(meta) {
  const host=document.getElementById('preview-content');
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nodes=Array.from(host.children);
  const counter=nodes[0]?.querySelector('.lc-tag')?.textContent||'';
  const error=host.querySelector('#lc-preview-error');
  const source=nodes.slice(3); // summary, explanatory note, error remain outside paper
  if(source[0]?.querySelector('h3')?.textContent==='Vertragsparteien und Mietobjekte')source.shift();
  host.replaceChildren(); if(error)host.append(error);
  const pages=[];
  function sheet(label){
    const page=document.createElement('article');page.className='contract-sheet';
    page.innerHTML='<header class="sheet-head"><div>Mietvertrag '+esc(meta.id)+' · Vermieterseite: noch zu ergänzen · '+esc(meta.company)+'<br>Mietobjekte: '+esc(meta.objects.map(o=>o.name).join(' / '))+'</div><span>'+esc(label)+'</span></header><div class="sheet-body"></div><footer class="sheet-foot"><span class="visum-caption">VISUM</span><span class="visum-field">Vermieterseite: <i></i></span><span class="visum-field">Mieterseite: <i></i></span><span class="page-number"></span></footer>';
    host.append(page);pages.push(page);return page.querySelector('.sheet-body');
  }
  const cover=sheet('Mietvertrag');
  const field=(label,value)=>'<label>'+esc(label)+'</label><div class="party-value'+(!value?' party-empty':'')+'">'+esc(value||'Noch zu ergänzen')+'</div>';
  cover.innerHTML='<div class="contract-kicker">Verhandlungsentwurf · '+esc(meta.country)+' / '+esc(meta.currency)+' · Nicht unterzeichnet</div><h1>Mietvertrag für gewerbliche Räume</h1><div class="contract-party"><p>zwischen</p>'+field('Vermieterin / Vermieter','')+field('Adresse / Ort','')+field('Vertreten durch','')+'</div><div class="contract-party"><p>und</p>'+field('Mieterin / Mieter',meta.company)+field('Adresse / Ort','')+field('Kontaktperson',meta.contact)+'</div><h2>Mietobjekte / Mietzins</h2><table class="contract-table"><thead><tr><th>Etage</th><th>Nutzung / Objekt</th><th class="num">Fläche<br>m²</th><th class="num">'+esc(meta.currency)+'/m²<br>pro '+esc(meta.period)+'</th><th class="num">'+esc(meta.currency)+'<br>pro Jahr</th></tr></thead><tbody>'+meta.objects.map(o=>'<tr><td>'+esc(o.floor)+'</td><td>'+esc(o.name)+'</td><td class="num">'+esc(o.area)+'</td><td class="num">'+esc(o.rate)+'</td><td class="num">'+esc(o.annual)+'</td></tr>').join('')+'</tbody><tfoot><tr><td colspan="4">Total Nettomietzins pro Jahr · '+esc(meta.currency)+'</td><td class="num">'+esc(meta.annualTotal)+'</td></tr></tfoot></table><p class="contract-small">Nettomietzins pro Monat: '+esc(meta.currency)+' '+esc(meta.total)+'<br>Nebenkosten-Akonto pro Monat: '+esc(meta.nk)+'<br>Flächenbasis: '+esc(meta.standard)+'. Details und Abgrenzung je Objekt gemäss Art. 1 im Anhang.</p><div class="document-note">'+esc(counter)+'. Diese Zusammenfassung zeigt die aktuellen Entwurfswerte. Änderungsvorschläge und Übernahmefunktionen stehen bei den Artikeln im Anhang.</div>';
  const terms=sheet('Hauptvertrag · Konditionen');
  terms.innerHTML='<h2>Mietbeginn und Vertragsdauer</h2><p>'+esc(meta.term)+'</p><p>'+esc(meta.extension)+'</p><h2>Mietzinsbasis und Anpassung</h2><p>'+esc(meta.index)+'. Bezugsmonat und Ausgangsindex: noch festzulegen.<br>Einzelheiten gemäss Art. 4 im Anhang.</p><h2>Sicherheit und weitere Vereinbarungen</h2><p>Mietsicherheit: '+esc(meta.deposit)+'.<br>Ausbaustandard, vorzeitige Kündigungsoption und Rückbau richten sich nach den nachfolgenden Artikeln.</p><h2>Bestandteile des Vertragsentwurfs</h2><ul class="contract-enclosures"><li>Anhang: Vertragsbestimmungen mit den objektspezifischen Artikeln</li><li>Allgemeine Bestimmungen</li><li>Ausbauvereinbarung und Ausbau- / Schnittstellenmatrix</li>'+source.filter(n=>n.querySelector?.('h3')?.textContent.startsWith('Beilage ·')).map(n=>'<li>'+esc(n.querySelector('h3').textContent.replace('Beilage · ',''))+'</li>').join('')+(meta.documents||[]).map(d=>'<li>'+esc(d)+'</li>').join('')+'</ul><p class="contract-small">Originaldateien sind im Beilagenteil verlinkt, soweit sie im Entwurf hinterlegt wurden.</p><div class="contract-signatures"><div>Ort und Datum<i></i>Vermieterseite<i></i></div><div>Ort und Datum<i></i>Mieterseite<i></i></div></div><p class="contract-small">Unterschrifts- und Visumfelder sind Darstellungsfelder. Der Entwurf ist nicht unterzeichnet; die digitalen Abschnittsbestätigungen werden weiterhin in der Contract App erfasst.</p>';
  let body=sheet('Anhang · Vertragsbestimmungen'),annex=false;
  body.innerHTML='<h1>Anhang</h1><p class="contract-subtitle">zum Mietvertrag '+esc(meta.id)+' · '+esc(meta.company)+'</p><p>Objektspezifische Vertragsbestimmungen und Verhandlungsstand</p>';

  const importedAnnexes=[];
  for(const n of source){if(n.querySelector?.('h3')?.textContent.startsWith('Beilage ·')) importedAnnexes.push(n);}
  function place(n){
    if(!body)body=sheet(annex?'Beilagen':'Anhang · Vertragsbestimmungen');
    body.append(n);
    if(n.getBoundingClientRect().bottom-body.getBoundingClientRect().top>790 && body.children.length>1){
      const previous=n.previousElementSibling;body=sheet(annex?'Beilagen':'Anhang · Vertragsbestimmungen');if(previous?.matches('h2,h3'))body.append(previous);body.append(n);
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
