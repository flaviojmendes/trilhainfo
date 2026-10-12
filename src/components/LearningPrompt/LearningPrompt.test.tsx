import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LearningPrompt from '.';
import { vi } from 'vitest';

const prompt = 'Objetivo: [mudança].\nVerificação: [teste].';

describe('Prompt de estudo', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('copia o prompt completo e orienta a adaptação do contexto', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<LearningPrompt prompt={prompt} label="Prática de IA" />);
    expect(screen.getByRole('textbox', { name: 'Prompt de Prática de IA' })).toHaveValue(prompt);
    fireEvent.click(screen.getByRole('button', { name: 'Copiar prompt de Prática de IA' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Prompt copiado.'));
    expect(writeText).toHaveBeenCalledWith(prompt);
  });

  it('mantém o prompt disponível quando a permissão de cópia é negada', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('Permission denied')),
      },
    });
    render(<LearningPrompt prompt={prompt} label="Prática de IA" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copiar prompt de Prática de IA' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('copie manualmente'));
    expect(screen.getByRole('textbox')).toHaveValue(prompt);
  });
});
