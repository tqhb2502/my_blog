function toObjectArray(docs) {
    return docs.map(doc => doc.toObject());
}

function toSingleObject(doc) {
    return doc.toObject();
}

module.exports = {
    toObjectArray,
    toSingleObject,
};
