const Handlebars = require('handlebars');

module.exports = {
    isMes: (mes) => {
        if(typeof mes === 'undefined'){
            mes = "";
            const href = Handlebars.escapeExpression(`${mes}`);
            const output = `<h2 style="color:red">${href}</h2>`
            return new Handlebars.SafeString(output);
        }else{
            mes = "Tài khoản hoặc mật khẩu không chính xác";
            const href = Handlebars.escapeExpression(`${mes}`);
            const output = `<h2 style="color:red">${href}</h2>`
            return new Handlebars.SafeString(output);
        }
    },
    sum: (a, b) => a + b,
    sortable: (field, sort) =>{
        //sort.type lần đầu luôn là default => types[default] = desc
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending',
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);

        const output =  `<a href="${href}">
                            <span class="${icon}"></span>
                        </a>`
        return new Handlebars.SafeString(output);
    }
}