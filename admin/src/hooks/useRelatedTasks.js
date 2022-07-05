import { useEffect, useState } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import axiosInstance from '../utils/axiosInstance';

function useRelatedTasks() {
  const { initialData, isSingleType, slug } = useCMEditViewDataManager();
  const [status, setStatus] = useState('loading');
  const [tasks, setTasks] = useState([]);

  const refetchTasks = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/todo/tasks/${slug}?id=${isSingleType ? '' : initialData.id}`
      );

      setTasks(data);
      setStatus('success');
    } catch (e) {
      setStatus('error');
    }
  };

  useEffect(() => {
    refetchTasks();
  }, [initialData, isSingleType, axiosInstance, setTasks, setStatus]);

  return { status, tasks, refetchTasks };
}

export default useRelatedTasks;
