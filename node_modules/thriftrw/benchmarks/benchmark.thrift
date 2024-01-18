typedef list<Coordinate> Coordinates;

struct Coordinate {
    1: required double lat
    2: required double lon
}

struct CoordinatesHolder {
    1: required Coordinates coordinates
}

struct GreekSoup {
    1: optional string alpha
    2: optional string beta
    3: optional string gama
    4: optional string delta
    5: optional string epsilon
    6: optional string zeta
    7: optional string eta
    8: optional string theta
    9: optional string iota
    10: optional string kappa
    11: optional string lambda
    12: optional string mu
    13: optional string nu
    14: optional string xi
    15: optional string omicron
    16: optional string pi
    17: optional string rho
    18: optional string sigma
    19: optional string tau
    20: optional string upsilon
    21: optional string phi
    22: optional string chi
    23: optional string psi
    24: optional string omega
}
