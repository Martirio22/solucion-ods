function normalizeId(value) {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value._id) return value._id.toString();
  return value.toString();
}

function cleanDoc(doc) {
  if (!doc) return null;
  const obj = typeof doc.toObject === "function" ? doc.toObject() : doc;
  const id = obj._id ? obj._id.toString() : obj.id;
  delete obj._id;
  delete obj.__v;
  return { id, ...obj };
}

module.exports = { normalizeId, cleanDoc };
