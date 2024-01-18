include B "./include-cyclic-b.thrift"

struct Node {
    1: required string name
    2: required B.Struct value
}
