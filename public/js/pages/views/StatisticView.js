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
        helpdataset:{},
        //categories: {},
        ////el:$("#profile-container"),
        el:$("#main-container"),
        events:{
                "click #small-logout-btn" :"onLogoutClick",
                "click #all-link" : "allStat"
        },
        initialize:function(){
            this.setDataForChart();
        },
  
        render: function() {
            this.$el.empty();
            console.log(session.user.id);
            var temp = this.template();
            this.$el.html(temp);
            this.drawChartHelp(1,"#chart");
            this.drawChartHelp(2,"#chart2");
            return this;
        },
        allStat: function(){
            this.render();
        },

        setDataForChart: function(){
          var self = this;
          var dataset;
          $.get("/issues/statistic" , function(data){
          StatisticView.dataset=data;
          self.render();
          
          })},
        setDataForChartCustomStatus: function(label){
          var self = this;
          var dataset;
          $.get("/issues/statistic/"+label , function(data){
          StatisticView.helpdataset=data;
          self.drawChartHelp(3,"#chart3"); 
          })},
        setDataForChartCustomCategory: function(label){
          var self = this;
          var dataset;
          $.get("/issues/statistic/categories/"+label , function(data){
          StatisticView.helpdataset=data;
          self.drawChartHelp(4,"#chart3"); 
          })},

        drawChartHelp : function(choice, div){ 
          var self = this;
          var dataset = [];
          switch (choice)
          {
              case 1:
                  var characters = Object.keys(StatisticView.dataset.statuses);
                  var dataset = [];
                  for (var i = 0; i < characters.length; i++) 
                  {
                   var obj = { label: characters[i], count: StatisticView.dataset.statuses[characters[i]]};
                    dataset.push(obj);
                  };
              break;
              case 2:
                  var characters = Object.keys(StatisticView.dataset.categories);
                  var dataset = [];
                  for (var i = 0; i < characters.length; i++) 
                  {
                   var obj = { label: characters[i], count: StatisticView.dataset.categories[characters[i]]};
                    dataset.push(obj);
                  };
              break;
              case 3:
                  var characters = Object.keys(StatisticView.helpdataset.categories);
                  $( "#HelpTitle" ).empty();
                  $( "#HelpTitle" ).append("Categories with status  - "+StatisticView.helpdataset.statuses);
                   for (var i = 0; i < characters.length; i++) 
                   {
                        var obj = { label: characters[i], count: StatisticView.helpdataset.categories[characters[i]]};
                        dataset.push(obj);
                   };
              break;
              case 4:
                  var characters = Object.keys(StatisticView.helpdataset.statuses);
                  $( "#HelpTitle" ).empty();
                  $( "#HelpTitle" ).append("Statuses of category  - "+StatisticView.helpdataset.categories);
                  for (var i = 0; i < characters.length; i++) 
                  {
                      var obj = { label: characters[i], count: StatisticView.dataset.statuses[characters[i]]};
                      dataset.push(obj);
                  };   
              break;
          }
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75; 
        var legendRectSize = 18;
        var legendSpacing = 4;                           

        var color = d3.scale.category20b();

        var svg = d3.select(div)
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

         var tooltip = d3.select(div)                               
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
         path.on('mouseover', function(d) {                             // NEW
            var total = d3.sum(dataset.map(function(d) {                // NEW
            return d.count;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.data.count / total) / 10; // NEW
            tooltip.select('.labeldiagram').html(d.data.label);                // NEW
            tooltip.select('.count').html("amount:  "+d.data.count);                // NEW
            tooltip.select('.percent').html("percent:  "+percent + '%');
            console.log(tooltip);             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW
          
          path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          }); 
          switch (choice)
          {
            case 1:
                path.on ('click', function(d)
                {   $( "#chart3" ).empty();
                    self.setDataForChartCustomStatus(d.data.label);  
                });
            break;
            case 2:
                path.on ('click', function(d)
                {   $( "#chart3" ).empty();
                    self.setDataForChartCustomCategory(d.data.label);  
                });
            break;
          }                                                          
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

    });
        return StatisticView;
    }
);        