CREATE TABLE GroceryList (
    Id INTEGER PRIMARY KEY,
    Item_Name MESSAGE_TEXT NOT NULL,
    Quantity INTEGER NOT NULL,
    Price INTEGER NOT NULL,
    Created_on DATE NOT NULL
);