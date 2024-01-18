struct Struct {
    1: required i32 number
}

service Service {
    Struct foo(1: Struct bar)
}
