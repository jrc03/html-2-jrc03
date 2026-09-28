const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Ejercicio 6: Metadatos HTML', () => {
  const rootPath = path.join(__dirname, '../../');
  const filePath = path.join(rootPath, 'src', 'metadatos', 'index.html');
  
  test('La carpeta src/metadatos debe existir', () => {
    const srcPath = path.join(rootPath, 'src/metadatos');    
    expect(fs.existsSync(srcPath)).toBe(true);    
    const stats = fs.statSync(srcPath);
    expect(stats.isDirectory()).toBe(true);
  });
  
  test('El archivo src/metadatos/index.html debe existir', () => {    
    expect(fs.existsSync(filePath)).toBe(true);        
    const stats = fs.statSync(filePath);
    expect(stats.isFile()).toBe(true);
  });

  test('El archivo index.html debe tener estructura HTML básica', () => {      
    expect(fs.existsSync(filePath)).toBe(true);     
    const content = fs.readFileSync(filePath, 'utf8');
      
    expect(content).toMatch(/<!DOCTYPE\s+html>/i);
    expect(content).toMatch(/<html[^>]*>/i);
    expect(content).toMatch(/<head[^>]*>/i);
    expect(content).toMatch(/<\/head>/i);
    expect(content).toMatch(/<body[^>]*>/i);
    expect(content).toMatch(/<\/body>/i);
    expect(content).toMatch(/<\/html>/i);
  });

  test('El archivo index.html debe tener título', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<title[^>]*>.*<\/title>/i);     
  });

  test('El título debe tener contenido significativo', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const title = dom.window.document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim().length).toBeGreaterThan(5);
  });

  test('Debe contener metaetiqueta http-equiv', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*http-equiv[^>]*>/i);
  });

  test('Debe contener metaetiqueta language', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*name=['"]language['"][^>]*>/i);
  });

  test('Las metaetiquetas deben estar en el head', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const metaInHead = document.head.querySelectorAll('meta');
    const metaInBody = document.body ? document.body.querySelectorAll('meta') : [];
    
    expect(metaInHead.length).toBeGreaterThan(0);
    expect(metaInBody.length).toBe(0);
  }); 

  test('No debe tener metaetiquetas duplicadas del mismo tipo', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    const charsetMetas = document.querySelectorAll('meta[charset]');
    const viewportMetas = document.querySelectorAll('meta[name="viewport"]');
    const descriptionMetas = document.querySelectorAll('meta[name="description"]');
    
    expect(charsetMetas.length).toBeLessThanOrEqual(1);
    expect(viewportMetas.length).toBeLessThanOrEqual(1);
    expect(descriptionMetas.length).toBeLessThanOrEqual(1);
  });

  test('Debe contener metaetiqueta charset', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*charset[^>]*>/i);
  });

  test('Debe contener metaetiqueta viewport', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*name=['"]viewport['"][^>]*>/i);
  });

  test('Debe contener metaetiqueta description', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*name=['"]description['"][^>]*>/i);
  });

  test('Debe contener metaetiqueta keywords', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*name=['"]keywords['"][^>]*>/i);
  });

  test('Debe contener metaetiqueta author', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toMatch(/<meta[^>]*name=['"]author['"][^>]*>/i);
  });

  test('Las metaetiquetas deben tener contenido válido', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      expect(description.getAttribute('content')).toBeTruthy();
      expect(description.getAttribute('content').length).toBeGreaterThan(10);
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      expect(keywords.getAttribute('content')).toBeTruthy();
    }

    const author = document.querySelector('meta[name="author"]');
    if (author) {
      expect(author.getAttribute('content')).toBeTruthy();
    }
  });

  test('Debe tener al menos 5 metaetiquetas diferentes', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const metaTags = document.querySelectorAll('meta');
    
    expect(metaTags.length).toBeGreaterThanOrEqual(5);
  });

  test('El documento debe estar bien formado y válido', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar que no hay etiquetas sin cerrar básicas
    expect(content).not.toMatch(/<meta[^>]*>[^<]*<\/meta>/i);
    expect(content).toMatch(/<meta[^>]*\/?>|<meta[^>]*>(?!\s*<\/meta>)/i);
  });
});