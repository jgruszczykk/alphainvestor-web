#!/usr/bin/env python3
"""
Generate marketing / hero-style images with OpenAI Images API (DALL-E 3).

Loads OPENAI_API_KEY from the mobile app repo .env by default:
  <this-repo>/../alphainvestor/.env

Usage (from alphainvestor-web):
  python3 -m venv .venv-marketing && source .venv-marketing/bin/activate
  pip install -r scripts/requirements-marketing-images.txt
  python scripts/generate_marketing_images.py --preset instrument
  python scripts/generate_marketing_images.py --preset all --quality hd

Costs real API usage; review prompts before running --preset all.
"""

from __future__ import annotations

import argparse
import base64
import sys
from pathlib import Path

STYLE = """Dark fintech mobile UI screenshot aesthetic, pure black #000000 outer background,
card surfaces #1C1C1E, clean sans-serif like SF Pro, heavy rounded corners 18-22px,
accent blue #007AFF for selected pills, green #34C759 for positive numbers and chart lines,
orange for warnings. No Apple logo, no real broker logos. Demo ticker ADBE is OK.
Single tall phone UI frame, high contrast, sharp UI, no watermark, no moiré."""

PRESETS: dict[str, str] = {
    "instrument": f"""{STYLE}
One mobile screen: stock detail for ADBE. Top card titled Chart with timeframe pills
1W 1M 3M 1Y 5Y where 1M is selected in blue; green price line and subtle volume bars.
Below: slim card with large green +4.71 (+1.91%) past month. Third card Overview with
two-column rows: Symbol, Exchange, Currency, Type, Last, Day change in green.""",
    "wallet": f"""{STYLE}
Mobile screen titled Wallet. Circular health score ring in orange with 50 inside and
label Watch; beside it HEALTH SCORE label and short paragraph. Below: Allocation card
with green By portfolio bar at 100%, By sector multi-color bar with legend percentages,
Largest holdings ADBE ASML COKE with small badges, one orange callout about concentration.
Crop so bottom tab bar is absent or minimal.""",
    "lenses": f"""{STYLE}
Single large dark card titled Five lenses with short subtitle that scores are 1-5 and
Risk is inverted. Five rows: Trend, Valuation, Risk, Growth, Momentum - each with small
rounded icon, 5-segment score bar filled green or orange, score text like 4/5, short
subtitle, one line of descriptive copy with plausible percentages.""",
    "wallet-value": f"""{STYLE}
One card titled Wallet value, subtitle about historical portfolio value for 1W,
timeframe pills with 1W selected in blue, green line chart, grey min/max labels,
center value in blue, tiny grey disclaimer at bottom. Tight crop on this card only.""",
}


def default_env_path() -> Path:
    web_root = Path(__file__).resolve().parent.parent
    return web_root.parent / "alphainvestor" / ".env"


def load_api_key(env_file: Path | None) -> str:
    import os

    from dotenv import load_dotenv

    if env_file is not None and env_file.is_file():
        load_dotenv(env_file, override=False)
    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not key:
        tried = env_file if env_file else "(no --env-file)"
        sys.exit(
            "OPENAI_API_KEY is not set.\n"
            f"  Tried env file: {tried}\n"
            "  Add OPENAI_API_KEY to that .env or export it in the shell."
        )
    return key


def generate_one(
    *,
    client: object,
    preset: str,
    prompt: str,
    out_path: Path,
    size: str,
    quality: str,
) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    res = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size=size,  # type: ignore[arg-type]
        quality=quality,  # type: ignore[arg-type]
        n=1,
        response_format="b64_json",
    )
    b64 = res.data[0].b64_json
    if not b64:
        sys.exit("API returned no image data")
    raw = base64.standard_b64decode(b64)
    out_path.write_bytes(raw)
    print(f"Wrote {out_path} ({len(raw) // 1024} KB) [{preset}]")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--preset",
        choices=[*sorted(PRESETS.keys()), "all"],
        default="instrument",
        help="Which prompt to run (default: instrument)",
    )
    parser.add_argument(
        "--env-file",
        type=Path,
        default=None,
        help=f"Path to .env containing OPENAI_API_KEY (default: {default_env_path()})",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=None,
        help="Output directory (default: <web>/public/marketing/generated)",
    )
    parser.add_argument(
        "--size",
        choices=["1024x1024", "1024x1792", "1792x1024"],
        default="1024x1792",
        help="DALL-E 3 size (default portrait for phone UI)",
    )
    parser.add_argument(
        "--quality",
        choices=["standard", "hd"],
        default="standard",
        help="Image quality tier (hd costs more)",
    )
    args = parser.parse_args()

    web_root = Path(__file__).resolve().parent.parent
    env_path = args.env_file if args.env_file is not None else default_env_path()
    out_dir = args.out_dir if args.out_dir is not None else web_root / "public" / "marketing" / "generated"

    api_key = load_api_key(env_path)

    from openai import OpenAI

    client = OpenAI(api_key=api_key)

    presets = list(PRESETS.keys()) if args.preset == "all" else [args.preset]
    for name in presets:
        prompt = PRESETS[name]
        filename = f"{name}-dalle3-{args.size.replace('x', '_')}.png"
        generate_one(
            client=client,
            preset=name,
            prompt=prompt,
            out_path=out_dir / filename,
            size=args.size,
            quality=args.quality,
        )


if __name__ == "__main__":
    main()
