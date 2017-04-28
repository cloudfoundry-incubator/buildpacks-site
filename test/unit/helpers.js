// Helper functions
export const nodeListMap = (nodeList, callback) => {
  var out = []
  for (var i = 0; i < nodeList.length; i++) {
    const val = callback(nodeList[i])
    out.push(val)
  }
  return out
}

