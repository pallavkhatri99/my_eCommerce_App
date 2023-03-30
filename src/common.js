function calFinPrice(orignal,discount) {
    let discountPrice = orignal * (discount/100)
    let finalprice = orignal - discountPrice
    return finalprice;
}
function calRating(params) {
    let ratingStr = ["Bad","Poor","Good","Average","Excellent"];
    return ratingStr.indexOf(params) + 1
}
export  {
    calFinPrice,calRating,
}