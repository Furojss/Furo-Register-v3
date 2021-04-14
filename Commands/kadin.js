const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setTitle("Kayıt Sistemi", message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(`Vain 🖤`);
    if (!message.member.roles.cache.has(ayar.kayitSorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`<a:gzg:829299711965003776> Bu komutu kullanmak için yeterli yetkiye sahip değilsin`)).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    message.react('emojiİD')
    let isim = args[1];
    let yaş = Number (args[2]);

    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`<a:gzg:829299711965003776> Komutu doğru kullanmalısın. \`Örnek: ${ayar.prefix || '.'}k @üye isim yaş\``)).then(x => x.delete({timeout: 10000}));

            member.setNickname(`${ayar.tag || ""} ${isim} | ${yaş}`).catch();
            let kadinRol = message.guild.roles.cache.get(ayar.kadinRol1);
            if (kadinRol) {
                member.roles.cache.has(ayar.boosterRol) ? member.roles.set([ayar.boosterRol, ayar.kadinRol1]) : member.roles.set([ayar.kadinRol1]);
            }

            

            rdb.add(`reg.${message.author.id}.kadin`, +1);
            kdb.push(`isimler.${member.id}`, {
                guildName: `${ayar.tag || ""} ${isim} | ${yaş}`,
                Name: isim,
                Age: yaş,
                Zaman: Date.now(),
                Yetkili: message.author.id,
                Komut: "Kadın"
            });
        message.channel.send(embed.setDescription(`<a:gzg:829299711965003776> ${member} adlı üye sunucumuza **kadın** olarak kaydedilmiştir.`))
}

module.exports.configuration = {
    name: "kadin",
    aliases: ["k"],
    usage: "kadin @üye [isim] [yaş]",
    description: "Belirtilen üyeyi sunucuya kadin olarak kaydını gerçekleştirmiş olursunuz."
};
