export class QueryService {
    constructor() { }

    public setSelect(req) {
        let select: string = '';
        if (req.query.select) select = req.query.select;
        return select;
    }

    public setPopulate(select: string, path: string): { path: string, select: string } | null {
        return select ? { path: path, select: select } : null;
    }
}