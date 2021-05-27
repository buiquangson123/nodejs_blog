const mongoose = require('mongoose');
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

module.exports = mongoose.model('Course', Course);