import postsData from "@/services/mockData/posts.json";

class PostService {
  constructor() {
    this.posts = [...postsData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await this.delay();
    const post = this.posts.find(p => p.Id === parseInt(id));
    return post ? { ...post } : null;
  }

  async getByUserId(userId) {
    await this.delay();
    return this.posts.filter(p => p.userId === userId).map(p => ({ ...p }));
  }

  async searchByHashtag(hashtag) {
    await this.delay();
    return this.posts.filter(p => 
      p.hashtags.some(tag => tag.toLowerCase().includes(hashtag.toLowerCase()))
    ).map(p => ({ ...p }));
  }

  async searchByCaption(query) {
    await this.delay();
    return this.posts.filter(p => 
      p.caption.toLowerCase().includes(query.toLowerCase())
    ).map(p => ({ ...p }));
  }

  async create(postData) {
    await this.delay();
    const newPost = {
      ...postData,
      Id: Math.max(...this.posts.map(p => p.Id)) + 1,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString()
    };
    this.posts.push(newPost);
    return { ...newPost };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) return null;
    
    this.posts[index] = { ...this.posts[index], ...updateData };
    return { ...this.posts[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) return false;
    
    this.posts.splice(index, 1);
    return true;
  }

  async likePost(id) {
    await this.delay();
    const post = this.posts.find(p => p.Id === parseInt(id));
    if (!post) return null;
    
    post.likes += 1;
    return { ...post };
  }

  async unlikePost(id) {
    await this.delay();
    const post = this.posts.find(p => p.Id === parseInt(id));
    if (!post) return null;
    
    post.likes = Math.max(0, post.likes - 1);
    return { ...post };
  }
}

export default new PostService();