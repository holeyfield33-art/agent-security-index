import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parseExperiment } from '../../../../../scripts/experiment-markdown.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'http://127.0.0.1:4179/';
for (const d of ['desktop','mobile','article','review']) await mkdir(root+d,{recursive:true});
const source = await readFile(new URL('../../../../../../asi-research-v2/docs/ARTICLE.md',import.meta.url),'utf8');
await writeFile(root+'article/ARTICLE.md',source);
const parsed=parseExperiment(source);
const plain=s=>s.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[`*_]/g,'');
const parts=[parsed.title,parsed.subtitle,...parsed.sections.flatMap(s=>[s.heading.replace(/^\d+\. /,''),...s.blocks.flatMap(b=>b.type==='paragraph'?[b.text]:b.type==='list'?b.items:[...b.headers,...b.rows.flat()])])];
const words=parts.map(plain).join(' ').split(/\s+/u).filter(w=>/[\p{L}\p{N}]/u.test(w)).length;
const inventory=[],checks=[],errors=[],outbound=new Set();
const browser=await chromium.launch();
for(const [device,viewport] of Object.entries({desktop:{width:1440,height:900},mobile:{width:390,height:844}})){
 const page=await browser.newPage({viewport,deviceScaleFactor:1,isMobile:device==='mobile',hasTouch:device==='mobile'});
 page.on('pageerror',e=>errors.push({device,error:e.message}));
 const ready=async()=>{await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);};
 const shot=async(name,locator,fullPage=false)=>{const path=`${device}/${name}.png`;await (locator??page).screenshot({path:root+path,...(!locator?{fullPage}:{})});inventory.push({device,viewport,name,path,url:page.url()});};
 const check=async(name)=>checks.push({device,name,...await page.evaluate(()=>({pageOverflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length}))});
 for(const [name,route] of [['home','#/'],['research-listing','#/research'],['architecture-note','#/research/reference-not-authority'],['research-001','#/research/asi-research-001']]){
  await page.goto(base+route);await ready();await shot(name);await shot(name+'-full',null,true);await check(name);
  if(name==='architecture-note')for(const [i,figure] of (await page.locator('.architecture-figure').all()).entries())await shot(`architecture-diagram-${i+1}`,figure);
 }
 await page.goto(base+'#/research');await ready();await page.getByRole('link',{name:'Read Experiment 001 results'}).click();await ready();
 await page.locator('.experiment-results h2').first().waitFor();
 await shot('article-opening');await check('experiment');
 await page.getByText('Local bounded evidence',{exact:true}).evaluate(el=>el.scrollIntoView({block:'start'}));await shot('article-status');
 for(const a of await page.locator('a[href^="https://"]').all())outbound.add(await a.getAttribute('href'));
 const headings=await page.locator('.experiment-results h2').allTextContents();
 checks.push({device,name:'article-structure',sectionCount:headings.length,tableCount:await page.locator('.experiment-results table').count(),boundedDisclosure:await page.getByText('Local bounded evidence',{exact:true}).count()});
 for(let n=1;n<=10;n++)await shot(`article-section-${String(n).padStart(2,'0')}`,page.locator('.experiment-results section').nth(n-1));
 for(const [i,region] of (await page.locator('.experiment-table-scroll').all()).entries()){
  await region.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(250);
  checks.push({device,name:`table-${i+1}`,keyboard:await region.evaluate(el=>({tabIndex:el.tabIndex,scrollLeft:el.scrollLeft,scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,right:el.getBoundingClientRect().right}))});
  await region.evaluate(el=>el.scrollLeft=el.scrollWidth);await shot(`table-${i+1}-right`,region);await region.evaluate(el=>el.scrollLeft=0);
 }
 await page.evaluate(()=>scrollTo(0,0));await shot('article-full',null,true);
 await page.reload();await ready();checks.push({device,name:'direct-refresh',sections:await page.locator('.experiment-results h2').count()});
 await page.getByRole('link',{name:'Back to research',exact:true}).click();await page.getByRole('heading',{name:'Research publications',exact:true}).waitFor();await ready();checks.push({device,name:'back-navigation',passed:await page.getByRole('heading',{name:'Research publications',exact:true}).isVisible()});
 await page.close();
}
const links=await Promise.all([...outbound].map(async url=>{try{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});return {url,status:r.status,ok:r.ok};}catch(e){return {url,error:e.message};}}));
await writeFile(root+'review/inspection.json',JSON.stringify({capturedAt:new Date().toISOString(),asiRevision:'6d44cb42055d71107048310158f3d35c185b9411',localCorrection:'src/index.css: desktop tables fit article column at min-width 768px',cssSha256:createHash('sha256').update(await readFile(new URL('../../../../../src/index.css',import.meta.url))).digest('hex'),researchRevision:'4ac3224a5237937305596abe0d70d67290bc3575',sha256:parsed.sourceSha256,words,headings:parsed.sections.map(s=>s.heading),inventory,checks,errors,links},null,2));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
await writeFile(root+'gallery.html',`<!doctype html><meta charset="utf-8"><title>Experiment 001 local visual review</title><style>body{font:16px system-ui;margin:24px;background:#f4f3ec;color:#192b20}a{color:#254f36}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}figure{margin:0;padding:12px;background:white}img{width:100%;height:280px;object-fit:contain;object-position:top}figcaption{overflow-wrap:anywhere}h2{margin-top:40px}</style><h1>Experiment 001 — local publication review</h1><p>UI screenshots only; these do not establish experimental security effectiveness. No publication authorized.</p><p><a href="${base}#/research/controlled-materialization-results">Open local article</a> · <a href="article/ARTICLE.md">Complete Markdown</a></p>${['desktop','mobile'].map(d=>`<h2>${d}</h2><div class="grid">${inventory.filter(i=>i.device===d).map(i=>`<figure><a href="${i.path}"><img loading="lazy" src="${i.path}" alt="${esc(i.name)}"></a><figcaption>${esc(i.name)} — ${i.viewport.width} × ${i.viewport.height}<br>${esc(i.url)}</figcaption></figure>`).join('')}</div>`).join('')}`);
const gallery=await browser.newPage({viewport:{width:1440,height:1000}});await gallery.goto(new URL('../gallery.html',import.meta.url).href);await gallery.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));await gallery.waitForFunction(()=>[...document.images].every(i=>i.complete));await gallery.screenshot({path:root+'review/contact-sheet.png',fullPage:true});
await browser.close();console.log(JSON.stringify({words,screenshots:inventory.length,errors,failedLinks:links.filter(l=>!l.ok),checks},null,2));
