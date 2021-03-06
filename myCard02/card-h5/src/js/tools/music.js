const utils = require('./utils');
class Music {
    constructor (url, autoPlay = true) {
        this.autoPlay = autoPlay;
        this.insertBody(url);
    }
    get isPaused () {
        return this.audio.paused;
    }
    // 生成html插入
    insertBody (url) {
        let audio = document.createElement('audio');
        audio.id = 'audio';
        audio.src = url;
        audio.loop = true;
        audio.autoplay = this.autoPlay; // 移动端不兼容
        this.audio = audio;
        $('body').append(audio);
        this.autoPlay && this.beginPlay();
    }
    play () {
        this.audio.play();
        this.musicListener && this.musicListener(this.isPaused);
    }
    pause () {
        this.audio.pause();
        this.musicListener && this.musicListener(this.isPaused);
    }
    beginPlay () {
        let _this = this;
        // 微信hack，自动播放音乐
        // alert(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger');
        // if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        //     _this.play();
        // } else{
        document.body.addEventListener('touchend', function t() {
            _this.play();
            document.body.removeEventListener('touchend', t);
        }, false);
        // }
    }
    onMusicState (callBackEvent) {
        this.musicListener = callBackEvent;
    }
}
module.exports = Music;
