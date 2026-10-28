import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('posts?_limit=10');
      setNotices(data);
    } catch (e) {
      setError(e.message || 'Falha ao carregar avisos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addNotice = useCallback((notice) => {
    setNotices((current) => [notice, ...current]);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { notices, isLoading, error, reload, addNotice };
}