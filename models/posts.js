db = require('./base').db
//Add post
exports.add_post = async (ItemName, Quantity, Price) => {
    let stmnt = db.prepare('INSERT INTO GroceryList(Item_Name, Quantity, Price, Created_on) VALUES (?,?,?,?)')
    let msg
    try {
        msg = await stmnt.run(ItemName, Quantity, Price, Date().toLocaleString())
    } catch (e) {
        console.log(e.message)
        return null
    }
    return msg
}
//Delete Post By Id
exports.delete_post_by_id = async (Id) => {
    let stmnt = db.prepare('DELETE FROM GroceryList WHERE Id = ?')
    let result
    try {
        result = await stmnt.run(Id)
    } catch (e) {
        console.error(e.message)
        return null
    }
    return result
}


//Get Post By Id
exports.get_post_by_id = async (Id) => {
    let stmnt = db.prepare('SELECT * FROM GroceryList WHERE Id=?')
    let result
    try {
        result = await stmnt.get(Id)
    } catch (e) {
        console.error(e.message)
        return null
    }
    return result
}

//Get All Posts
exports.get_all_posts = async () => {
    let stmnt = db.prepare('SELECT* FROM GroceryList')
    let result
    try {
        result = await stmnt.all()
    } catch (e) {
        console.error(e.message)
        return null
    }
    return result
}
//Sum of Price
exports.total = async () => {
    let stmnt = db.prepare('SELECT SUM (Price) FROM GroceryList')
    let total
    try {
        total = await stmnt.get().toString()
    } catch (e) {
        console.error(e.message)
        return null
    }
    return total
}