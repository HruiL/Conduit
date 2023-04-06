export function mapArrayToDictionary(array, identifie = "id") {
  // Object.assign(target, ...sources)
  // 目标对象，接收源对象属性的对象，也是修改后的返回值
  // 源对象，包含将被合并的属性。
  return Object.assign(
    {},
    ...array.map((item) => ({ [item[identifie]]: item }))
  );
}
