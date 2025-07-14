import "dotenv/config";

import { emailSignups, type EmailSignup, type InsertEmailSignup } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export interface IStorage {
  createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup>;
  getEmailSignup(email: string): Promise<EmailSignup | undefined>;
  getAllEmailSignups(): Promise<EmailSignup[]>;
}

export class PgStorage implements IStorage {
  async createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup> {
    const [created] = await db.insert(emailSignups).values(signup).returning();
    return created;
  }

  async getEmailSignup(email: string): Promise<EmailSignup | undefined> {
    const [found] = await db.select().from(emailSignups).where(eq(emailSignups.email, email));
    return found;
  }

  async getAllEmailSignups(): Promise<EmailSignup[]> {
    return db.select().from(emailSignups);
  }
}

export const storage = new PgStorage();
