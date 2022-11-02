var express = require('express');
const schedule = require('node-schedule')
const fetch = require('node-fetch');
let settings = { method: "Get" };
var base_path = __basedir


let url = "https://www.indiablooms.com/news/feeds.json";
function scheduler () {
  schedule.scheduleJob('*/1 * * * *', LoadNewsData)
}

function LoadNewsData () {
    var newsdata= require(base_path +'/data/news.json') 
    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      for(var i=0;i<json.news.news.length;i++)
      {
       
        var selected=newsdata.news.politics.filter(it => it.id === json.news.news[i].id);
        console.log(selected)
        if(selected != null && selected.length>0){

        }
        else{

            newsdata.news.politics.push(selected);
        }
        
      }
    });

}

module.exports = scheduler