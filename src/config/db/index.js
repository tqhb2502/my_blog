const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/my_education_dev');
        console.log('connected!');
    } catch (error) {
        console.log('fail!');
    }
}

module.exports = { connect };
