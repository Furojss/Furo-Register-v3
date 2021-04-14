const { MessageEmbed } = require("discord.js");
const ayar = require("../settings.json");
module.exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM");
    let olumlu = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("GREEN");
    let olumsuz = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RED");
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription('<a:gzg:829299711965003776> Bu komutu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 10000}));
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    message.react('EmojiİD')
    let aether = args[0];
    if (!aether || !member) return message.channel.send(olumsuz.setDescription(`<a:gzg:829299711965003776> Komutu doğru kullanmalısın. \`Örnek: ${ayar.prefix || ""}rol vip @üye\``).setFooter(`.rol bilgi | kullanarak bilgi alabilirsiniz.`)).then(x => x.delete({timeout: 12000}));

    if (aether === "bilgi" || aether === "info") {
        message.channel.send(embed.setDescription(`
        ${ayar.prefix || ""}rol vip @üye \`>\` Belirtilen üyeye **VIP** rolü verir/alır.
        ${ayar.prefix || ""}rol muzisyen @üye \`>\` Belirtilen üyeye **Müzisyen** rolü verir/alır.
        ${ayar.prefix || ""}rol lovers @üye \`>\` Belirtilen üyeye **Lovers** rolü verir/alır.
         `))
        return;
    }

    if (aether === "vip") {
        let vipRol = message.guild.roles.cache.get(ayar.vipRol);
        if (!member.manageable) return message.channel.send(olumsuz.setDescription(`Bu üye üzerinde işlem gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
         if (vipRol && !member.roles.cache.has(ayar.vipRol)) {
             member.roles.add(vipRol)
             message.channel.send(olumlu.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyeye başarılı bir şekilde ${vipRol} rolü verdim.`))
             message.react("✅");
         } 
         if (vipRol && member.roles.cache.has(ayar.vipRol)) {
            member.roles.remove(vipRol)
            message.channel.send(olumlu.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyeden başarılı bir şekilde ${vipRol} rolünü aldım.`))
            message.react("✅")
         } 
         if (!vipRol) {
             message.channel.send(olumsuz.setDescription(`VIP rolü bulunamadı.`))
             message.react("❎")
         }
    }

    if (aether === "muzisyen") {
        let muzisyenRol = message.guild.roles.cache.get(ayar.muzisyenRol);
        if (!member.manageable) return message.channel.send(olumsuz.setDescription(`<a:gzg:829299711965003776> Bu üye üzerinde işlem gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
         if (muzisyenRol && !member.roles.cache.has(ayar.muzisyenRol)) {
             member.roles.add(muzisyenRol)
             message.channel.send(olumlu.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyeye başarılı bir şekilde ${muzisyenRol} rolü verdim.`))
             message.react("✅");
         } 
        if (muzisyenRol && member.roles.cache.has(ayar.muzisyenRol)) {
            member.roles.remove(muzisyenRol)
            message.channel.send(olumlu.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyeden başarılı bir şekilde ${muzisyenRol} rolünü aldım.`))
            message.react("✅")
         } 
        if (!muzisyenRol) {
             message.channel.send(olumsuz.setDescription(`Müzisyen rolü bulunamadı.`))
             message.react("❎")
         }
    }


    if (aether === "lovers") {
        let loversRol = message.guild.roles.cache.get(ayar.loversRol);
        if (!member.manageable) return message.channel.send(olumsuz.setDescription(`<a:gzg:829299711965003776> Bu üye üzerinde işlem gerçekleştiremiyorum.`)).then(x => x.delete({timeout: 10000}));
         if (loversRol && !member.roles.cache.has(ayar.loversRol)) {
             member.roles.add(loversRol)
             message.channel.send(olumlu.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyeye başarılı bir şekilde ${loversRol} rolü verdim.`))
             message.react("✅");
         } 
        if (loversRol && member.roles.cache.has(ayar.loversRol)) {
            member.roles.remove(loversRol)
            message.channel.send(olumlu.setDescription(`<a:gzg:829299711965003776> ${member} adlı üyeden başarılı bir şekilde ${loversRol} rolünü aldım.`))
            message.react("✅")
         } 
         if (!loversRol) {
             message.channel.send(olumsuz.setDescription(`Lovers rolü bulunamadı.`))
             message.react("❎")
         }
    }

};

module.exports.configuration = {
    name: "rol",
    aliases: ["rol", "r"],
    usage: "r vip/muzisyen/lovers @üye",
    description: "Belirtilen üyeye belirttiğiniz rolleri verirsiniz."
};
