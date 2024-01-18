typedef list<i8> ListOfI8
typedef list<string> ListOfString
typedef list<list<Struct>> ListOfListOfStruct

service Service {
    ListOfListOfStruct function()
}

struct Struct {}
