/* 
 model adapter for user
 */

var User = new (function () {
    
    this.save = function (user, opts, callback) {
        // sometimes we won't need to pass a callback
        if (typeof callback != 'function') {
            callback = function(){};
        }
        // Mongo doesn't like it when you send functions to it
        // so let's make sure we're only using the properties
        cleanUser = {
            id: user.id
            //, saved: user.saved
            ,
            login: user.login
            ,
            name: user.name
            , 
            lastname: user.lastname
        };
        // Double check to see if this thing is valid
        user = geddy.model.User.create(cleanUser);
        if (!user.isValid()) {
            return callback(user.errors, null);
        }
        // Check to see if we have this to do item already
        geddy.db.users.findOne({
            id: user.id
            }, function(err, doc){
            if (err) {
                return callback(err, null);
            }
            // if we already have the to do item, update it with the new values
            if (doc) {
                geddy.db.users.update({
                    id: user.id
                    }, cleanUser, function(err, docs){
                    return callback(user.errors, user);
                });
            }
            // if we don't already have the to do item, save a new one
            else {
                user.saved = true;
                geddy.db.users.save(user, function(err, docs){
                    return callback(err, docs);
                });
            }
        });
    }

    this.all = function (callback) {
        var users = [];
        geddy.db.users.find().toArray(function(err, docs){
            // if there's an error, return early
            if (err) {
               
                return callback(err, null);
            }
            // iterate through the docs and create models out of them
            for (var i in docs) {
                users.push( geddy.model.User.create(docs[i]) )
            }
   
            return callback(null, users);
        });
    }

    this.load = function (id, callback) {
        var user;
        // find a user in the db
        geddy.db.users.findOne({
            id: id
        }, function(err, doc){
            // if there's an error, return early
            if (err) {
                return callback(err, null);
            }
            // if there's a doc, create a model out of it
            if (doc) {
                user = geddy.model.User.create(doc);
            }
            return callback(null, user);
        });
    };

    this.remove = function(id, callback) {
        if (typeof callback != 'function') {
            callback = function(){};
        }
        geddy.db.users.remove({
            id: id
        }, function(err, res){
            callback(err);
        });
    }
       
})();
exports.User = User;
            






