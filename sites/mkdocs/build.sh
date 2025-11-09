#!/bin/bash
# Install Python dependencies and run the MkDocs build command
pip install -r requirements.txt
mkdocs build
