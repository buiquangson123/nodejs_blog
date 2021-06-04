const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Acount = new Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String },
    tel: { type: String,},
    email: { type: String },
}, {
    //thời gian tạo và update bản ghi
    timestamps: true,
    //phiên bản 
    versionKey: false,
});

//hàm sx
Acount.query.sortable = function(req) {
    if(req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}

Acount.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: true,
});

module.exports = mongoose.model('Acount', Acount);