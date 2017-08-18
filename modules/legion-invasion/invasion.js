//
// Code from https://invasion.wisak.eu/
// Thanks to Isak !
//

const moment = require('moment');

module.exports = {
  textInvasionIsOn: 'Invasion is in progress for another %hours% hours %minutes% minutes and %seconds% seconds',
  textNextInvasion: 'Next invasion in %hours% hours %minutes% minutes and %seconds% seconds',
  timestampDefault: 1491775200,
  timeInterval: 66600,
  durationInvasion: 21600,

  getText: function () {
    const currentTime = parseInt((new Date()).getTime() / 1000);
    const progress = ((currentTime - this.timestampDefault) % this.timeInterval);
    let textToUse = '';
    let duration;
    if (progress < this.durationInvasion) {
      duration = moment.duration(this.durationInvasion - progress, 'seconds');
      textToUse = this.textInvasionIsOn;
    } else {
      duration = moment.duration(this.timeInterval - progress, 'seconds');
      textToUse = this.textNextInvasion;
    }
    textToUse = textToUse.replace('%hours%', duration.hours()).replace('%minutes%', duration.minutes()).replace('%seconds%', duration.seconds());
    return textToUse;
  }
};
