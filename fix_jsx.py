import re
jsx = open('src/component/staff/POSTransactions.jsx', 'r', encoding='utf-8').read()

jsx = jsx.replace('style="width:30%"', 'style={{width: "30%"}}')
jsx = jsx.replace('style="width:20%; text-align:right;"', 'style={{width: "20%", textAlign: "right"}}')
jsx = jsx.replace('style="width:25%; text-align:center;"', 'style={{width: "25%", textAlign: "center"}}')
jsx = jsx.replace('style="text-align:right;"', 'style={{textAlign: "right"}}')
jsx = jsx.replace('style="text-align:center;"', 'style={{textAlign: "center"}}')
jsx = jsx.replace('style="color:#3670AF;"', 'style={{color: "#3670AF"}}')
jsx = jsx.replace('style="color:#3670AF;margin-right:8px;"', 'style={{color: "#3670AF", marginRight: "8px"}}')
jsx = jsx.replace('style="display:flex;align-items:center;gap:0.8rem;"', 'style={{display: "flex", alignItems: "center", gap: "0.8rem"}}')
jsx = jsx.replace('style="font-size:0.6rem;color:#8aaccc;padding:0.2rem 0.4rem;text-align:center;"', 'style={{fontSize: "0.6rem", color: "#8aaccc", padding: "0.2rem 0.4rem", textAlign: "center"}}')
jsx = jsx.replace('style="color:#d4af37;margin-right:8px;"', 'style={{color: "#d4af37", marginRight: "8px"}}')
jsx = jsx.replace('class=', 'className=')

open('src/component/staff/POSTransactions.jsx', 'w', encoding='utf-8').write(jsx)
print('Fixed jsx for real')
