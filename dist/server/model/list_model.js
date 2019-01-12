"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemList {
    getList() {
        let arr = [];
        arr.push({
            title: "bookmarkA",
            intro: "sample book-mark with name 'bookmarkA'",
            url: "http://books.google.com",
        }, {
            title: "bookmarkB",
            intro: "sample book-mark with name 'bookmarkB'",
            url: "http://books.google.com",
        }, {
            title: "bookmarkC",
            intro: "sample book-mark with name 'bookmarkC'",
            url: "http://books.google.com",
        }, {
            title: "bookmarkD",
            intro: "sample book-mark with name 'bookmarkD'",
            url: "http://books.google.com",
        });
        return arr;
    }
}
exports.default = ItemList;
