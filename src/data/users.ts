import bcrypt from "bcryptjs";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: "user" | "seller" | "admin";
  createdAt: Date;
}

// Sample users with hashed passwords
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "user",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    username: "janesmith",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "seller",
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    username: "admin",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "admin",
    createdAt: new Date("2024-01-03"),
  },
];

export const createUser = async (userData: Omit<User, "id" | "createdAt">): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    ...userData,
    id: (users.length + 1).toString(),
    password: hashedPassword,
    createdAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};
