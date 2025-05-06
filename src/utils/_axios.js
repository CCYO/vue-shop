export default async function (data, key) {
  console.log(`axios request ${key}....`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`....axios response ${key} --- 1sec 過去了`);
  return data;
}
