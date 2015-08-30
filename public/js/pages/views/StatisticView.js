define([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    "User",
    "Issues",
    "Issue" ,
    

    "text!pages/templates/StatisticTemplate.html",
    "text!pages/templates/NotificationSuccess.html",
    "text!pages/templates/NotificationInfo.html",
    "text!pages/templates/NotificationWarning.html",
    "text!pages/templates/NotificationDanger.html",
  
    "text!pages/templates/ChangePasswordTemplate.html"
    ],
    function( $, _, Backbone, d3,   User, Issues, Issue,  StatisticTemplate,
            NotificationSuccess, NotificationInfo, 
            NotificationWarning, NotificationDanger, 
            ChangePassword){
        
    var StatisticView = Backbone.View.extend({
        template:_.template(StatisticTemplate),
        dataset:{},
        //categories: {},
        ////el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #about-link" : "aboutInfo",
                "click #all-link" : "allStat",
                "click #category-link" : "categoryStat",
                "click #status-link" : "statusStat",
                "click #time-link" : "timeStat",

        },
        initialize:function(){
        this.setDataForChart();
        
        },
  
        render: function() {
            this.$el.empty();
                console.log(session.user.id);
                
                var temp = this.template();
                this.$el.html(temp);
                this.drawChartStatus();
                this.drawChartCategories();
               

            return this;
        },
        allStat: function(){
          this.$('#statistic-panel').empty();
          var templatePass = _.template(ChangePassword);
          this.render();
          this.$('#statistic-panel').append(templatePass); 
        },

        setDataForChart: function(){
          var self = this;
          var dataset;
          $.get("/issues/statistic" , function(data){
          StatisticView.dataset=data;
          self.render();
          
          })},


        drawChartStatus : function(){ 
          var characters = Object.keys(StatisticView.dataset.statuses);
          console.log(characters);


           var dataset = [];
           for (var i = 0; i < characters.length; i++) 
           {
            var obj = { label: characters[i], count: StatisticView.dataset.statuses[characters[i]]};
             dataset.push(obj);
           };

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75; 
        var legendRectSize = 18;
        var legendSpacing = 4;                           

        var color = d3.scale.category20b();

        var svg = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)    
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

                var tooltip = d3.select('#chart')                               // NEW
          .append('div')                                                // NEW
          .attr('class', 'tooltipp');                                    // NEW
                      
        tooltip.append('div')                                           // NEW
          .attr('class', 'labeldiagram');                                      // NEW
             
        tooltip.append('div')                                           // NEW
          .attr('class', 'count');                                      // NEW

        tooltip.append('div')                                           // NEW
          .attr('class', 'percent');
                                          // NEW

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.label);
          });
         path.on('mouseover', function(d) {                             // NEW
            var total = d3.sum(dataset.map(function(d) {                // NEW
              return d.count;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.data.count / total) / 10; // NEW
            tooltip.select('.labeldiagram').html(d.data.label);                // NEW
            tooltip.select('.count').html(d.data.count);                // NEW
            tooltip.select('.percent').html(percent + '%');
            console.log(tooltip);             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW
          
          path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                                                           // NEW

        var legend = svg.selectAll('.legend')                    
          .data(color.domain()).enter()                                                    
          .append('g')                                                
          .attr('class', 'legend')                                    
          .attr('transform', function(d, i) {                         
            var height = legendRectSize + legendSpacing;              
            var offset =  height * color.domain().length / 2;         
            var horz = -2 * legendRectSize;                           
            var vert = i * height - offset;                           
            return 'translate(' + horz + ',' + vert + ')';            
          });                                                         

        legend.append('rect')                                     
          .attr('width', legendRectSize)                          
          .attr('height', legendRectSize)                         
          .style('fill', color)                                   
          .style('stroke', color);                                
          
        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d; });               
        },

         drawChartCategories : function(){ 
          var characters = Object.keys(StatisticView.dataset.categories);
          console.log(characters);


           var dataset = [];
           for (var i = 0; i < characters.length; i++) 
           {
            var obj = { label: characters[i], count: StatisticView.dataset.categories[characters[i]]};
             dataset.push(obj);
           };

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75; 
        var legendRectSize = 18;
        var legendSpacing = 4;                           

        var color = d3.scale.category20b();

        var svg = d3.select('#chart2')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)    
          .outerRadius(radius);

        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

         var tooltip = d3.select('#chart2')                              
          .append('div')                                                         
          .attr('class', 'tooltipp');                                    
                      
        tooltip.append('div')                                           
          .attr('class', 'labeldiagram');                                      
             
        tooltip.append('div')                                           
          .attr('class', 'count');                                      

        tooltip.append('div')                                           
          .attr('class', 'percent');
                                          

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color(d.data.label);
          });
         path.on('mouseover', function(d) {                             
            var total = d3.sum(dataset.map(function(d) {                
              return d.count;                                           
            }));                                                        
            var percent = Math.round(1000 * d.data.count / total) / 10; 
            tooltip.select('.labeldiagram').html(d.data.label);               
            tooltip.select('.count').html(d.data.count);               
            tooltip.select('.percent').html(percent + '%');
            console.log(tooltip);            
            tooltip.style('display', 'block');                                    

          
          path.on('mouseout', function() {                             
            tooltip.style('display', 'none');                          
          });                                                          

        var legend = svg.selectAll('.legend')                    
          .data(color.domain()).enter()                                                    
          .append('g')                                                
          .attr('class', 'legend')                                    
          .attr('transform', function(d, i) {                         
            var height = legendRectSize + legendSpacing;              
            var offset =  height * color.domain().length / 2;         
            var horz = -2 * legendRectSize;                           
            var vert = i * height - offset;                           
            return 'translate(' + horz + ',' + vert + ')';            
          });                                                         

        legend.append('rect')                                     
          .attr('width', legendRectSize)                          
          .attr('height', legendRectSize)                         
          .style('fill', color)                                   
          .style('stroke', color);                                
          
        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d; });                  
        }
        //,

  //      userIssue: function(){
  //        var self = this;
  //      $.get("/issues/user/" + session.user.id, function(data){
  //              self.$('#manager-panel').empty();
  //              var templ = _.template(TableIssueUserTemplate);
  //              var toTable = templ({
  //              issues: data,
  //              statuses: ProfileView.statuses,
  //              categories: ProfileView.categories
  //              });
  //              self.render();
  //              self.$('#manager-panel').append(toTable); 
  //                                      
  //      });
  //      },
  //      onLogoutClick:function(e){
  //            e.preventDefault(e);
  //            $.post("/auth/logout", {},function(data){
  //                if(data.status=="error"){
  //                    alert("Something wrong");
  //                }
  //                else{
  //                    window.location.href="/";
  //                };
  //            });
  //      },
  //      getStatusAndCategory: function (){
  //          var self=this;
  //          $.get("statusesandcategories",  function(data) {
  //                  ProfileView.statuses = data.statuses;
  //                  ProfileView.categories = data.categories;
  //                  console.log(ProfileView.statuses);
  //                  console.log(ProfileView.categories);
  //          });
  //      }
    });
        return StatisticView;
    }
);        