import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";

// Kết nối MongoDB bằng Mongoose
const connectMongoDB = async () => {
  try {
    const mongoURL = "mongodb://127.0.0.1:27017/Billing";
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Kết nối Prisma
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Đảm bảo Prisma ngắt kết nối khi server dừng
if (process.env.NODE_ENV !== "production") {
  process.on("exit", () => {
    prisma.$disconnect();
  });
}

// Kết nối MongoDB khi server khởi động
connectMongoDB();

export default prisma;
