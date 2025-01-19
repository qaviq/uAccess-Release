import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://uaccessibilityv3bq2.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "W5b8FxGGoBM5",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "sBHnPmgzhQJ4",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "Jk5Vu8HhuZ89",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "p3j26maEYG-g",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "r6RdmvF4E_7B",
    },
    firstName: { type: "string", storageKey: "oLKSSIrcViEa" },
    googleImageUrl: { type: "url", storageKey: "_10WR1Wt5kWm" },
    googleProfileId: { type: "string", storageKey: "01wLrBRa8YTz" },
    lastName: { type: "string", storageKey: "NhnY5ZwxVvQd" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "x22ZbRT4N2Ws",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "e322C1GqN4QP",
    },
    profilePicture: {
      type: "file",
      allowPublicAccess: true,
      storageKey: "dgRwWIHTUvXE",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "htB1KfVX9M7l",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "ZRSoyEzpETBJ",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "80o1zKGHy1zj",
    },
  },
};
