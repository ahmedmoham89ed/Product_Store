/** Slices a string to a specified maximum length and adds an ellipsis if the string exceeds that length.
* @param {string} txt - The input string to be sliced. 
* @param {number} [maxtxt=100] - The maximum length of the string before it is sliced. Default is 100. 
* @returns {string} - The sliced string with an ellipsis if it exceeds the maximum length. */
export function txtSlicer(txt: string, maxtxt: number = 100) {
  if (txt.length >= maxtxt) return `${txt.slice(0, maxtxt)}....`;
  return txt;
}
