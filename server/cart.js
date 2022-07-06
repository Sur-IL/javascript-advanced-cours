let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.product_id === +req.params.id);
    find.product_quantity += req.body.product_quantity;
    return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
    let find = cart.contents.find(el => +el.product_id === req.body.product_id);
    let cartContent = cart.contents;
    cartContent.splice(cartContent.indexOf(find), 1);
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove,
}