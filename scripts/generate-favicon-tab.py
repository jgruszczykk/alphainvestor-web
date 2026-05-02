#!/usr/bin/env python3
"""
Generate a rounded-square tab favicon (PNG) from the flat brand mark.

Requires Pillow:
  python3 -m pip install pillow

Default: reads public/brand/wordmark-dark-mode.png, writes public/brand/favicon-tab.png (32×32).
  Mark padding defaults to ~size/18 (min 1px) so the logo is large in the tile; use --inset N for more margin.
  For a wide wordmark in the tab, try --size 48 as well.

Usage:
  python3 scripts/generate-favicon-tab.py
  python3 scripts/generate-favicon-tab.py --size 48 --radius 12
  python3 scripts/generate-favicon-tab.py -i path/to/mark.png -o path/to/out.png
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw

DEFAULT_BG = (12, 10, 9, 255)  # ~ --surface dark (stone)


def parse_args() -> argparse.Namespace:
    root = Path(__file__).resolve().parents[1]
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument(
        "-i",
        "--input",
        type=Path,
        default=root / "public" / "brand" / "wordmark-dark-mode.png",
        help="Source image (default: public/brand/wordmark-dark-mode.png)",
    )
    p.add_argument(
        "-o",
        "--output",
        type=Path,
        default=root / "public" / "brand" / "favicon-tab.png",
        help="Output favicon path",
    )
    p.add_argument("--size", type=int, default=32, help="Output width/height in px")
    p.add_argument(
        "--radius",
        type=int,
        default=None,
        help="Outer corner radius (default: ~size/4)",
    )
    p.add_argument(
        "--inset",
        type=int,
        default=None,
        help="Padding around mark in px (default: ~size/18, min 1)",
    )
    p.add_argument(
        "--bg",
        type=str,
        default="12,10,9,255",
        help="Background RGBA comma-separated, e.g. 12,10,9,255",
    )
    return p.parse_args()


def parse_rgba(s: str) -> tuple[int, int, int, int]:
    parts = [int(x.strip()) for x in s.split(",")]
    if len(parts) != 4:
        raise SystemExit("--bg must be four integers: R,G,B,A")
    return (parts[0], parts[1], parts[2], parts[3])


def main() -> None:
    args = parse_args()
    size = max(16, min(512, args.size))
    radius = args.radius if args.radius is not None else max(4, size // 4)
    inset = args.inset if args.inset is not None else max(1, size // 18)
    bg = parse_rgba(args.bg)

    src = args.input.resolve()
    if not src.is_file():
        raise SystemExit(f"Missing input: {src}")

    mark = Image.open(src).convert("RGBA")
    inner = size - 2 * inset
    mark.thumbnail((inner, inner), Image.Resampling.LANCZOS)
    mw, mh = mark.size
    ox = (size - mw) // 2
    oy = (size - mh) // 2

    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    plate = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(plate)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=bg)

    canvas.alpha_composite(plate)
    canvas.alpha_composite(mark, (ox, oy))

    out = args.output
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, format="PNG", optimize=True)
    print(f"Wrote {out} ({size}×{size}, radius={radius}, inset={inset})")


if __name__ == "__main__":
    main()
