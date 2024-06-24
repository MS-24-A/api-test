module.exports = `
input ProductInput{
    id:     String
    name:   String
    price:  Float
}

type Product{
    id:     ID
    name:   String
    price:  Float
    status: Int
}

type ProductResponse{
    error:      Boolean
    message:    String
    product:    Product
}

`