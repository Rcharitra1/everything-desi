class Order{
    constructor(id, storeId, datePlaced, items, total)
    {
        this.id =id,
        this.storeId = storeId,
        this.datePlaced = datePlaced,
        this.items = items,
        this.total = total,
        this.items = items || [] 
    }
}

export default Order;