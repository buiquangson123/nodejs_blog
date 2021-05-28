const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;


const Course = new Schema({
    name: { type: String },
    des: { type: String },
    image: { type: String },
    slug: { type: String, slug:'name', unique: true},
    videoId: { type: String },
}, {
    //thời gian tạo và update bản ghi
    timestamps: true,
    //phiên bản 
    versionKey: false,
});

Course.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: true,
});

module.exports = mongoose.model('Course', Course);