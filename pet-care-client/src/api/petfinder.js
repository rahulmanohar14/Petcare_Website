const PETFINDER_API_KEY = 'poF7dFZyrPLgusajwWw6CMmafu5WdIuq0C8CFf2rlMJrK60TWt';
const PETFINDER_API_SECRET = '24a5RiqarewlamipbEyBZggOVbYBcbvIasTX85AD';

export const getPetfinderToken = async () => {
  const response = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: PETFINDER_API_KEY,
      client_secret: PETFINDER_API_SECRET
    })
  });

  const data = await response.json();
  return data.access_token;
};