import { CustomContext, User } from "../types";

import createJobsCheckOrders from "./create-jobs-check-orders";

async function initJobCheckOrdersOnDeploy(
  context: Partial<CustomContext>,
  users: User[]
) {
  users
    .filter((user) => {
      return !!user.dateEndSubscription;
    })
    .map((user) => {
      return createJobsCheckOrders(context, user);
    });
}

export default initJobCheckOrdersOnDeploy;
