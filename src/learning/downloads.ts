export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadVisualization(filename: string): Promise<void> {
  const node = document.getElementById('learning-view');
  if (!node) throw new Error('Abra uma visualização da trilha para gerar a imagem.');
  if (node.scrollHeight > 8000 || node.scrollHeight * node.scrollWidth > 16_000_000) {
    throw new Error(
      'Esta visualização é grande para uma imagem. Use o Mapa ou baixe o Markdown completo.',
    );
  }
  const { default: domtoimage } = await import('dom-to-image');
  const data = await domtoimage.toPng(node, { bgcolor: '#101218' });
  const link = document.createElement('a');
  link.href = data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
