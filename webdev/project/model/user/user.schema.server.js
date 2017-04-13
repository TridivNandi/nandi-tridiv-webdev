/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {id: String, token: String},
        google: {id: String, token: String},
        email: String,
        imgUrl: String,
        phone: String,
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'RateMyMovieMovie'}],
        movieLikes: [String],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'RateMyMovieUser'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'RateMyMovieUser'}],
        role: {type: String, enum: ['user', 'admin'], default: 'admin'},
        dateCreated: {type: Date, default: Date.now()},
        //type: {type: String, default: 'mr'}
    }, {collection: 'rate_my_movies.user'});
    return userSchema;

};