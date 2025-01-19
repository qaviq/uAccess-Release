import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "review" model, go to https://uaccessibilityv3bq2.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "ZW-hdu-pNnCB",
  comment:
    "A model representing user reviews with a rating, optional comment, and timestamp, associated with a user.",
  fields: {
    comment: { type: "string", storageKey: "ZW-hdu-pNnCB-comment" },
    date: {
      type: "dateTime",
      includeTime: true,
      validations: { required: true },
      storageKey: "ZW-hdu-pNnCB-date",
    },
    location: {
      type: "string",
      validations: { required: true },
      storageKey: "ZW-hdu-pNnCB-location",
    },
    rating: {
      type: "number",
      decimals: 0,
      validations: {
        required: true,
        numberRange: { min: 1, max: 5 },
      },
      storageKey: "ZW-hdu-pNnCB-rating",
    },
    user: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "user" },
      storageKey: "ZW-hdu-pNnCB-user",
    },
  },
};
