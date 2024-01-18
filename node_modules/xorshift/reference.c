#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* The state must be seeded so that it is not everywhere zero. */
uint64_t s[ 2 ];

uint64_t xorshift128plus_int(void) {
	uint64_t s1 = s[0];
	const uint64_t s0 = s[1];
	const uint64_t result = s0 + s1;
	s[0] = s0;
	s1 ^= s1 << 23; // a
	s[1] = s1 ^ s0 ^ (s1 >> 18) ^ (s0 >> 5); // b, c
	return result;
}

double xorshift128plus_double(void) {
	const uint64_t x = xorshift128plus_int();
	const uint64_t x_doublefied = UINT64_C(0x3FF) << 52 | x >> 12;

	return *((double *) &x_doublefied) - 1.0;
}

int main(int argc, char *argv[]) {
  s[0] = 1L;
  s[1] = 2L;

  uint64_t length = 10;
  if (argc > 1) {
    length = atoi(argv[1]);
  }

  if(argc > 3) {
    s[0] = atol(argv[2]);
    s[1] = atol(argv[3]);
  }

	const bool useDouble = (argc > 4);

  printf("[\n");
  for (int i = 0; i < length; i++) {

		if (useDouble) {
			printf("  \"%.20e\"", xorshift128plus_double());
		} else {
			printf("  \"%016llX\"", xorshift128plus_int());
		}

		if (i < length - 1) {
			printf(",\n");
		}
  }
	printf("\n]\n");
}
