const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

export const postConfession = async (content) => {
    const response = await fetch(`${API_BASE_URL}/confession/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    return response.json();
};

export const findFriend = async () => {
    const response = await fetch(`${API_BASE_URL}/match/find`);
    return response.json();
};
