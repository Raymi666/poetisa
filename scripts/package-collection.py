"""Build a shareable, secret-free reading collection from the verified catalogue."""
import html, json, pathlib, zipfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
poems=json.loads((ROOT/'content/poems.json').read_text())
esc=html.escape
pieces=[]
for p in poems:
 pieces.append(f'<article id="{esc(p["id"])}"><h2>{esc(p["title"])}</h2><p class="by">{esc(p["author"])}</p><p>{esc(p["book"])} · {p["year"]}</p><div class="poem">{esc(p["text"])}</div><p><a href="{esc(p["pdfUrl"])}">Libro original (PDF) ↗</a> · <a download href="poemas/{esc(p["id"])}.txt">Descargar poema .txt ↓</a></p><details><summary>Fuente y transcripción</summary><p>{esc(p["rightsBasis"])}</p><p>{esc(p["transcriptionNote"])}</p><a href="{esc(p["rightsUrl"])}">Ficha de derechos ↗</a></details></article>')
page='''<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PoetisA · Primera colección</title><style>body{margin:0;background:#fff6f8;color:#503544;font:17px/1.65 Georgia,serif}main{max-width:760px;margin:auto;padding:48px 24px}h1{font-size:54px;font-weight:normal;margin-bottom:0}.brand-ai{color:#a33d68;font-style:italic}h2{font-size:30px;font-weight:normal;margin-bottom:4px}.by{color:#a33d68;margin-top:0}article{padding:30px;margin:28px 0;background:#fff;border:1px solid #efd9e3;border-radius:8px}.poem{white-space:pre-wrap;margin:28px 0}a{color:#a33d68}details{font:14px/1.6 system-ui;color:#735f6a}nav{padding:20px;background:#f9e7ee;border-radius:8px}nav a{display:block}@media(max-width:500px){main{padding:24px 16px}article{padding:22px}h1{font-size:42px}}</style><main><h1>Poet<span class="brand-ai">i</span>s<span class="brand-ai">A</span></h1><p>Tres palabras. Una voz chilena. Un pequeño ritual para el alma.</p>'''
page+=f'<p>Primera colección: {len(poems)} poemas completos de {len(set(p["author"] for p in poems))} voces chilenas, cotejados con ediciones de dominio público. Puedes leerlos sin conexión; los enlaces a las fuentes requieren Internet.</p><p><a href="https://poetisa.raymi666.chatgpt.site">Abrir PoetisA ↗</a></p><nav>'
page+=''.join(f'<a href="#{esc(p["id"])}">{esc(p["title"])} — {esc(p["author"])}</a>' for p in poems)+'</nav>'+''.join(pieces)+'</main></html>'
dest=ROOT/'public/PoetisA_Primera_Coleccion.zip'
with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED) as z:
 z.writestr('PoetisA/LEEME.txt','PoetisA · Primera colección\n\nAbre Coleccion_PoetisA.html con tu navegador para leer los poemas.\nLa carpeta poemas contiene versiones de texto para descargar y compartir, con autor, libro y fuente.\nNo necesitas Python, claves ni conexión para leer esta colección. Los enlaces a los libros originales requieren Internet.\nPara elegir una lectura a partir de tus tres palabras, abre https://poetisa.raymi666.chatgpt.site\nEsta colección no incluye datos personales ni claves.\n')
 z.writestr('PoetisA/Coleccion_PoetisA.html',page)
 z.writestr('PoetisA/coleccion.json',json.dumps(poems,ensure_ascii=False,indent=2))
 for p in poems:
  text=f'{p["title"]}\n{p["author"]}\n{p["book"]} ({p["year"]})\n\n{p["text"]}\n\nFuente: {p["sourceUrl"]}\n{p["sourceLabel"]}\n{p["rightsBasis"]}\nFicha de derechos: {p["rightsUrl"]}\nTranscripción: {p["transcriptionNote"]}\n'
  z.writestr('PoetisA/poemas/'+p['id']+'.txt',text)
 for f in (ROOT/'content').glob('FUENTES*.txt'):z.write(f,'PoetisA/'+f.name)
assert zipfile.ZipFile(dest).testzip() is None
print(f'Colección empaquetada: {len(poems)} poemas, {dest.stat().st_size} bytes, sin datos de usuarios ni credenciales.')
