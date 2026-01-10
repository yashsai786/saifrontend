// Django Backend API Configuration
// Replace this URL with your deployed Django backend URL
export const API_BASE_URL = 'http://10.200.14.132:8000';
import type { CrowdsourceReport } from '@/types';

// API Endpoints based on your Django URLs
export const API_ENDPOINTS = {
  // User Authentication (api/user/)
  auth: {
    register: `${API_BASE_URL}/api/user/register/`,
    login: `${API_BASE_URL}/api/user/login/`,
    profile: `${API_BASE_URL}/api/user/profile/`,
    resetPassword: `${API_BASE_URL}/api/user/send-reset-password-email/`,
  },
  
  // Token Management
  token: {
    obtain: `${API_BASE_URL}/api/token/`,
    refresh: `${API_BASE_URL}/api/token/refresh/`,
  },
  
  // Flood Management (api/floodmanagement/)
  flood: {
    help: `${API_BASE_URL}/api/floodmanagement/help/`,
    helpList: `${API_BASE_URL}/api/floodmanagement/helplist/`,
    helpDetails: (id: number) => `${API_BASE_URL}/api/floodmanagement/helpdetails/${id}/`,
    crowdsource: `${API_BASE_URL}/api/floodmanagement/crowdsource/`,
    crowdsourceDetails: (id: number) => `${API_BASE_URL}/api/floodmanagement/crowdsourcedetails/${id}/`,
    crowdsourceList: `${API_BASE_URL}/api/floodmanagement/crowdsourcelist/`,
    forecast: `${API_BASE_URL}/api/floodmanagement/forcast/`,
    forecastMap: `${API_BASE_URL}/api/floodmanagement/forcastmap/`,
    tips: `${API_BASE_URL}/api/floodmanagement/tips/`,
    safetyCheck: `${API_BASE_URL}/api/floodmanagement/saftycheck/`,
    inundation: `${API_BASE_URL}/api/floodmanagement/inundation/`,
    broadcast: `${API_BASE_URL}/api/floodmanagement/broadcast/`,
  },
};

// Token storage keys
const ACCESS_TOKEN_KEY = 'neerorbit_access_token';
const REFRESH_TOKEN_KEY = 'neerorbit_refresh_token';

// Token management
export const tokenManager = {
  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// API request helper with authentication
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenManager.getAccessToken();
  
  const headers: HeadersInit = {
    // 'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  const response = await fetch(endpoint, {
    ...options,
    headers,
  });
  
  // Handle token refresh if needed
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry the request with new token
      const newToken = tokenManager.getAccessToken();
      const retryHeaders: HeadersInit = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };
      const retryResponse = await fetch(endpoint, { ...options, headers: retryHeaders });
      if (!retryResponse.ok) {
        throw new Error(`API Error: ${retryResponse.status}`);
      }
      return retryResponse.json();
    }
    throw new Error('Session expired. Please login again.');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  
  return response.json();
}

// Refresh access token
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = tokenManager.getRefreshToken();
  if (!refreshToken) return false;
  
  try {
    const response = await fetch(API_ENDPOINTS.token.refresh, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (response.ok) {
      const data = await response.json();
      tokenManager.setTokens(data.access, refreshToken);
      return true;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
  }
  
  tokenManager.clearTokens();
  return false;
}

// Auth API functions
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Registration failed');
    }
    
    return response.json();
  },
  
  login: async (email: string, password: string) => {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Invalid credentials');
    }
    
    const data = await response.json();
    // const data = await response.json();

// 🔥 SUPPORT BOTH RESPONSE TYPES
if (data.access && data.refresh) {
  tokenManager.setTokens(data.access, data.refresh);
} else if (data.token?.access && data.token?.refresh) {
  tokenManager.setTokens(data.token.access, data.token.refresh);
} else {
  throw new Error("Access token not received from server");
}

return data;

    
    return data;
  },
  
  logout: () => {
    tokenManager.clearTokens();
  },
  
  getProfile: async () => {
    return apiRequest(API_ENDPOINTS.auth.profile);
  },
  
  resetPassword: async (email: string) => {
    return apiRequest(API_ENDPOINTS.auth.resetPassword, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// Flood Management API functions
export const floodAPI = {
  getForecast: async () => {
    return apiRequest(API_ENDPOINTS.flood.forecast);
  },
  
  getForecastMap: async () => {
    return apiRequest(API_ENDPOINTS.flood.forecastMap);
  },
  
  getTips: async () => {
    return apiRequest(API_ENDPOINTS.flood.tips);
  },
  
  getSafetyCheck: async () => {
    return apiRequest(API_ENDPOINTS.flood.safetyCheck);
  },
  
  getInundation: async () => {
    return apiRequest(API_ENDPOINTS.flood.inundation);
  },
  
  // submitCrowdsource: async (data: {
  //   latitude: number;
  //   longitude: number;
  //   description: string;
  //   imageUrl?: string;
  // }) => {
  //   return apiRequest(API_ENDPOINTS.flood.crowdsource, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  // },
  
  submitCrowdsource: async ({
  latitude,
  longitude,
  category,
  description,
  image,
}: {
  latitude: number;
  longitude: number;
  category: string;
  description: string;
  image: File;
}) => {
  const formData = new FormData();

  formData.append("latitude", String(latitude));
  formData.append("longitude", String(longitude));
  formData.append("category", category);
  formData.append("description", description);
  formData.append("image", image);

  // ✅ USE tokenManager (NOT localStorage DIRECT)
  const token = tokenManager.getAccessToken();

  if (!token) {
    throw new Error("Not authenticated. Please login again.");
  }

  const response = await fetch(API_ENDPOINTS.flood.crowdsource, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ VALID TOKEN
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Crowdsource submission failed");
  }

  return response.json();
},

getUserCrowdsource: async (): Promise<CrowdsourceReport[]> => {
    return apiRequest<CrowdsourceReport[]>(
      // agar URL alag hai to yaha new endpoint daal
      `${API_BASE_URL}/api/floodmanagement/crowdsource/user/`
    );
  },

  // 👉 all contributions (already existing list)
  getCrowdsourceList: async (): Promise<CrowdsourceReport[]> => {
    return apiRequest<CrowdsourceReport[]>(API_ENDPOINTS.flood.crowdsourceList);
  },

  // async getUserCrowdsource(accessToken: string) {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crowdsource/user/`, {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   });

  //   if (!res.ok) {
  //     throw new Error('Failed to fetch your contributions');
  //   }

  //   return res.json(); // array of contributions
  // },

  // getCrowdsourceList: async () => {
  //   return apiRequest(API_ENDPOINTS.flood.crowdsourceList);
  // },
  
  submitHelpRequest: async (data: {
    latitude: number;
    longitude: number;
    description: string;
    urgency: 'low' | 'medium' | 'high';
  }) => {
    return apiRequest(API_ENDPOINTS.flood.help, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  getHelpList: async () => {
    return apiRequest(API_ENDPOINTS.flood.helpList);
  },
  
  broadcastAlert: async (message: string, area: string) => {
    return apiRequest(API_ENDPOINTS.flood.broadcast, {
      method: 'POST',
      body: JSON.stringify({ message, area }),
    });
  },
};
