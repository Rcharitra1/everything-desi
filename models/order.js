class Order{
    constructor(id, storeId, datePlaced, items, total, subTotal, tax, totalDiscount, customerId)
    {
        this.id =id,
        this.storeId = storeId,
        this.datePlaced = datePlaced,
        this.items = items,
        this.total = total,
        this.subTotal = subTotal,
        this.tax =tax
        this.items = items || [] ,
        this.totalDiscount= totalDiscount,
        this.customerId = customerId
    }
}

export default Order;