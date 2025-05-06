let list = [
  { id: 1, type: "hot", name: "熱門" },
  { id: 2, type: "beauty", name: "美妝" },
  { id: 3, type: "ccc", name: "3C" },
];

let data = {};

list.forEach((item) => {
  let { id, type, name } = item;
  data[type] = { type, id, name, goods: [] };
  let goods = data[type].goods;
  let m = (id - 1) * 100 + 1;
  for (let n = m; n <= 100 * id; n++) {
    goods.push({
      id: n,
      name: `${name}-${n}`,
      price: Math.floor(Math.random() * 100),
      // pic: "https://picsum.photos/200/300",
      // store: {
      //   id: n,
      //   name: `store-${n}`,
      //   city: "台北市",
      // },
    });
  }
});

export function add({ type, id, name, price }) {
  console.log("@", data[type].goods[0]);
  data[type].goods.unshift({ id, name, price });
  console.log("@#", data[type].goods[0]);
}
console.log("@Goods data", data);
export default data;
