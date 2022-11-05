function sortMiddleware(req, res, next) {
    res.locals.sortInfo = {
        enable: false,
        column: 'none',
        type: 'default'
    };

    if (req.query.hasOwnProperty('_sort')) {
        res.locals.sortInfo.enable = true;
        res.locals.sortInfo.column = req.query.column;
        res.locals.sortInfo.type = req.query.type;
    }

    next();
}

module.exports = SortMiddleware;