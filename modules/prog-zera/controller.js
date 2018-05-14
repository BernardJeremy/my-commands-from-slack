
const request = require('request');
const Slack = require('node-slack');
const cheerio = require('cheerio');

const link = require('./config.json').APILink;

const slack = new Slack();

module.exports = (app) => {
  app.use('/progzera', (req, res) => {
    request(link, (err, resp, html) => {
      if (err) return console.error(err);

      let data = JSON.parse(html);
      const $ = cheerio.load(data.content.rendered);
      const progSrc = $('img').attr('src');
      let reply = slack.respond(req.body, (hook) => {
        let text = '<' + progSrc + '| Zerator\'s stream schedule>';

        return {
          text
        };
      });

      res.json(reply);
    });
  });
}
