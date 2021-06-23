class Store{
    constructor(id, title,  imageUrl, type, address, phone, email, isFeatured=false)
    {
        this.id = id,
        this.title = title,
        this.imageUrl = imageUrl
        this.type = type,
        this.address = address,
        this.phone = phone,
        this.email = email,
        this.isFeatured=isFeatured
    }
}

export default Store;