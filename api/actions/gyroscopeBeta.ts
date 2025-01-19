import { ActionOptions } from "gadget-server";

export const params = {
  beta: { type: "number" }
};

export const run: ActionRun = async ({ params, logger }) => {  
  logger.info(`Received beta value: ${params.beta}`);

  // Check if beta is defined and in range
 
  const inRange = params.beta !== undefined && ((params.beta >= -5.7 && params.beta <= 5.7) || (params.beta <= -174.3 || params.beta >= 174.3));
 

  if (inRange) {
    logger.info("Beta value is within acceptable range");
    return {
      success: true,
      result: { isSupported: true }
    };
  }
  logger.info("Beta value is outside acceptable range");
  return {
    success: true,
    result: { isSupported: false }
  };
};

export const options: ActionOptions = {
  timeoutMS: 30000
};
