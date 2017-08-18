const Slack = require('node-slack');

const Invasion = require('./invasion');

const slack = new Slack();

module.exports = (app) => {
  app.use('/invasion', (req, res) => {
    let reply = slack.respond(req.body, (hook) => {
      return {
        text: Invasion.getText(),
      };
    });

    res.json(reply);
  });
}
