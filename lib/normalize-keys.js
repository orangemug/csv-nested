module.exports = function(k) {
  // Remove any strings in (brackets)
  k = k.replace(/\(.*\)/g, "");

  // Strip whitespace
  k = k.replace(/^[ \t]*|[ \t]*$/g, "");

  // Replace whitespace
  return k.toLowerCase().replace(/(-|\ )/g, "_");
};
