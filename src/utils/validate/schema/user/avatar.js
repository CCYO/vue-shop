import { HOST, BASE_REF, SCHEMA_NAME } from "../../constant";
import COMMON from "@/common";

const json = {
  type: "object",
  properties: {
    _old: {
      type: "object",
    },
    ext: {
      $ref: `${BASE_REF}/img_ext`,
    },
    type: {
      enum: COMMON.config.AVATAR.MIME,
    },
    size: {
      type: "number",
      minimum: COMMON.config.AVATAR.MIN_SIZE,
      maximum: COMMON.config.AVATAR.MAX_SIZE,
    },
    hash: {
      $ref: `${BASE_REF}/hash`,
    },
  },
  required: ["ext", "type", "size", "hash", "_old"],
  additionalProperties: false,
  _notRepeat: [["hash", "avatar_hash"]],
};

export default { host: HOST, name: SCHEMA_NAME.user.avatar, json };
