import { useState } from 'react';

export default function LearningPrompt({ prompt, label }: { prompt: string; label: string }) {
  const [status, setStatus] = useState('');

  async function copyPrompt() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(prompt);
      setStatus(
        'Prompt copiado. Substitua os campos entre colchetes pelo contexto do seu projeto.',
      );
    } catch {
      setStatus('Selecione o texto do prompt e copie manualmente.');
    }
  }

  return (
    <div className="my-4 font-title text-text-primary">
      <p className="mb-2 font-semibold">Prompt para adaptar</p>
      <textarea
        aria-label={`Prompt de ${label}`}
        readOnly
        value={prompt}
        rows={Math.min(prompt.split('\n').length + 1, 14)}
        className="w-full rounded-sm border border-title-primary bg-black p-3 font-monospace text-sm leading-relaxed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      />
      <button
        type="button"
        onClick={copyPrompt}
        aria-label={`Copiar prompt de ${label}`}
        className="mt-2 rounded-sm border border-title-primary px-3 py-2 text-sm font-semibold hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Copiar prompt
      </button>
      <p className="mt-2 text-sm leading-relaxed" role="status">
        {status}
      </p>
    </div>
  );
}
