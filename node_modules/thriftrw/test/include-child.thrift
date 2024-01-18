const i32 some_num = 42

enum Role {
    DISABLED = 0,
    USER = 1,
    MOD = 2,
    ADMIN = 3
}

struct Item {
    1: required string key
    2: required string value
}

service BaseService {
    string serviceName()
    bool healthy()
}