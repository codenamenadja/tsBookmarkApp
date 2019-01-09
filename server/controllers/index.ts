import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./../routes/baseRoutes";
import ItemList from "../model/list_model";
import * as template from "../../common/template";
import * as Iresponse from "../../common/types/Iresponse";

export class Index extends BaseRoute {
    constructor() {
        super();
    }

    public renderView(req: Request, res: Response, next: NextFunction) {
        let title = "Happy book Mark";
        let listArr = new ItemList().getList();
        let listHTML: string = template.getItemTemplate(listArr);

        let options: Object = {
            title: title,
            listHTML: listHTML,
        };

        this.render(req, res, "index", options);
    }
    public add(req: Request, res: Response, next: NextFunction) {
        let item = req.body.item;

        let response: Iresponse.IresponseItem = { success: true, item: item };
        res.send(response);
    }
}