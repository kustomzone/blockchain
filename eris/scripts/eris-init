#!/bin/bash
mkdir -p /root/.eris/chains
mkdir -p /root/.eris/apps
mkdir -p /root/.eris/scratch/languages
eris init -y -d
eris services start keys
eris chains make test_chain --chain-type simplechain
eris chains new test_chain --dir ~/.eris/chains/test_chain
