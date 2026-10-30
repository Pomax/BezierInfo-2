#!/bin/bash
set +e
rm -f *.tar.gz
set -e
wget https://github.com/dawbarton/pdf2svg/archive/v0.2.3.tar.gz
tar -zxf v0.2.3.tar.gz
cd pdf2svg-0.2.3
./configure
make
sudo make install
cd ..
set +e
rm -rf pdf2svg-0.2.3
rm v0.2.3.tar.gz
pdf2svg
set -e
