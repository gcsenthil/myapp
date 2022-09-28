var expressHbs =  require('express-handlebars');
var hbs = expressHbs.create({});

// register new function
hbs.handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});

hbs.handlebars.registerHelper("latestnews", function(context, options) {
    var ret;  
    for (var i = 0; i <= 2; i++) {
        if(i==0){
            ret = "<div class='d-flex border-bottom-blue pb-4 align-items-center justify-content-between'>"+ options.fn(context[i])+"</div>" ;
        }
        else if(i==2){
      ret = ret +"<div class='d-flex  pt-4 align-items-center justify-content-between'>" + options.fn(context[i])+"</div>" ;
        }
        else{
            ret = ret +"<div class='d-flex border-bottom-blue pb-4 pt-4 align-items-center justify-content-between'>" + options.fn(context[i])+"</div>" ;
        }
    }
  
    return ret ;
  });

  hbs.handlebars.registerHelper("list", function(context, options) {
    var ret;  
    for (var i = 0; i < context.length; i++) {
        if(i==0){
            ret = options.fn(context[i]);
        }      
        else{
            ret = ret  + options.fn(context[i]);
        }
    }  
    return ret ;
  });