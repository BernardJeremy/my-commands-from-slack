
const request = require('request');
const Slack = require('node-slack');

const link = require('./config.json').APILink;

const slack = new Slack();

module.exports = (app) => {
  app.use('/progzera', (req, res) => {
    request(link, (err, resp, html) => {
      if (err) return console.error(err);

      let data = JSON.parse(html);
      let reply = slack.respond(req.body, (hook) => {
        let text = '<' + data.acf.thumbnail + '| Zerator\'s stream programmation>';

        return {
          text
        };
      });

      res.json(reply);
    });
  });
}
