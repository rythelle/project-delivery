import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) {
    return response.status(401).json({
      message: "Token is missing.",
    });
  }

  const [, token] = auth.split(" ");

  try {
    const { sub } = verify(token, String(process.env.JWT_SECRET_DELIVERYMAN)) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Token is invalid.",
    });
  }
}
