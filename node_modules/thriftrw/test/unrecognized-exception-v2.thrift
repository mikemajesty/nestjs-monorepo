struct SomeStruct {
    1: required map<string, i16> edges
    2: required set<string> stringset
    3: optional list<bool> boollist
}

exception BogusError {
    1: required string string
    2: required bool bool
    3: required byte byte
    4: required i16 i16
    5: required i32 i32
    6: required i64 i64
    7: required double double
    8: required binary binary
    9: required SomeStruct struct
}

service BogusService {
    string bogus() throws (
        1: BogusError bogusErr
    )
}
