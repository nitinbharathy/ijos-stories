# Incoming photo library

Place source photographs according to where they belong on the site. Keep the original camera filename; the import tooling creates descriptive public filenames and optimized AVIF, WebP, and JPEG variants.

## Folder structure

```text
incoming-photos/
├── homepage/
│   ├── hero/                    # Homepage hero carousel
│   └── about/                   # Photographer/about imagery
├── services/
│   ├── wedding-day/gallery/     # Wedding-day service carousel and gallery
│   ├── pre-wedding/gallery/     # Pre-wedding service carousel and gallery
│   └── proposal/gallery/        # Proposal service carousel and gallery
├── stories/
│   └── couple-or-story-name/    # Full story gallery
│       └── 01-optional-chapter/ # Optional ordered event/day folders
└── to-sort/                     # New photos whose site role is undecided
```

## Adding photographs

- Put a photograph in every role where it should appear. Reusing the same photograph in a service gallery and a story is allowed.
- Use lowercase kebab-case for new folder names, such as `victoria-and-sean` or `01-getting-ready`.
- Number story chapters when their order matters.
- Put uncertain or unreviewed photographs in `to-sort/`; they are not imported automatically.
- Do not add generated AVIF/WebP files here. This directory is for source photographs only.
- Do not rename or remove already imported files without regenerating the photo manifest.

After arranging new photographs, update the mappings and descriptions in `scripts/create-photo-import-manifest.mjs`, then regenerate the manifest and optimized variants.
