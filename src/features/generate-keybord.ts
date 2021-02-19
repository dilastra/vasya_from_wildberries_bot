import { Markup } from "telegraf";
import { KeyboardButton } from "telegraf/typings/telegram-types";

function generateKeybord(keybords: KeyboardButton[][]) {
  return Markup.keyboard(keybords).resize();
}

export default generateKeybord;
