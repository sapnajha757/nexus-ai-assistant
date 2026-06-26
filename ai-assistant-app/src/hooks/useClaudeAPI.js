import { useState, useCallback } from 'react';

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

export function useClaudeAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (messages, systemPrompt = '') => {
    setLoading(true);
    setError(null);

    try {
      const body = {
       model: 'openrouter/auto',
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          ...messages,
        ],
      };

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response received.';
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMessage, loading, error };
}