import { Composer } from "telegraf";
import { CustomContext } from "../../types";
import userInformation from "./user-information";

const userInforamtionComposer = new Composer<CustomContext>();

userInforamtionComposer.hears("Мои данные", userInformation);
userInforamtionComposer.hears("Редактировать данные", (ctx) => {
  ctx.scene.enter("editScene");
});

export default userInforamtionComposer;
