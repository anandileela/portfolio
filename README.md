# Portfolio Monorepo

This is a monorepo containing multiple portfolio projects and documentation sites.

## 🔒 Security Assessment: CVE-2025-55182

**Status:** ✅ **NOT VULNERABLE**

A comprehensive security assessment has been performed to check for CVE-2025-55182 (React Server Components RCE vulnerability). 

**Result:** None of the repositories under https://github.com/anandileela are vulnerable to this critical vulnerability.

📄 **Full Assessment Report:** [CVE-2025-55182-ASSESSMENT.md](./CVE-2025-55182-ASSESSMENT.md)

### Summary
- ✅ No React Server Components packages installed
- ✅ React 18.x (api-app) is not affected by CVE-2025-55182
- ✅ React 19.x (docusaurus-docs) does not use vulnerable RSC packages
- ✅ Astro-based sites do not use React Server Components

### Other Security Notes
⚠️ The `packages/api-app` uses Next.js 13.5.6, which has other known vulnerabilities (not CVE-2025-55182). Consider upgrading to Next.js 14.2.25 or later.

---

## Repository Structure

```
portfolio/
├── packages/
│   └── api-app/           # Next.js 13.5.6 + React 18.2.0
├── sites/
│   ├── main/              # Astro 5.13.7 site
│   ├── docusaurus-docs/   # Docusaurus 3.9.2 + React 19.2.0
│   ├── hugo/              # Hugo static site
│   ├── mkdocs/            # MkDocs documentation
│   └── redocly/           # Redocly API docs
└── CVE-2025-55182-ASSESSMENT.md  # Security assessment report
```

## Getting Started

This project uses pnpm workspaces. Install dependencies:

```bash
pnpm install
```

## License

ISC
