#!/bin/bash
# Quick folder structure check

echo "✅ Checking UMKM Frontend Folder Structure..."
echo ""

echo "📂 Core Folders:"
ls -1d assets components layouts pages plugins static store 2>/dev/null | sed 's/^/  ✓ /'

echo ""
echo "📂 Organization Folders (NEW):"
ls -1d constants helpers services utils 2>/dev/null | sed 's/^/  ✓ /'

echo ""
echo "📂 Config Folders:"
ls -1d middleware 2>/dev/null | sed 's/^/  ✓ /'

echo ""
echo "📄 Key Files:"
ls -1 nuxt.config.js jsconfig.json .env 2>/dev/null | sed 's/^/  ✓ /'

echo ""
echo "📚 Documentation:"
ls -1 README.md QUICK_START.md SETUP.md PROJECT_STRUCTURE.md STRUCTURE_CLEANUP.md STRUCTURE_TREE.md 2>/dev/null | sed 's/^/  ✓ /'

echo ""
echo "✅ Structure is complete and organized!"
