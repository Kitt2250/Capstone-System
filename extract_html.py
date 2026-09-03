import json
import re

html_content = None

with open("last_messages.jsonl", "r", encoding="utf-16") as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "USER_INPUT":
            content = data.get("content", "")
            match = re.search(r'<!DOCTYPE html>.*</html>', content, re.DOTALL | re.IGNORECASE)
            if match:
                html_content = match.group(0)

if html_content:
    with open("user_provided.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Extracted {len(html_content)} bytes of HTML to user_provided.html")
else:
    print("No HTML found in the last messages.")
