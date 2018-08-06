
const request = require('request');
const Slack = require('node-slack');
const cheerio = require('cheerio');

const link = require('./config.json').APILink;

const slack = new Slack();

function getZeratorProgLink() {
  return new Promise((fullfil, reject) => {
    request(link, (err, resp, html) => {
      try {
        if (err) {
          return reject(err);
        }

        const data = JSON.parse(html);
        const $ = cheerio.load(data.content.rendered);
        const progSrc = $('img').attr('src');

        //Hard-coded URL for August 2018. 
        fullfil('https://image.ibb.co/duujTz/IMG_20180806_130232.jpg');
      }
      catch(error) {
        reject(error);
      }
    });
  });
}

function formatSlackReply(content, req) {
  const reply = slack.respond(req.body, (hook) => {
    const text = content;

    return {
      text
    };
  });

  return reply;
}

module.exports = (app) => {
  app.use('/progzera', (req, res) => {
    getZeratorProgLink().then(
      (progSrc) => {
        if (req.query.type) {
          if (req.query.type === 'redirect') {
            return res.redirect(progSrc);
          } else if (req.query.type === 'stream') {
            return request(progSrc).pipe(res);
          }
        }
        res.json(formatSlackReply('<' + progSrc + '| Zerator\'s stream schedule>', req));
      }
    ).catch(
      (error) => {
        res.json(formatSlackReply('Error occured : ' + error, req));
      }
    );
  });
}
