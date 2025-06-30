const { formidable } = require("formidable");

const COMMON = require("../../common");
const { storage } = require("../../db/firebase");
const { FIREBASE } = require("../../config");
const { MyErr, ERR_RES } = require("../../utils");

async function userAvatar(ctx, next) {
  // 若沒有要改avatar，返回null
  if (!ctx._request_payload.avatar_hash) {
    await next();
    return;
  }
  const { avatar_hash, avatar_ext } = ctx._request_payload;
  //  指標物件，指向GFB的存放路徑
  let ref = storage
    .bucket()
    .file(`${FIREBASE.AVATAR}/${avatar_hash}.${avatar_ext}`);
  //  確認是否已存
  let [exist] = await ref.exists();
  if (!exist) {
    await _uploadFireBase(ctx, ref, {
      minFileSize: COMMON.config.AVATAR.MIN_SIZE,
      maxFileSize: COMMON.config.AVATAR.MAX_SIZE,
      mimetype: COMMON.config.AVATAR.MIME,
    });
  }
  delete ctx._request_payload.avatar_ext;
  ctx._request_payload.avatar = `https://firebasestorage.googleapis.com/v0/b/${ref.bucket.id}/o/${ref.id}?alt=media`;
  await next();
}

module.exports = {
  userAvatar,
};

async function _uploadFireBase(ctx, ref, { maxFileSize, mimetype }) {
  let promise;
  let _cancelUpload = false;
  //  創建 formidable Ins
  const form = formidable({
    maxFileSize,
    filter,
    fileWriteStreamHandler,
  });

  await form
    .parse(ctx.req)
    //  處理 formidable 解析錯誤
    .catch((error) => {
      throw new MyErr({ ...ERR_RES.SELLER.UPDATE.ERR_FORMIDABLE_PARSE, error });
    });

  try {
    //  判斷圖檔上傳GFB的狀況
    await promise;
    //  將圖檔在GFB的遠端路徑設為公開
    await ref.makePublic();
  } catch (error) {
    throw new MyErr({ ...ERR_RES.SELLER.UPDATE.ERR_GFB_UPLOAD, error });
  }

  function filter(item) {
    const valid = mimetype.some((type) => item.mimetype === type);
    if (!valid) {
      form.emit("error", new Error(ERR_RES.SELLER.UPDATE.ERR_AVATAR_MIMETYPE));
      _cancelUpload = true;
    }
    return valid;
  }
  function fileWriteStreamHandler() {
    if (_cancelUpload) {
      return null;
    }
    //  formidable Ins 調用 parse 時，fileWriteStreamHandler 作為 CB 調用
    let ws = ref.createWriteStream(/* wsOpts */);
    //  創建寫入流
    //  wsOpts 可作緩存設定（參考資料：https://cloud.google.com/storage/docs/metadata#caching_data）
    //  以「不緩存」為例↓
    // wsOpts.metadata: { contnetType: 'image/jpeg', cacheControl: 'no-cache' }
    promise = new Promise((resolve, reject) => {
      //  為 bar.promise 綁定 GCS 上傳的promise，以便捕撈錯誤
      ws.on("finish", resolve);
      ws.on("error", reject);
    });
    return ws;
  }
}
