#!/bin/bash
# Install Python dependencies
pip install -r requirements.txt

# Run MkDocs using the 'python -m' module execution method
python -m mkdocs build
