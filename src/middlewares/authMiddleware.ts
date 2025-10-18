import { Request, Response , NextFunction} from "express"
import  Jwt  from "jsonwebtoken"

export function authMiddleware(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({error:"Token nao fornecido"})
    }

    const [, token] = authHeader.split(" ");

    if (!token){
        return res.status(401).json({error: "Token ausente"});
    }

    try {
        const decoded = Jwt.verify(token as string , process.env.JWT_SECRET || "secretkey123");
        (req as any).user = decoded
        next();
    } catch (error) {
        return res.status(401).json({error: "Token invalido ou expirado"})
    }
}