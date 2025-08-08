import { ENDPOINTS } from '../config/api';

export async function parsePipeline(pipeline) {
  const formData = new FormData();
  formData.append('pipeline', JSON.stringify(pipeline));

  const response = await fetch(ENDPOINTS.parsePipeline, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}