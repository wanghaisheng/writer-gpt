import { Bard } from "googlebard";

(async () => {
  // for (const title of config.titles) {
  //   await write(title);
  // }

  let bot = new Bard(
    `__Secure-1PSID=WgibwJji-7maU4MBOXDBH3uT3rzg86tz06GPIOeQKu-dRZ9jQfg6iJP8c045X3Uf90mDCQ.`
  );

  let response = await bot.ask("Hello?");
  console.log(response);
})();
