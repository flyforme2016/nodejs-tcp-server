function combineBuffer(header, body) {
  return Buffer.concat([header, body]);
}

module.exports = { combineBuffer };
