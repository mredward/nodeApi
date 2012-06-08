
var Users = function () {
    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.index = function (req, resp, params) {
        geddy.log.info('Ejecutando controller');
        var self = this;
        geddy.model.adapter.User.all(function(err, users){
             geddy.log.info(users);
             self.respond({users: users});
        });
  
       /* this.respond({
            users: geddy.model.adapter.User.all()
            });*/
    };
        

    this.add = function (req, resp, params) {
        this.respond({
            params: params
        });
    };

    this.create = function (req, resp, params) {
        var user = geddy.model.User.create({
                id: geddy.string.uuid(10),
                login: params.login, 
                name: params.name, 
                lastname: params.lastname
            });
        if (user.isValid()) {
            user.save();
            this.redirect({
                controller: this.name
                });
        } else {
            this.redirect({
                controller: this.name, 
                action: 'add?error=true'
            });
        }
    };

    this.show = function (req, resp, params) {
        
        var self = this;
        geddy.model.adapter.User.load(params.id, function(err, user){
             self.respond({user: user});
        });
       /* this.respond({
            params: params
        });*/
    };

    this.edit = function (req, resp, params) {
        this.respond({
            params: params
        });
    };

    this.update = function (req, resp, params) {
        // Save the resource, then display the item page
        this.redirect({
            controller: this.name, 
            id: params.id
            });
    };

    this.remove = function (req, resp, params) {
        this.respond({
            params: params
        });
    };

};

exports.Users = Users;

