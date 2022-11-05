const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortIconDisplay: (field, sortInfo) => {
        const icons = {
            default: "fa-solid fa-sort",
            asc: "fa-solid fa-arrow-down-short-wide",
            desc: "fa-solid fa-arrow-down-wide-short"
        };

        const nextTypes = {
            default: "asc",
            asc: "desc",
            desc: "asc"
        };

        let sortType = field === sortInfo.column ? sortInfo.type : 'default';
        sortType = ['default', 'asc', 'desc'].includes(sortType) ? sortType : 'asc';
        const icon = icons[sortType];
        const nextType = nextTypes[sortType];

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${nextType}`);

        const output = `<a href="${href}">
                            <i class="${icon}"></i>
                        </a>`;

        return new Handlebars.SafeString(output);
    }
};
