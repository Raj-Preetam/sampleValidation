const {DataStore} = require('notarealdb');

const db = new DataStore('./databases');

const AuthorDetails = db.collection('author');
const PostDetails = db.collection('post');
module.exports = {AuthorDetails,PostDetails};