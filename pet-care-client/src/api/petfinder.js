import API_BASE from './config';

export const getPetfinderToken = async () => {
  const response = await fetch(`${API_BASE}/api/petfinder-token`);
  const data = await response.json();
  return data.token;
};
