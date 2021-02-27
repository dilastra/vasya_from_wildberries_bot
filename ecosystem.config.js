modile.exports = {
  apps: [
    {
      name: "bot_WB",
      script: "./bot_WB.bundle.js",
      watch: true,
      exec_mode: "cluster",
      env_test: {
        PAYMENT_TOKEN: "381764678:TEST:22914",
        NAME_DATABASE: "vasya_from_wildberries_dev",
        MONGO_DB_URI:
          "mongodb+srv://Ruslan:oFy89qpYhVYf2NCZ@cluster0.vjaba.mongodb.net",
        ACCESS_TOKEN_BOT: "1639706848:AAEk-L1EgY0DNoIaV_qHH5GvG5CYijXfD_0",
      },

      env_production: {
        PAYMENT_TOKEN: "381764678:TEST:22909",
        NAME_DATABASE: "vasya_from_wildberries_test",
        MONGO_DB_URI:
          "mongodb+srv://Ruslan:oFy89qpYhVYf2NCZ@cluster0.vjaba.mongodb.net",
        ACCESS_TOKEN_BOT: "1619086164:AAGGpNj43SV0c84HH3c9NhfBZO0S7rjmiOY",
      },
    },
  ],
};
