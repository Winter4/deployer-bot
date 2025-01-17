import 'dotenv/config';
import { Bot, InlineKeyboard } from "grammy";
import {exec} from 'child_process';

if(!process.env.BOT_TOKEN) throw new Error('Empty .env bot_token');

const keys = {
    main: 'main',
    v1: 'v1',
    v2: 'v2',
    v3: 'v3',
    v4: 'v4',
    v5: 'v5'
} as const;

const keyboard = new InlineKeyboard()
    .text(keys.main, keys.main).text(keys.v1, keys.v1).text(keys.v2, keys.v2).row()
    .text(keys.v3, keys.v3).text(keys.v4, keys.v4).text(keys.v5, keys.v5).row();

const bot = new Bot(process.env.BOT_TOKEN);

/* - - - - - - - - - - - - - - - - - - */

let isLocked = false;
let lockedState = '';

/* - - - - - - - - - - - - - - - - - - */

bot.command("start", (ctx) => ctx.reply("🤡 Опять деплоить?", {reply_markup: keyboard}));

bot.on("callback_query:data", async (ctx, next) => {
    if(isLocked) return ctx.reply(`Куда ты ${ctx.callbackQuery.data} тыкаешь, занято нахуй! Я сейчас деплою ${lockedState}`).then(() => ctx.answerCallbackQuery());
    return next();
});

bot.callbackQuery('main', async ctx => {
    isLocked = true;
    lockedState = 'main';
    await ctx.reply('Деплою main');

    exec('./deploy.sh main', (error, stdout, stderr) => {
        if (error) {
            isLocked = false;
            return ctx.reply(`Ошибка: ${error.message}`);
        }

        isLocked = false;
        return ctx.reply(`Успешно выполнено: ${stdout}`);
    });

    return ctx.answerCallbackQuery('Делаю...')
});

bot.callbackQuery('v1', async ctx => {
    isLocked = true;
    lockedState = 'v1';
    await ctx.reply('Деплою v1');

    exec('./deploy.sh v1', (error, stdout, stderr) => {
        if (error) {
            isLocked = false;
            return ctx.reply(`Ошибка: ${error.message}`);
        }

        isLocked = false;
        return ctx.reply(`Успешно выполнено: ${stdout}`);
    });

    return ctx.answerCallbackQuery('Делаю...')
});

bot.callbackQuery('v2', async ctx => {
    isLocked = true;
    lockedState = 'v2';
    await ctx.reply('Деплою v2');

    exec('./deploy.sh v2', (error, stdout, stderr) => {
        if (error) {
            isLocked = false;
            return ctx.reply(`Ошибка: ${error.message}`);
        }

        isLocked = false;
        return ctx.reply(`Успешно выполнено: ${stdout}`);
    });

    return ctx.answerCallbackQuery('Делаю...')
});

bot.callbackQuery('v3', async ctx => {
    isLocked = true;
    lockedState = 'v3';
    await ctx.reply('Деплою v3');

    exec('./deploy.sh v3', (error, stdout, stderr) => {
        if (error) {
            isLocked = false;
            return ctx.reply(`Ошибка: ${error.message}`);
        }

        isLocked = false;
        return ctx.reply(`Успешно выполнено: ${stdout}`);
    });

    return ctx.answerCallbackQuery('Делаю...')
});

bot.callbackQuery('v4', async ctx => {
    isLocked = true;
    lockedState = 'v4';
    await ctx.reply('Деплою v4');

    exec('./deploy.sh v4', (error, stdout, stderr) => {
        if (error) {
            isLocked = false;
            return ctx.reply(`Ошибка: ${error.message}`);
        }

        isLocked = false;
        return ctx.reply(`Успешно выполнено: ${stdout}`);
    });

    return ctx.answerCallbackQuery('Делаю...')
});

bot.callbackQuery('v5', async ctx => {
    isLocked = true;
    lockedState = 'v5';
    await ctx.reply('Деплою v5');

    exec('./deploy.sh v5', (error, stdout, stderr) => {
        if (error) {
            isLocked = false;
            return ctx.reply(`Ошибка: ${error.message}`);
        }

        isLocked = false;
        return ctx.reply(`Успешно выполнено: ${stdout}`);
    });

    return ctx.answerCallbackQuery('Делаю...')
});

bot.start();
console.log('Bot\'s listening...');