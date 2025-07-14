import { users, emailSignups, type User, type InsertUser, type EmailSignup, type InsertEmailSignup } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup>;
  getEmailSignup(email: string): Promise<EmailSignup | undefined>;
  getAllEmailSignups(): Promise<EmailSignup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private emailSignups: Map<number, EmailSignup>;
  private emailSignupsByEmail: Map<string, EmailSignup>;
  private currentUserId: number;
  private currentSignupId: number;

  constructor() {
    this.users = new Map();
    this.emailSignups = new Map();
    this.emailSignupsByEmail = new Map();
    this.currentUserId = 1;
    this.currentSignupId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSignup(insertSignup: InsertEmailSignup): Promise<EmailSignup> {
    const id = this.currentSignupId++;
    const signup: EmailSignup = { 
      email: insertSignup.email,
      name: insertSignup.name || null,
      company: insertSignup.company || null,
      id, 
      createdAt: new Date() 
    };
    this.emailSignups.set(id, signup);
    this.emailSignupsByEmail.set(signup.email, signup);
    return signup;
  }

  async getEmailSignup(email: string): Promise<EmailSignup | undefined> {
    return this.emailSignupsByEmail.get(email);
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    return Array.from(this.emailSignups.values());
  }
}

export const storage = new MemStorage();
