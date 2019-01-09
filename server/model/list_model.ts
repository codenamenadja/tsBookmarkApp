import Item from "../../common/types/Item";

export default class ItemList {
    public getList(): Item[] {
        let arr: Item[] = [];
        arr.push({
            title:"bookmarkA",
            intro:"sample book-mark with name 'bookmarkA'",
            url:"http://books.google.com",
        },{
            title:"bookmarkB",
            intro:"sample book-mark with name 'bookmarkB'",
            url:"http://books.google.com",
        },{
            title:"bookmarkC",
            intro:"sample book-mark with name 'bookmarkC'",
            url:"http://books.google.com",
        },{
            title:"bookmarkD",
            intro:"sample book-mark with name 'bookmarkD'",
            url:"http://books.google.com",
        });
        return arr;
    }
}