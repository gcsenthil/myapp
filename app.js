var createError = require('http-errors');
var express = require('express');
var sassMiddleware = require('node-sass-middleware')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { Readable } = require('stream')
var Gallery = require('express-photo-gallery');
var robots =require('express-robots-txt')
global.__basedir = __dirname
var app = express();
var newsdata= require(__basedir +'/data/news.json') 
const scheduler = require('./routes/scheduler')

scheduler();


for(var i=0;i<newsdata.news.imagegallery.length;i++){
app.use(newsdata.news.imagegallery[i].url, Gallery('public/'+newsdata.news.imagegallery[i].path, {title:newsdata.news.imagegallery[i].caption}));
}


// Validate our settings schema
const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });



let sitemap


app.get('/sitemap.xml', function(req, res) {
   
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  
  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap)
    return
  }

  try {
    const smStream = new SitemapStream({ hostname: 'https://www.neherald.com/' })
    const pipeline = smStream.pipe(createGzip())

    // pipe your entries or directly write them.
    smStream.write({ url: 'https://www.neherald.com/',  changefreq: 'daily', priority: 1 })
    for(i=0;i<newsdata.news.tripura.length;i++){  
    smStream.write({ url: '/news/tripura/'+newsdata.news.tripura[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.sports.length;i++){  
      smStream.write({ url: '/news/sports/'+newsdata.news.sports[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.national.length;i++){  
      smStream.write({ url: '/news/national/'+newsdata.news.national[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.politics.length;i++){  
      smStream.write({ url: '/news/politics/'+newsdata.news.politics[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.entertainment.length;i++){  
      smStream.write({ url: '/news/entertainment/'+newsdata.news.entertainment[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.international.length;i++){  
      smStream.write({ url: '/news/international/'+newsdata.news.international[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.region.length;i++){  
      smStream.write({ url: '/news/region/'+newsdata.news.region[i].id,  changefreq: 'daily', priority: 0.3 })
    }
    for(i=0;i<newsdata.news.tourism.length;i++){  
      smStream.write({ url: '/news/tourism/'+newsdata.news.tourism[i].id,  changefreq: 'daily', priority: 0.3 })
    }



    smStream.write({ url: '/aboutus-tripur',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/photos',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/photos',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/contactus',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/governer',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/chiefminister',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/ministers',  changefreq: 'monthly',  priority: 0.7 })
    smStream.write({ url: '/dailynewsphoto/', changefreq: 'weekly',  priority: 0.5})
    smStream.write({ url: '/presidentphoto/', changefreq: 'weekly',  priority: 0.5})
   // smStream.write({ url: '/page-4/',   img: "http://www.neherald.com" })
    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then(sm => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e) => {throw e})
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

app.use(robots({
  UserAgent: '*', 
  CrawlDelay: '5',
  Sitemap: 'https://www.neherald.com/sitemap.xml',
}))

app.use(robots(__basedir + '/robots.txt'));

app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  helpers: require(__dirname +"/public/javascripts/helpers.js").helpers,
  extname: '.hbs'
}));

app.get('/google220272e67ddc9ed9.html',  (req, res) => {
  res.send(__basedir+"/google220272e67ddc9ed9.html");
});

app.get('/article/arindamnath', function(req, res) {
  console.log(__dirname + "/public/pdf/I_CAME_IN_DARKNESS.pdf");
  res.sendFile(__dirname + "/public/pdf/I_CAME_IN_DARKNESS.pdf");
})

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//console.log( __dirname + '/public/scss');
app.use(
  sassMiddleware ({
      src: __dirname + '/public/scss', 
      dest: __dirname + '/public',
      debug: true,       
  })
);   
app.use(express.static(path.join(__dirname, 'public')));


 
//routes
app.use('/', require('./routes/index'));
app.use('/magazine', require('./routes/magazine'));
app.use('/contactus', require('./routes/contactus'));
app.use('/users', require('./routes/users'));
app.use('/business', require('./routes/business'));
app.use('/art', require('./routes/art'));
app.use('/allnews', require('./routes/allnews'));
app.use('/sports', require('./routes/sports'));
app.use('/aboutus-tripura', require('./routes/aboutusTripura'));
app.use('/login', require('./routes/login')); 
app.use('/auth', require('./routes/auth'))
app.use('/news', require('./routes/news'))
app.use('/youtube', require('./routes/youtube'))
app.use('/governer', require('./routes/governer'))
app.use('/chiefminister', require('./routes/chiefminister'))
app.use('/ministers', require('./routes/ministers'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
