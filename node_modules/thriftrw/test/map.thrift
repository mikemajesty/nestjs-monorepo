typedef map<i8, i8> MapI8I8
typedef map<i16, i16> MapI16I16
typedef map<i32, i32> MapI32I32
struct Graph {
    1: required map<string, i16> stringsToI16s
    1: required map<string, i16> (js.type = 'entries') stringsToI16Entries
}
