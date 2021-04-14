const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setTitle("İsim Bildiri", message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter(`Vain 🖤`);
    if (!message.member.roles.cache.has(ayar.kayitSorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setTitle('Kayıt Sistemi').setDescription(`<a:gzg:829299711965003776> Bu komutu kullanmak için gerekli izinlere sahip değilsin.`)).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    message.react('emojiİD')
    let isim = args[1];
    let yaş = Number (args[2]);
    let yaziIsım = `${ayar.tag || ""} ${isim} | ${yaş}`

    
    if (!member || !isim || !yaş) return message.channel.send(new Discord.MessageEmbed().setTitle('Kayıt Sistemi').setDescription(`<a:gzg:829299711965003776> Komutu doğru kullanmalısın. \`Örnek: ${ayar.prefix || '.'}e @üye isim yaş\``)).then(x => x.delete({timeout: 10000}));
    if (message.member.roles.highest.position <= member.roles.highest.position) {
        message.channel.send(embed.setDescription(`<a:gzg:829299711965003776> Bu komutu kullanmak için gerekli izinlere sahip değilsin.`))
        return;
        }
    member.setNickname(`${ayar.tag || ""} ${isim} | ${yaş}`).catch();
    message.channel.send(embed.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyenin ismi ${yaziIsım} olarak değiştirildi.`));
    
let komut;
 if (member.roles.cache.has(ayar.erkekRol1) && !member.roles.cache.has(ayar.kadinRol1)) komut = "Erkek"
 if (member.roles.cache.has(ayar.kadinRol1) && !member.roles.cache.has(ayar.erkekRol1)) komut = "Kadın"
 if (!member.roles.cache.has(ayar.erkekRol1) && !member.roles.cache.has(ayar.kadinRol1)) komut = "Bulunamadı"  

    kdb.push(`isimler.${member.id}`, {
        guildName: `${ayar.tag || ""} ${isim} | ${yaş}`,
        Name: isim,
        Age: yaş,
        Zaman: Date.now(),
        Yetkili: message.author.id,
        Komut: komut
    });
};

module.exports.configuration = {
    name: "isim",
    aliases: ["nick", "i"],
    usage: "isim @üye [isim] [yaş]",
    description: "Belirtilen üyenin sunucudaki ismini değiştirir."
};
