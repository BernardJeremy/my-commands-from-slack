
const request = require('request');
const Slack = require('node-slack');
const cheerio = require('cheerio');

const link = require('./config.json').APILink;

const slack = new Slack();

module.exports = (app) => {
  app.use('/progarmatvhs', (req, res) => {
    request(link, (err, resp, html) => {
      if (err) return console.error(err);

      const $ = cheerio.load(html);
      const elem = $('div > div.et_pb_section.et_pb_inner_shadow.et_pb_section_3.et_pb_with_background.et_section_regular > div.et_pb_row.et_pb_row_3 > div.et_pb_column.et_pb_column_1_2.et_pb_column_9 > div > a')

      let reply = slack.respond(req.body, (hook) => {
        let text = '<' + elem.attr('href') + '| ArmaTV-HS\'s stream programmation>';

        return {
          text
        };
      });

      res.json(reply);
    });
  });
}
