# Incoming photo guide

Place original JPEG photographs according to their intended site role. I will review them, write accurate metadata, choose focal points, and generate AVIF, WebP, and JPEG site variants.

## Where to put photos

```text
incoming-photos/
├── homepage/
│   ├── hero/
│   └── about/
├── services/
│   ├── wedding-day/gallery/
│   ├── pre-wedding/gallery/
│   └── proposal/gallery/
├── stories/
│   ├── example-story/           # Copyable example; not imported
│   └── alex-and-sam/
│       ├── story.md
│       ├── 01-getting-ready/
│       ├── 02-ceremony/
│       ├── 03-portraits/
│       └── 04-reception/
└── to-sort/
```

Use `to-sort/` when you are unsure where photos belong. Photos there are not imported automatically.

You can copy `stories/example-story/` when starting a new story, rename the copied folder for the couple, and replace its example text and empty chapter folders with the real material.

## Controlling order

- Chapter folders are sorted naturally. Use `01-`, `02-`, `03-`, and so on to force their order.
- Photos are also sorted naturally. To force an exact order, prefix filenames with three digits: `001-_DSC1234.jpg`, `002-_DSC1270.jpg`, etc.
- Keep the rest of the original camera filename after the number so a photo remains easy to identify.
- Without number prefixes, I will review the photographs and arrange them into a suitable editorial sequence.

## Supplying story text

Add a `story.md` file inside the couple or story folder. Use this short template:

```md
# Story details

Couple or story name:
Location and venues:
Wedding date (optional):
Category:
Tags:

## Short summary
One or two sentences for the stories listing.

## Full introduction
The main story introduction, or notes I can turn into one.

## Chapter 1 — Getting ready
What happened, who was present, and any meaningful details.

## Chapter 2 — Ceremony
Ceremony type, venue, traditions, and important moments.

## Chapter 3 — Portraits and reception
Locations, atmosphere, speeches, celebrations, and other details.

## Photo notes
Hero preference:
Must-include photos:
People, traditions, or details to identify accurately:
Anything that should not be mentioned:
```

Chapters in `story.md` should follow the numbered photo folders. You may provide finished copy or rough factual notes; I can shape rough notes into the existing site voice without inventing details.

## Important

- Reusing a photograph in more than one role is allowed.
- Do not place generated AVIF or WebP files here.
- Do not rename or remove already imported photos unless you want their manifest mapping updated.
