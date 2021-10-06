/*
 Checks if payload is valid and throws error if it is not.
 */
import {NextFunction} from "express";
import {Request, Response} from 'express';

export const payloadValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    // if (!payload.userId) throw new Error('The `userId` parameter is not present.');
    if (!payload.childhoodDisease) throw new Error('The `childhoodDisease` parameter is not present.');
    if (!payload.majorAdultDisease) throw new Error('The `majorAdultDisease` parameter is not present.');
    if (!payload.surgeries) throw new Error('The `surgeries` parameter is not present.');
    if (!payload.priorInjuries) throw new Error('The `priorInjuries` parameter is not present.');
    if (!payload.medications) throw new Error('The `medications` parameter is not present.');
    if (!payload.allergies) throw new Error('The `allergies` parameter is not present.');

    next();
}