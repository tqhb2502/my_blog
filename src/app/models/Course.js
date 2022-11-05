const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    videoID: { type: String, required: true },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, {
    _id: false,
    timestamps: true,
});

// custom query helpers
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        let isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'asc'
        });
    }
    return this;
};

// add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all"
});

module.exports = mongoose.model('Course', Course);
