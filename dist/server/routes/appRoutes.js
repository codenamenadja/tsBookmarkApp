"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseRoutes_1 = require("./baseRoutes");
const index_1 = require("../controllers/index");
class AppRoutes extends baseRoutes_1.BaseRoute {
    constructor() {
        super();
    }
    static create(router) {
        router.route("/").get((req, res, next) => {
            new index_1.Index().renderView(req, res, next);
        });
        router.route("/add").post((req, res, next) => {
            new index_1.Index().add(req, res, next);
        });
    }
}
exports.AppRoutes = AppRoutes;
