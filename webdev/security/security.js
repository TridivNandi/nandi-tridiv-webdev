/**
 * Created by Tridiv on 04-04-2017.
 */
module.exports = function (database, passport) {
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require('bcrypt-nodejs');
    var projectModel = database.RateMyMoviesModels().userModel;


    var googleConfig = {

        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {

        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };


    passport.use('rmm', new LocalStrategy(MRStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    // serialization and deserialization
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var api = {
        getPassport: getPassport,
        getBCrypt: getBCrypt
    };
    return api;


    function googleStrategy(token, refreshToken, profile, done) {
        projectModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return projectModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log("Inside security facebook strategy!!");
        projectModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    projectModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            console.log(err);
                            return done(err, null);
                        });
                }
            }, function (err) {
                console.log(err);
                return done(err, null);
            });
    }




    function MRStrategy(username, password, done) {
        projectModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }



    function deserializeUser(user, done) {


            projectModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });

    }

    function getPassport() {
        return passport;
    }

    function getBCrypt() {
        return bcrypt;
    }

};