import { BaseRoute } from "./baseRoutes";
import { NextFunction, Request, Response, Router } from "express";
import { Index as IndexRoute } from "../controllers/index";

export class AppRoutes extends BaseRoute {
    constructor() {
        super();
    }

    public static create(router: Router) {
        router.route("/").get((req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().renderView(req, res, next);
        });

        router.route("/add").post((req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().add(req, res, next);
        })
    }
}