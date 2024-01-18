include A "./include-cyclic-a.thrift"

struct Struct {
    1: required list<A.Node> nodes
}
