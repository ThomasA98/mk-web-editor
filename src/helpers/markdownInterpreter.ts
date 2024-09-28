export const markdownInterpreter = (text: string) => {
  const lines = text.split("\n");
  const result = lines.map((line) => {
    if (line.startsWith("```")) {
      return line.replace("```", "<pre><code>");
    }
    return line;
  });
  return result.join("\n");
};

export function markdownToHTML(markdown: string) {
  // Convertir títulos
  markdown = markdown.replace(/^###### (.*$)/gim, '<h6 id="$1">$1</h6>');
  markdown = markdown.replace(/^##### (.*$)/gim, '<h5 id="$1">$1</h5>');
  markdown = markdown.replace(/^#### (.*$)/gim, '<h4 id="$1">$1</h4>');
  markdown = markdown.replace(/^### (.*$)/gim, '<h3 id="$1">$1</h3>');
  markdown = markdown.replace(/^## (.*$)/gim, '<h2 id="$1">$1</h2>');
  markdown = markdown.replace(/^# (.*$)/gim, '<h1 id="$1">$1</h1>');

  // Convertir párrafos
  markdown = markdown.replace(/^\s*(\S.*)\s*$/gm, '<p>$1</p>');

  // Convertir enlaces
  markdown = markdown.replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>');

  // Convertir imágenes
  markdown = markdown.replace(/\!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1" />');

  // Convertir listas no ordenadas
  markdown = markdown.replace(/^\s*[-\*]\s+(.*)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

  // Convertir listas ordenadas
  markdown = markdown.replace(/^\s*\d+\.\s+(.*)$/gm, '<li>$1</li>');
  markdown = markdown.replace(/(<li>.*<\/li>)/gim, '<ol>$1</ol>');

  // Convertir tablas
  markdown = markdown.replace(/^\|(.+)\|$/gm, '<tr><td>$1</td></tr>');
  markdown = markdown.replace(/<tr><td>(.+)<\/td><\/tr>/gim, '<table><tr><td>$1</td></tr></table>');
  markdown = markdown.replace(/<\/tr><\/table>\s*<table><tr>/gim, '</tr><tr>');

  // Convertir bloques de código
  markdown = markdown.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>');

  // Convertir código
  markdown = markdown.replace(/`([^`]+)`/gim, '<code>$1</code>');

  return markdown.trim();
}