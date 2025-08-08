export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const ENDPOINTS = {
  parsePipeline: `${API_BASE_URL}/pipelines/parse`,
};