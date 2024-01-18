include "./animals.thrift"

const list<i32> numbers = [1, 2, 3]
struct Health {
    1: bool ok = true
    2: bool notOk = false
    3: string message = 'OK'
    4: string name = 'alright'
    5: list<i32> numbers = numbers
    6: optional string respected
    7: optional animals.Cat ragdoll
}
