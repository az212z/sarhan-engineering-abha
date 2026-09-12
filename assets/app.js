'use strict';
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
function closeMenu(){nav?.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false');}
menuButton?.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(expanded));nav?.classList.toggle('is-open',expanded);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open')){closeMenu();menuButton.focus();}});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
const cards=[...document.querySelectorAll('[data-category]')],filters=[...document.querySelectorAll('[data-filter]')];
filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));let count=0;cards.forEach(c=>{c.hidden=b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter;if(!c.hidden)count++;});const status=document.querySelector('#project-count');if(status)status.textContent=`عدد الأعمال: ${count.toLocaleString('ar-SA')}`;}));
const dialog=document.querySelector('.zoom-dialog'),zoom=document.querySelector('.zoom-button');
zoom?.addEventListener('click',()=>{dialog?.showModal();document.body.classList.add('modal-open');});
dialog?.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('close',()=>{document.body.classList.remove('modal-open');zoom?.focus();});
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const form=document.querySelector('#project-form');
if(form){const params=new URLSearchParams(location.search),service=form.elements.namedItem('service');if(params.get('service')&&[...service.options].some(o=>o.value===params.get('service')))service.value=params.get('service');
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const text=`السلام عليكم، أرغب بالتواصل مع ${form.dataset.office}.\nالاسم: ${String(data.get('name')).trim()}\nالمدينة: ${String(data.get('city')).trim()}\nالخدمة: ${data.get('service')}\nمرحلة المشروع: ${data.get('stage')}\nالتفاصيل: ${String(data.get('details')).trim()||'أرغب بمناقشة التفاصيل مع المكتب.'}`;document.querySelector('#message-preview').textContent=text;document.querySelector('#send-whatsapp').href=`https://wa.me/${form.dataset.phone}?text=${encodeURIComponent(text)}`;const result=document.querySelector('#form-result');result.hidden=false;result.focus();result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});});
form.addEventListener('input',()=>{document.querySelector('#form-result').hidden=true;});}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const items=document.querySelectorAll('.reveal');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target);}}),{threshold:.04});document.documentElement.classList.add('motion-ready');items.forEach(el=>io.observe(el));}
