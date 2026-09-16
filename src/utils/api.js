const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.accessToken = localStorage.getItem('af_access_token');
    this.refreshToken = localStorage.getItem('af_refresh_token');
  }

  setTokens(access, refresh) {
    this.accessToken = access;
    localStorage.setItem('af_access_token', access);
    if (refresh) {
      this.refreshToken = refresh;
      localStorage.setItem('af_refresh_token', refresh);
    }
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('af_access_token');
    localStorage.removeItem('af_refresh_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Set headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    let response = await fetch(url, { ...options, headers });

    // Handle token expiration & retry once
    if (response.status === 403 && this.refreshToken) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${this.accessToken}`;
        response = await fetch(url, { ...options, headers });
      } else {
        this.clearTokens();
        window.dispatchEvent(new Event('auth-expired'));
      }
    }

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP error ${response.status}`);
    }

    return response.json();
  }

  async refreshAccessToken() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.refreshToken })
      });
      if (res.ok) {
        const data = await res.json();
        this.setTokens(data.accessToken, this.refreshToken);
        return true;
      }
    } catch (e) {
      console.error('Refresh token failed:', e);
    }
    return false;
  }

  // Auth Operations
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setTokens(data.accessToken, data.refreshToken);
    return data.user;
  }

  async signup(name, email, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  }

  async getMe() {
    if (!this.accessToken) return null;
    return this.request('/auth/me');
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ token: this.refreshToken })
      });
    } catch (e) {}
    this.clearTokens();
  }

  // Assets Operations
  async getAssets(filters = {}) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/assets?${query}`);
  }

  async getAssetById(id) {
    return this.request(`/assets/${id}`);
  }

  async createAsset(assetData) {
    return this.request('/assets', {
      method: 'POST',
      body: JSON.stringify(assetData)
    });
  }

  async updateAsset(id, assetData) {
    return this.request(`/assets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(assetData)
    });
  }

  // Organization Operations
  async getDepartments() {
    return this.request('/departments');
  }

  async createDepartment(data) {
    return this.request('/departments', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateDepartment(id, data) {
    return this.request(`/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteDepartment(id) {
    return this.request(`/departments/${id}`, {
      method: 'DELETE'
    });
  }

  async getCategories() {
    return this.request('/categories');
  }

  async createCategory(data) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateCategory(id, data) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async deleteCategory(id) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE'
    });
  }

  async getEmployees() {
    return this.request('/employees');
  }

  async promoteEmployee(id, data) {
    return this.request(`/employees/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async updateEmployeeProfile(id, data) {
    return this.request(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Transfers Operations
  async getTransfers() {
    return this.request('/transfers');
  }

  async requestTransfer(assetId, toEmployeeId) {
    return this.request('/transfers', {
      method: 'POST',
      body: JSON.stringify({ assetId, toEmployeeId })
    });
  }

  async actionTransfer(id, action) {
    return this.request(`/transfers/${id}/action`, {
      method: 'PUT',
      body: JSON.stringify({ action })
    });
  }

  async returnAsset(assetId, condition) {
    return this.request('/transfers/return', {
      method: 'POST',
      body: JSON.stringify({ assetId, condition })
    });
  }

  // Bookings Operations
  async getBookings() {
    return this.request('/bookings');
  }

  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  }

  async cancelBooking(id) {
    return this.request(`/bookings/${id}/cancel`, {
      method: 'PUT'
    });
  }

  // Maintenance Operations
  async getMaintenanceJobs() {
    return this.request('/maintenance');
  }

  async raiseMaintenance(data) {
    return this.request('/maintenance', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async actionMaintenance(id, action) {
    return this.request(`/maintenance/${id}/action`, {
      method: 'PUT',
      body: JSON.stringify({ action })
    });
  }

  async assignTechnician(id, technicianId) {
    return this.request(`/maintenance/${id}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ technicianId })
    });
  }

  async updateMaintenanceStatus(id, status, condition) {
    return this.request(`/maintenance/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, condition })
    });
  }

  // Audits Operations
  async getAudits() {
    return this.request('/audits');
  }

  async getAuditDetails(id) {
    return this.request(`/audits/${id}`);
  }

  async initiateAudit(data) {
    return this.request('/audits', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async verifyAuditAsset(id, data) {
    return this.request(`/audits/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateAuditStatus(id, status) {
    return this.request(`/audits/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  // Reports & Logs Operations
  async getReportSummary() {
    return this.request('/reports/summary');
  }

  async getActivityLogs() {
    return this.request('/logs');
  }

  // Notifications Operations
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT'
    });
  }
}

export const api = new ApiService();
