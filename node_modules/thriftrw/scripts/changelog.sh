#!/usr/bin/env bash

set -e

LAST=$(grep '^# v' CHANGELOG.md | head -n1 | cut -d' ' -f2)

{
    echo '# vNEXT // FIXME'
    echo

    git log --first-parent "${LAST}.." | grep -A4 '^Date:' | sed \
        -e '/^ *$/d' \
        -e '/Merge pull request/d' \
        -e '/^Date:/d' \
        -e '/^--/d' \
        -e '/^commit /d' \
        -e '/^    [0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*/ s/^    /# v/' \
        -e '/^    [0-9]\.[0-9][0-9]*\.[0-9][0-9]*/ s/^    /# v/' \
        -e '/^# v/i\' \
        -e '/^# v/a\' \
        -e 's/^    /- /'

    echo
    echo '# -- NEW ABOVE, OLD BELOW --'
    echo

    cat CHANGELOG.md
} > CHANGELOG.md.new

mv -vf CHANGELOG.md.new CHANGELOG.md
