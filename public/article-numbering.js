/* Stable semantic keys are identity; numbers are derived for each rendered contract. */
(function(scope){
 function build(s){
  const included=(key)=>!!s.options[key].value.enabled||!!s.options[key].proposal?.enabled;
  const keys=['area','fit','rent','index','term'];
  if(s.options.term.value.type==='fixed'&&included('extension'))keys.push('extension');
  if(included('break'))keys.push('break');
  keys.push('deposit');if(s.restoration.enabled)keys.push('restoration');
  const numbers=Object.fromEntries(keys.map((key,i)=>[key,String(i+1)]));
  for(const [i,o] of s.objects.entries()){numbers['area-'+o.id]=numbers.area+'.'+(i+1);numbers['fit-'+o.id]=numbers.fit+'.'+(i+1);}
  s.objects.filter(o=>s.restoration.enabled&&s.restoration.objects[o.id]).forEach((o,i)=>numbers['restore-'+o.id]=numbers.restoration+'.'+(i+1));
  return {keys,numbers};
 }
 const legacy={'1':'area','2':'fit','2.1':'fit-office','2.2':'fit-storage','3':'rent','4':'index','5':'term','5.1':'extension','5.2':'break','6':'deposit','7':'restoration','7.1':'restore-office','7.2':'restore-storage'};
 function format(text,plan){return text.replace(/Art\. (\d+(?:\.\d+)?)(\s*·\s*)?/g,(all,old,separator)=>{const key=legacy[old];if(!key)return all;const n=plan.numbers[key];return n?'Art. '+n+(separator||''):separator?'':'';});}
 scope.contractArticleNumbering={build,format};
})(typeof window==='undefined'?globalThis:window);
