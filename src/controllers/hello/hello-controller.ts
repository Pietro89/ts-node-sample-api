import {Request, Response} from "express";
import {generateHello} from "../../services/hello/hello-service";

export async function GET(req: Request, res: Response): Promise<Response> {
    const size = req.query.size
    try {
        const army = await generateHello(Number(size))
        return res.status(200).send(army);
    } catch (e) {
        return res.status(500);
    }

}
