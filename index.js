const {Telegraf} = require('telegraf')
const { Markup } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')

const textCourse = "Курс по выпиванию пива будет интересен всем, кто хочет научится правильно пить пиво. \n" +
    " В основе курса лежит факт: пиво — это основной напиток, употребляемый людьми. В ходе курса слушатели смогут не только научиться правильно пить пивной напиток, но и получат базовые знания о его правильном хранении и даже процедуре проведения дегустации. Важно помнить, что пиво не рекомендуется пить в один заход, как водку, и, тем более, в один присест.  Курс будет интересен, как, например, начинающим любителям пива, так и тем, кто регулярно употребляет пиво, но хотел бы знать больше о том, как это делать правильно. \n" +
    " Курс будет полезен для всех, кто уже имеет за плечами 10-12-летний опыт выпивания пива. Неважно, сколько вам уже лет, какой у вас уровень подготовки: в ходе курса вы приобретете новые знания о правильной практике употребления пива. \n\n Курс является авторским, и его составной частью является практическое занятие. \n"







const bot = new Telegraf('5815399978:AAHRfrwx7Wv62Al6FKlyrz0GNsbhLE978eI');

const defaultButtonToMainMenu = Keyboard.make([
    Key.callback('Назад в меню', 'mainMenu')
])
async function smallbrain(ctx){
    ctx.reply("Я тут самый умный ".repeat(10))
    ctx.replyWithPhoto({
        source: './images/smallbrain.jpg'
    }, defaultButtonToMainMenu.inline())
}
async function aboutMe(ctx){
    ctx.reply("Я пью пиво каждый день! ".repeat(24), defaultButtonToMainMenu.inline())
}
async function portfolio(ctx){
    const keyboard = Keyboard.make([
            [Key.callback("Ничего не делать", 'wdf')],
            [Key.callback("Тоже ничего не делать", 'sdf')],
            [Key.callback("Пук-пук", 'sdf')],
            [Key.callback("Назад в меню", 'mainMenu')],
        ]
    )
    ctx.replyWithDice(keyboard.inline())
}
async function rig(ctx){
    ctx.reply("Ты просто грязное животное", defaultButtonToMainMenu.inline())
}
async function replyCourse(ctx){
    ctx.reply(textCourse, defaultButtonToMainMenu.inline())
    ctx.replyWithDocument({
        source: "./PDF/UsefullPDF.pdf"
    })
}
async function mainMenu(ctx){
    const keyboard = Keyboard.make([
        [Key.callback('Курс по выпиванию пива', 'course')],
        [Key.callback('Порыгать за столом', 'rig')],
        [Key.callback('Кто тут самый умный?', 'whois')],
        [Key.callback('Кто пьет пиво каждый день?', 'aboutMe')],
        [Key.callback('Много кнопок', 'portfolio')],
    ])
    ctx.replyWithPhoto({
        source: './images/MainPhoto.png'
    }, keyboard.inline())
}
bot.start((ctx) => mainMenu(ctx));

bot.on("callback_query",(ctx)=>{
    switch (ctx.callbackQuery.data){
        case "mainMenu":
            mainMenu(ctx);
            break;
        case "course":
            replyCourse(ctx);
            break;
        case "aboutMe":
            aboutMe(ctx);
            break;
        case "whois":
            smallbrain(ctx);
            break;
        case "rig":
            rig(ctx);
            break;
        case "portfolio":
            portfolio(ctx);
            break;
    }
})
bot.launch()