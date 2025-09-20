const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.msg || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Users endpoints
  async getUsers() {
    return this.request('/users');
  }

  // Quizzes endpoints
  async getQuizzes() {
    return this.request('/quizzes');
  }

  // Assignments endpoints
  async getAssignments() {
    return this.request('/assignments');
  }

  // Chat endpoints
  async getChats() {
    return this.request('/chat');
  }

  // Files endpoints
  async uploadFile(formData: FormData) {
    return this.request('/files/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Don't set Content-Type for FormData
    });
  }

  async getFiles() {
    return this.request('/files');
  }
}

export const apiService = new ApiService();