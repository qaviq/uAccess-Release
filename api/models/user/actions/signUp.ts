import { applyParams, ActionOptions, save } from "gadget-server";
 

export const run: ActionRun = async ({ params, record, logger, api, session }) => {
 
  applyParams(params, record);

 
  record.lastSignedIn = new Date();
 
 
  (record as any).roles = ["signed-in"];

  await save(record);

 
 
 
  session?.set("user", { _link: record.id });

 
 
  return {
    result: "ok",
  };
};

 
export const options: ActionOptions = {
  actionType: "create",
  returnType: true,
  triggers: {
    googleOAuthSignUp: true,
    emailSignUp: true,
  },
};
