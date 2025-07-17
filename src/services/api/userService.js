import usersData from "@/services/mockData/users.json";

class UserService {
  constructor() {
    this.users = [...usersData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.users];
  }

  async getById(id) {
    await this.delay();
    const user = this.users.find(u => u.Id === parseInt(id));
    return user ? { ...user } : null;
  }

  async getByUsername(username) {
    await this.delay();
    const user = this.users.find(u => u.username === username);
    return user ? { ...user } : null;
  }

  async create(userData) {
    await this.delay();
    const newUser = {
      ...userData,
      Id: Math.max(...this.users.map(u => u.Id)) + 1,
      postCount: 0
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) return null;
    
    this.users[index] = { ...this.users[index], ...updateData };
    return { ...this.users[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.users.findIndex(u => u.Id === parseInt(id));
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }

  async searchUsers(query) {
    await this.delay();
    return this.users.filter(u => 
      u.username.toLowerCase().includes(query.toLowerCase())
    ).map(u => ({ ...u }));
  }

  async getCurrentUser() {
    await this.delay();
    return { ...this.users[0] }; // Return first user as current user
  }
}

export default new UserService();