import { Bot, Context, InlineKeyboard, session, SessionFlavor } from "grammy";
import dotenv from "dotenv";
import { Colors, EMOJIS, MAX_STEPS } from "./const";
import { Tree } from "./logic";

dotenv.config();

interface SessionData {
  tree: Tree;
}

type MyContext = Context & SessionFlavor<SessionData>;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN as string);

function initial(): SessionData {
  return { tree: new Tree({useEmoji: true}) };
}
bot.use(session({ initial }));

const inlineKeyboard = (tree: Tree) => {
  const keyboard = new InlineKeyboard();

    EMOJIS.forEach((item) => {
      keyboard.add({
        text: item,
        callback_data: item
      });
    })

  const text = tree.getField().map((row) => row.map((item) => item.color)).map((row) => row.join('')).join('\n'); 
  
  return {keyboard, text};
}

bot.hears("/start", async (ctx) => {
  ctx.session.tree = new Tree({useEmoji: true});
  const {text, keyboard} = inlineKeyboard(ctx.session.tree);
  
  await ctx.reply(`${ctx.session.tree.getScore()} / ${MAX_STEPS} \n${text}`, {
    reply_markup: keyboard,
  });
});

bot.callbackQuery(/.*/, async (ctx) => {
  const {tree} = ctx.session;
  tree.paintActive(ctx.callbackQuery.data as Colors);
  const {text, keyboard} = inlineKeyboard(ctx.session.tree);
  
  await ctx.editMessageText(`${ctx.session.tree.getScore()} / ${MAX_STEPS} \n${text}`, {
    reply_markup: keyboard,
  });
});

bot.start();
