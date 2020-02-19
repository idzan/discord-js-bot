const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
const client = new Discord.Client();
var GphApiClient = require('giphy-js-sdk-core')
giffy = GphApiClient(giphyToken)

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    if(message.member.hasPermission(["KICK_MEMBERS","BAN_MEMBERS"])) {
        if(message.content.startsWith(`${prefix}kick`)) {
            let member = message.mentions.members.first();
            member.kick().then((member) => {
                giffy.search('gifs', {"q": "fail"})
                    .then((response) => {
                        var totalReponses = response.data.length;
                        var responseIndex = Math.floor((Math.random() * 10) +1) % totalReponses;
                        var responseFinal = response.data[responseIndex];

                        message.channel.send(":wave: " + member.displayName + " You are kicked by my ass!", {
                            files: [responseFinal.images.fixed_height.url]
                        })
                    })
                }
            )
        }

    }

})

client.login(token);