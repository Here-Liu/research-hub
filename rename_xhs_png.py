#!/usr/bin/env python3
"""批量重命名 ~/Desktop/Liu-hub/auto-content-site/xhs-images/ 下的 PNG 文件，加上前缀 "xhs-"。"""

import os
import pathlib

TARGET_DIR = os.path.expanduser("~/Desktop/Liu-hub/auto-content-site/xhs-images/")


def rename_pngs(directory: str) -> None:
    """给目录下所有 .png 文件加上 'xhs-' 前缀。"""
    png_files = sorted(pathlib.Path(directory).glob("*.png"))

    if not png_files:
        print(f"⚠️  未在 '{directory}' 下找到任何 .png 文件。")
        return

    renamed = 0
    for p in png_files:
        old_name = p.name
        # 跳过已经是 xhs- 前缀的文件
        if old_name.startswith("xhs-"):
            print(f"⏭️  跳过（已有 xhs- 前缀）: {old_name}")
            continue

        new_name = f"xhs-{old_name}"
        new_path = p.with_name(new_name)

        print(f"📄 {old_name}  →  {new_name}")
        p.rename(new_path)
        renamed += 1

    print(f"\n✅ 完成！成功重命名 {renamed} 个文件。")


if __name__ == "__main__":
    rename_pngs(TARGET_DIR)
