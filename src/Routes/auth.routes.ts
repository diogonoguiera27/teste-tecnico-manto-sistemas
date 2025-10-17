import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const authRouter = Router();
const prisma = new PrismaClient();

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(404)
        .json({ error: "Todos os campos são Obrigatorios" });
    }
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "E-mail ja Cadastrado" });
    }

    const hashedPassaword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassaword },
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no registro", error);
    res.status(500).json({ error: "Erro interni no servidor" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha sao obrigatorios" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "usuario nao encontrado" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "senha incorreta" });
    }

    const token = Jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "2h" }
    );

    res.json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    console.error("Erro no Login:", error);
    res.status(500).json({ error: "Erro Interno no Servidor" });
  }
});
