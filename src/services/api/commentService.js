import commentsData from "@/services/mockData/comments.json";

class CommentService {
  constructor() {
    this.comments = [...commentsData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.comments];
  }

  async getById(id) {
    await this.delay();
    const comment = this.comments.find(c => c.Id === parseInt(id));
    return comment ? { ...comment } : null;
  }

  async getByPostId(postId) {
    await this.delay();
    return this.comments.filter(c => c.postId === postId).map(c => ({ ...c }));
  }

  async create(commentData) {
    await this.delay();
    const newComment = {
      ...commentData,
      Id: Math.max(...this.comments.map(c => c.Id)) + 1,
      timestamp: new Date().toISOString()
    };
    this.comments.push(newComment);
    return { ...newComment };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.comments.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return null;
    
    this.comments[index] = { ...this.comments[index], ...updateData };
    return { ...this.comments[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.comments.findIndex(c => c.Id === parseInt(id));
    if (index === -1) return false;
    
    this.comments.splice(index, 1);
    return true;
  }
}

export default new CommentService();