struct Bucket {
    1: optional set<i32> asArray
    2: optional set<i32> (js.type = 'object') numbersAsObject
    3: optional set<string> (js.type = 'object') stringsAsObject
}
