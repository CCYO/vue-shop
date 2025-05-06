function toQuery(payload) {
  const entries = Object.entries(payload).filter(([k, v]) => {
    if (v === undefined) {
      return false;
    } else if (typeof v === "string" && v.length === 0) {
      return false;
    }
    return true;
  });

  return entries.reduce((acc, pairs, index) => {
    const [k, v] = pairs;
    acc += `${k}=${v}`;
    if (entries.length - 1 !== index) {
      acc += "&";
    }
    return acc;
  }, "");
}

export { toQuery };
