include common "./include-child.thrift"

const list<i32> nums = [1, common.some_num, 2];

const common.Role DEFAULT_ROLE = common.Role.USER

struct BatchGetResponse {
    1: required list<common.Item> items = []
}

service ItemStore {
    BatchGetResponse batchGetItems(
        1: list<string> keys
    )
}

service KeyValue extends common.BaseService {
    binary get(
        1: binary key
    )
    void put(
        1: binary key,
        2: binary value
    )
}
