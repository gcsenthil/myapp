var express = require('express');
const schedule = require('node-schedule')
const fetch = require('node-fetch');
let settings = { method: "Get" };
var fs = require('fs');
var base_path = __basedir


let url = "https://www.indiablooms.com/news/feeds.json";
function scheduler () {
  schedule.scheduleJob('* */4 * * *', LoadNewsData)
}

function LoadNewsData () {
    var newsdata= require(base_path +'/data/news.json') 
    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
       var flag=false
    //politics
      for(var i=0;i<json.news.news.length;i++)
      {       
        var selected=newsdata.news.politics.filter(it => it.id === json.news.news[i].id);        
        if(selected != null && selected.length>0){
        }
        else{
            console.log(json.news.news[i])           
            newsdata.news.politics.splice(0, 0,(json.news.news[i]));   
            flag=true       
        }        
      }
      //Sports
      for(var i=0;i<json.news.sports.length;i++)
      {       
        var selected=newsdata.news.sports.filter(it => it.id === json.news.sports[i].id);        
        if(selected != null && selected.length>0){
        }
        else{                
            newsdata.news.sports.splice(0, 0,(json.news.sports[i]));          
            flag=true
        }        
      }
        //entertainment
        for(var i=0;i<json.news.showbiz.length;i++)
        {       
          var selected=newsdata.news.entertainment.filter(it => it.id === json.news.showbiz[i].id);        
          if(selected != null && selected.length>0){
          }
          else{                      
              newsdata.news.entertainment.splice(0, 0,(json.news.showbiz[i]));          
              flag=true
          }        
        }

         //international
         for(var i=0;i<json.news.world.length;i++)
         {       
           var selected=newsdata.news.international.filter(it => it.id === json.news.world[i].id);        
           if(selected != null && selected.length>0){
           }
           else{                      
               newsdata.news.international.splice(0, 0,(json.news.world[i]));          
               flag=true
           }        
         }

          //national
          for(var i=0;i<json.news.finance.length;i++)
          {       
            var selected=newsdata.news.national.filter(it => it.id === json.news.finance[i].id);        
            if(selected != null && selected.length>0){
            }
            else{                      
                newsdata.news.national.splice(0, 0,(json.news.finance[i]));          
                flag=true
            }        
          }

      if(flag){
        fs.writeFileSync(base_path +'/data/news.json', JSON.stringify( newsdata));
      }

    });

}

module.exports = scheduler