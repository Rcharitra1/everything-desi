class Product {
    constructor(id, title,category, imageUrl, description, quantity=0, price, storeId, discount=0)
    {
        this.id = id,
        this.title = title,
        this.category = category,
        this.imageUrl = imageUrl,
        this.quantity = quantity,
        this.price = price,
        this.storeId = storeId,
        this.discount = discount
    }
}

export default Product;