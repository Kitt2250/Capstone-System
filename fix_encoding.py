import sys
content = open('src/component/staff/Reports.jsx', 'r', encoding='utf-8').read()

replacements = {
    '✦': '&#10022;',
    '₱': '&#8369;',
    '📅': '&#128197;',
    '🪦': '&#129702;',
    '🛏️': '&#128719;&#65039;',
    '💰': '&#128176;',
    '📋': '&#128203;'
}

# In JSX, raw HTML entities need to be in quotes or passed properly, but wait:
# Actually, inside JSX text nodes, HTML entities like &#8369; work perfectly.
# BUT inside strings like `₱${t.amount}` they won't!
# So for `₱`, if it's inside a template literal like `₱${t.amount}`, it must be replaced with `\u20B1`!
# Let's just write a regex to replace `₱` with `\u20B1` in strings!

# It's safer to just rewrite the file content and replace characters with standard unicode escapes!
content = content.replace('✦', r'\u2726')
content = content.replace('₱', r'\u20B1')
content = content.replace('📅', r'\uD83D\uDCC5')
content = content.replace('🪦', r'\uD83E\uDEA6')
content = content.replace('🛏️', r'\uD83D\uDECF\uFE0F')
content = content.replace('💰', r'\uD83D\uDCB0')
content = content.replace('📋', r'\uD83D\uDCCB')

open('src/component/staff/Reports_fixed.jsx', 'w', encoding='utf-8').write(content)
