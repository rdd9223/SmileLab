export const convertInputArrToStr = (input) => {
  var result = ""
  if(input != null){
    input.map(item => {
      result += (item + "\n")
    })
  }
  return result;
}