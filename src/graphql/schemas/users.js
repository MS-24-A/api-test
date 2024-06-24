module.exports = `
input Login{
    username:   String
    password:   String
}

input UserInput {
    username:   String
    password:   String
    type:       String
}

type User {
    username:	String
    token:		String
    type:		String
}
`