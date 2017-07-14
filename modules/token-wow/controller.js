
const request = require('request');
const Slack = require('node-slack');

const link = require('./config.json').APILink;

const slack = new Slack();

module.exports = (app) => {
  app.use('/tokenwow', (req, res) => {
    request(link, (err, resp, html) => {
      if (err) return console.error(err);

      const data = JSON.parse(html);
      const formattedData = data['EU'].formatted;

      let reply = slack.respond(req.body, (hook) => {
        let text = 'WoW Token Price [EU] : ';
        text += '*' + formattedData.buy + '* (' + formattedData.updated + ') ';
        text += '<https://wowtoken.info>';

        return {
          text
        };
      });

      res.json(reply);
    });
  });
}
