import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const storySchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" }),
  genre: z.string().min(2, { message: "Genre must be at least 2 characters long" }),
  synopsis: z.string().min(10, { message: "Synopsis must be at least 10 characters long" }),
});

export const characterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  role: z.string().min(2, { message: "Role must be at least 2 characters long" }),
  archetype: z.string().min(2, { message: "Archetype must be at least 2 characters long" }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters long" }),
  traits: z.string().min(2, { message: "Traits must be at least 2 characters long" }),
});
