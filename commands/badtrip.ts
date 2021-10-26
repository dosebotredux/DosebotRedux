import Discord from "discord.js";
import Helpers from '../helpers.js';

//Badtrip command
export function run(client: Discord.Client, message: Discord.Message, args: string[]) {
  const embed = Helpers.TemplatedMessageEmbed()
    .setImage(
      "https://psychonautwiki.org/w/thumb.php,qf=You_do_not_need_to_understand.gif,awidth=419.pagespeed.ce._yCpj9CanE.gif"
    )
    .addField(
      "Assistance",
      "Taken drugs or have questions about taking drugs? Concerned or have any questions? Visit the TripSit Chat: <https://chat.tripsit.me/>\n\nNeed a healthy dose of **good vibes**? Check out the PsychonautWiki Good Vibes page: <https://psychonautwiki.org/wiki/Good_vibes>\n\nThis Youtube channel is dedicated to sending positive vibes: <https://www.youtube.com/user/TheMeditativeMind>\n\n**Everything is going to be okay!** You are awesome, everyone here loves, cares, and supports you! **Take long, slow, deep breaths** and focus on each breath in and out!"
    );

  message.channel.send({ embed }).catch(console.error);
};
