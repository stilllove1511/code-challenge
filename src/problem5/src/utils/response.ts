import { Response } from 'express'

export const ok = <T>(res: Response, data: T) => {
    return res.status(200).json({ success: true, data })
}

export const created = <T>(res: Response, data: T) => {
    return res.status(201).json({ success: true, data })
}

export const badRequest = (res: Response, message: string) => {
    return res.status(400).json({ success: false, message })
}

export const notFound = (res: Response, message: string) => {
    return res.status(404).json({ success: false, message })
}
export const conflict = (res: Response, message: string) => {
    return res.status(409).json({ success: false, message });
};
