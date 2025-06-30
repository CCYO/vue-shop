/* CONFIG     ----------------------------------------------------------------------------- */

/* UTILS      ----------------------------------------------------------------------------- */
const { MyErr } = require("./model");

async function middleware(ctx, next) {
  try {
    await next();
    console.log("@ctx.status", ctx.status);
  } catch (error) {
    ctx.status = 500;
    if (!(error instanceof MyErr)) {
      // error = new MyErr({ ...ERR_RES.SERVER.RESPONSE.ERR_50x, error });
    }
    ctx.app.emit("error", error, ctx);
    let accept = ctx.header.accept;
    if (accept && ~ctx.header.accept.indexOf("html")) {
      // ctx.redirect(`/permission/${ERR_RES.SERVER.RESPONSE.ERR_50x.errno}`);
    } else {
      // ctx.body = new ErrModel(ERR_RES.SERVER.RESPONSE.ERR_50x);
    }
  }
}

//  error log
function log(error, ctx) {
  const newLine = "\n ";
  if (!ctx) {
    console.error(
      "----- -----\n",
      `${newLine}+++++ 【系統錯誤】 +++++${newLine}`,
      error,
      `${newLine}----- -----`
    );
    return;
  }

  let msg = [`----- -----\nMETHOD:${ctx.method}\nPATH:${ctx.path}`];
  if (error instanceof MyErr) {
    msg = msg.concat([`${newLine}+++++ +++++${newLine}【MyErr】`, error.model]);
    if (error.serverError) {
      msg = msg.concat(`${newLine}+++++ +++++${newLine}origin error:\n`);
      // 創建MyErr時，傳入的error參數是Error
      if (error.serverError instanceof Error) {
        let obj;
        try {
          obj = JSON.parse(error.serverError.message);
        } catch (e) {
          obj = error.serverError.message;
        }

        if (error.serverError.message === "Validation error") {
          let sequelizeValidateErr = error.serverError.errors.reduce(
            (acc, { message, path, value }) => {
              acc.push({
                field_name: path,
                value,
                message,
              });
              return acc;
            },
            []
          );
          msg = msg.concat([
            obj,
            "\n",
            ...sequelizeValidateErr,
            ...error.serverError.stack.match(/\n\s+at.*/g),
          ]);
        } else {
          msg = msg.concat([
            obj,
            ...error.serverError.stack.match(/\n\s+at.*/g),
          ]);
        }
      }
      // 創建MyErr時，傳入的error參數不是Error
      else {
        msg = msg.concat([
          JSON.parse(error.serverError),
          ...error.stack.match(/\n\s+at.*/g),
        ]);
      }
    }
  } else {
    msg = msg.concat([`${newLine}【SEVER ERROR】`, error]);
  }
  msg = msg.concat(`${newLine}----- -----`);
  console.error(...msg);
}

module.exports = {
  middleware,
  log,
};
