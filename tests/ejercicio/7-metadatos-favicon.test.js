const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Ejercicio 7: Metadatos HTML con Favicon', () => {
  const rootPath = path.join(__dirname, '../../');
  const indexFilePath = path.join(rootPath, 'src', 'metadatos', 'index.html');
  const serviciosFilePath = path.join(rootPath, 'src', 'metadatos', 'servicios.html');
  const faviconPath = path.join(rootPath, 'src', 'metadatos', 'favicon.ico');
  
  test('La carpeta src/metadatos debe existir', () => {
    const srcPath = path.join(rootPath, 'src/metadatos');    
    expect(fs.existsSync(srcPath)).toBe(true);    
    const stats = fs.statSync(srcPath);
    expect(stats.isDirectory()).toBe(true);
  });
  
  test('El archivo src/metadatos/index.html debe existir', () => {    
    expect(fs.existsSync(indexFilePath)).toBe(true);        
    const stats = fs.statSync(indexFilePath);
    expect(stats.isFile()).toBe(true);
  });

  test('El archivo src/metadatos/servicios.html debe existir', () => {    
    expect(fs.existsSync(serviciosFilePath)).toBe(true);        
    const stats = fs.statSync(serviciosFilePath);
    expect(stats.isFile()).toBe(true);
  });

  test('El archivo favicon.ico debe existir en la carpeta metadatos', () => {    
    expect(fs.existsSync(faviconPath)).toBe(true);        
    const stats = fs.statSync(faviconPath);
    expect(stats.isFile()).toBe(true);
  });

  describe('Validaciones para servicios.html', () => {
    test('El archivo servicios.html debe tener estructura HTML básica', () => {      
      expect(fs.existsSync(serviciosFilePath)).toBe(true);     
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
        
      expect(content).toMatch(/<!DOCTYPE\s+html>/i);
      expect(content).toMatch(/<html[^>]*>/i);
      expect(content).toMatch(/<head[^>]*>/i);
      expect(content).toMatch(/<\/head>/i);
      expect(content).toMatch(/<body[^>]*>/i);
      expect(content).toMatch(/<\/body>/i);
      expect(content).toMatch(/<\/html>/i);
    });

    test('El archivo servicios.html debe tener título', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<title[^>]*>.*<\/title>/i);     
    });

    test('El título debe tener contenido significativo', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      const dom = new JSDOM(content);
      const title = dom.window.document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent.trim().length).toBeGreaterThan(5);
    });

    test('Debe contener metaetiqueta charset UTF-8', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<meta[^>]*charset=['"]UTF-8['"][^>]*>/i);
    });

    test('Debe contener metaetiqueta viewport', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<meta[^>]*name=['"]viewport['"][^>]*>/i);
      expect(content).toMatch(/width=device-width/i);
      expect(content).toMatch(/initial-scale=1\.0/i);
    });

    test('Debe contener metaetiqueta description', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<meta[^>]*name=['"]description['"][^>]*>/i);
    });

    test('Debe contener metaetiqueta keywords', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<meta[^>]*name=['"]keywords['"][^>]*>/i);
    });

    test('Debe contener metaetiqueta author', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<meta[^>]*name=['"]author['"][^>]*>/i);
    });

    test('Debe contener enlace al favicon', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      expect(content).toMatch(/<link[^>]*rel=['"]icon['"][^>]*>/i);
      expect(content).toMatch(/href=['"]favicon\.ico['"][^>]*>/i);
      expect(content).toMatch(/type=['"]image\/x-icon['"][^>]*>/i);
    });

    test('Las metaetiquetas deben estar en el head', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      const dom = new JSDOM(content);
      const document = dom.window.document;
      const metaInHead = document.head.querySelectorAll('meta');
      const metaInBody = document.body ? document.body.querySelectorAll('meta') : [];
      
      expect(metaInHead.length).toBeGreaterThan(0);
      expect(metaInBody.length).toBe(0);
    });

    test('El enlace al favicon debe estar en el head', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      const dom = new JSDOM(content);
      const document = dom.window.document;
      const faviconLink = document.head.querySelector('link[rel="icon"]');
      
      expect(faviconLink).toBeTruthy();
      expect(faviconLink.getAttribute('href')).toBe('favicon.ico');
      expect(faviconLink.getAttribute('type')).toBe('image/x-icon');
    });

    test('Las metaetiquetas deben tener contenido válido', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
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
        expect(keywords.getAttribute('content')).toMatch(/,/); // debe tener comas
      }

      const author = document.querySelector('meta[name="author"]');
      if (author) {
        expect(author.getAttribute('content')).toBeTruthy();
        expect(author.getAttribute('content').length).toBeGreaterThan(2);
      }
    });

    test('No debe tener metaetiquetas duplicadas del mismo tipo', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      const dom = new JSDOM(content);
      const document = dom.window.document;
      
      const charsetMetas = document.querySelectorAll('meta[charset]');
      const viewportMetas = document.querySelectorAll('meta[name="viewport"]');
      const descriptionMetas = document.querySelectorAll('meta[name="description"]');
      const keywordsMetas = document.querySelectorAll('meta[name="keywords"]');
      const authorMetas = document.querySelectorAll('meta[name="author"]');
      const faviconLinks = document.querySelectorAll('link[rel="icon"]');
      
      expect(charsetMetas.length).toBeLessThanOrEqual(1);
      expect(viewportMetas.length).toBeLessThanOrEqual(1);
      expect(descriptionMetas.length).toBeLessThanOrEqual(1);
      expect(keywordsMetas.length).toBeLessThanOrEqual(1);
      expect(authorMetas.length).toBeLessThanOrEqual(1);
      expect(faviconLinks.length).toBeLessThanOrEqual(1);
    });

    test('Debe tener al menos 4 metaetiquetas diferentes más el favicon', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      const dom = new JSDOM(content);
      const document = dom.window.document;
      const metaTags = document.querySelectorAll('meta');
      const faviconLink = document.querySelector('link[rel="icon"]');
      
      expect(metaTags.length).toBeGreaterThanOrEqual(4);
      expect(faviconLink).toBeTruthy();
    });

    test('El documento debe estar bien formado y válido', () => {
      const content = fs.readFileSync(serviciosFilePath, 'utf8');
      
      // Verificar que no hay etiquetas sin cerrar básicas
      expect(content).not.toMatch(/<meta[^>]*>[^<]*<\/meta>/i);
      expect(content).toMatch(/<meta[^>]*\/?>|<meta[^>]*>(?!\s*<\/meta>)/i);
      
      // Verificar que el enlace al favicon está bien formado
      expect(content).not.toMatch(/<link[^>]*>[^<]*<\/link>/i);
    });
  });

  describe('Validaciones para index.html (del ejercicio anterior)', () => {
    test('El archivo index.html debe mantener su estructura básica', () => {      
      expect(fs.existsSync(indexFilePath)).toBe(true);     
      const content = fs.readFileSync(indexFilePath, 'utf8');
        
      expect(content).toMatch(/<!DOCTYPE\s+html>/i);
      expect(content).toMatch(/<html[^>]*>/i);
      expect(content).toMatch(/<head[^>]*>/i);
      expect(content).toMatch(/<\/head>/i);
      expect(content).toMatch(/<body[^>]*>/i);
      expect(content).toMatch(/<\/body>/i);
      expect(content).toMatch(/<\/html>/i);
    });

    test('El archivo index.html debe mantener sus metadatos', () => {
      const content = fs.readFileSync(indexFilePath, 'utf8');
      const dom = new JSDOM(content);
      const document = dom.window.document;
      const metaTags = document.querySelectorAll('meta');
      
      expect(metaTags.length).toBeGreaterThanOrEqual(5);
    });
  });
});
