import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";

const json = {
  type: "object",
  properties: {
    password: {
      $ref: `${BASE_REF}/password`,
    },
  },
  required: ["password"],
};

export default { host: HOST, name: SCHEMA_NAME.user.password, json };
