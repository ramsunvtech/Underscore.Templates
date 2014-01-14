/**
 ** View Code Starts Here.
 */

var PageView = Backbone.View.extend({

  el: $('#page'),

  initialize: function () {
    this.render();
  },

  render: function () {
    var pageEl = this.$el;

    // `menu` variable is used as a Main Object inside Template.
    var tplData = '<ul class="nav navbar-nav"> <% _.each(menu.items, function(item) { %> <li> <a href="#<%= item.href %>"> <%= item.title %> </a> </li> <% }); %> </ul>';

    // JSON Object of Template Data.
    var tplVars = {
        "items": [{
            "href": "#education",
            "title": "Education"
        },{
            "href": "#photos",
            "title": "My Photos"
        }]
    };

    // This will compile the Template and Store in to Template Buffer, which can be used while merge Templates.
    _.subTpl('menu', tplData, tplVars);

    // `header` variable is used as a Main Object inside Template.
    // `header.menu` will be retrieved from Template Buffer and Added to Template JSON Data.
    var headerTplData = '<header class="main-header"> <nav id="menu" class="navbar navbar-default" role="navigation"> <div class="navbar-header"> <a class="navbar-brand active" href="#"><%= header.siteName %> </a> </div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"><%= header.menu %></div></nav></header>';

    // JSON Object of Template Data.
    // `header.menu` will be retrieved from Template Buffer and Added to Template JSON Data.
    var headerTplVars = {
        "siteName": "Your Site Name"
    };

    // This will compile the Template and Merge dependent Templates from Buffer
    var compiledHeaderTpl = _.dependentTpls('header', headerTplData, headerTplVars);

    pageEl.html(compiledHeaderTpl);
  }
});

/**
  Router Code Starts Here
 */

new PageView();