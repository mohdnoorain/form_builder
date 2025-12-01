import express, { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), "deploy.env") });

import { appRoutes } from './routes/app.routes';
import cors from "cors"
import { AppDataSource } from './data_sources/dataSources';
import { RES_MSG, RES_STATUS, RES_TYPE } from './constants/server.constants';
import { ResData } from './interfaces/common.interfaces';

const app = express();

// rate limiting for later
app.use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "Authorization"],
    maxAge: 60 * 60 * 24
}));

app.use(express.json({
    limit: "256kb",
    type: "application/json",
    reviver: (key, value) => {
        return typeof value === "string" ? value.trim() : value;
    }
}));

// Error handling middleware
app.use((err: any, _REQ: Request, _RES: Response, _NEXT: NextFunction) => {
    console.error(err);

    const errData: ResData = {
        type: RES_TYPE.badRequest,
        message: RES_MSG.bodyParsingErr,
    }

    // catch invalid json body.
    if (err?.status === 400 && "body" in err) {
        _RES.status(RES_STATUS.badRequest).json(errData);
        return;
    } else {
        errData.message = RES_MSG.unknownErr;
        _RES.status(RES_STATUS.internalServerError).json(errData);
    }
});

app.get('/', (req, res) => { res.send("Hlo ther !") })

app.use('/api/v1', appRoutes);

async function startServer() {
    try {
        await AppDataSource.initialize();
        console.log('DB connection success 👍.');
        const port = Number(process.env.SERVER_PORT || 8200);
        app.listen(port, () => {
            console.log(`server runnig at  http://localhost:${port}`);
        });
    } catch (error) {
        console.log("OOps 🤨", error);
        process.exit(-1)
    }
}

startServer();