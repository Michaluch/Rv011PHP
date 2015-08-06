define([
    
    "jquery",
    "underscore",
    "backbone",
    "text!pages/templates/TableIssueTemplate.html",
    "RowIssueView",
    "Issue"
    ],
    function( $, _, Backbone,TableIssueTemplate,RowIssueView,Issue ){
        var TableIssueView = Backbone.View.extend({
            template : _.template(TableIssueTemplate),
            tagName : "div",
            //el:$("#main-container"),
            events:{
                
            },

            initialize:function(){
                //_.bindAll(this, "render");
                //this.collection.bind("change reset add remove", this.render);
                //console.log(this.collection.at(0).toJSON());
                //this.render();
                //
                //_.bindAll(this, "render");

                //this.collection.bind("change reset add remove", this.render);
                //var self = this;
               // this.collection.fetch().then(function(){
               //         console.log("In tableIssue");
               //         console.log(this.collection);
               // //self.render();
               //     });
                 

                
            },

           // fetchIssue:function(){
           //     this.collection.fetch()
           // },

            render : function(){
                console.log("render")  
                console.log(this.collection.length);
                //this.collection.each(this.addOne,this);
                    
                //this.$el.empty();   
                //this.$el.html(this.template);
                  var templ = this.template({
                        issues: this.collection.models
                    });

                //var templ = this.template({issues: this.collection.models});
                this.$el.html(templ);
                return this;
            },
            addOne: function  (Issue) {
                //console.log(this.collection.at(0).toJSON());
                var singleRow = new RowIssueView({model:Issue});
                //console.log(singleRow.model.toJSON());
                this.$el.append(singleRow.render().el);
            }
          

            });
        return TableIssueView;
    }
);