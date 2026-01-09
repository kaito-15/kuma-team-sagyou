import os

kuma_path = r'../html/kuma.html'
csv_path = r'../html/temp_read.txt'

try:
    with open(csv_path, 'r', encoding='utf-8') as f:
        new_csv = f.read().strip()

    with open(kuma_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update CSV Data
    start_marker = 'const rawCsvData = `'
    end_marker = '`;'
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Error: Start marker not found")
        exit(1)
        
    csv_start = start_idx + len(start_marker)
    
    # We look for `\n` then extract to end?
    # Actually the content inside backticks is what we replace.
    # The new_csv includes headers.
    
    # Find the end of the variable declaration
    # We search for the closing backtick.
    end_idx = content.find('`;', csv_start)
    if end_idx == -1:
        print("Error: End marker not found")
        exit(1)

    print(f"Replacing CSV data from index {csv_start} to {end_idx}")
    content = content[:csv_start] + new_csv + content[end_idx:]

    # 2. Update Logic
    # We need to replace the 'Total' check with summation.
    # Pattern to find:
    # if (item.prefecture === '計') {
    #     total = item.count;
    #     return;
    # }
    
    old_logic_snippet = "if (item.prefecture === '計') {"
    new_logic_snippet = "total += item.count;"
    
    logic_start = content.find(old_logic_snippet)
    if logic_start != -1:
        # Check surrounding braces/lines
        # The block is roughly 4 lines.
        # We can find the closing brace relative to start.
        # Just hardcode the replacement if exact text matches.
        full_old_block = """                if (item.prefecture === '計') {
                    total = item.count;
                    return;
                }"""
        
        # Check if full block exists (handling potential line ending diffs)
        # We'll try to be loose about whitespace if exact match fails
        if full_old_block in content:
            content = content.replace(full_old_block, "                " + new_logic_snippet)
            print("Logic updated (exact match)")
        else:
            # Fallback: remove the block carefully
            # Find the start, then find the closing }
            # Since we know the structure...
            # But simpler: replace the lines.
            print("Warning: Exact logic block match failed. Attempting flexible replacement.")
            # We will search for signature parts
            pass 
            # (If it fails, we keep old logic? But old logic will break totals.
            # However, if '計' is missing, old logic just never runs, so total stays 0.
            # Checks: Total defaults to 0. If new data has no '計', total stays 0.
            # So updating logic is CRITICAL for display.
            
            # Let's try replacing just the condition line with a sum and commenting out the rest?
            # Or manually detecting the lines.
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if "if (item.prefecture === '計') {" in line:
                    # found it.
                    # replace this line and next 3 lines.
                    lines[i] = "                total += item.count;"
                    lines[i+1] = "" # total = ...
                    lines[i+2] = "" # return;
                    lines[i+3] = "" # }
                    print(f"Logic updated at line {i+1}")
                    break
            content = '\n'.join(lines)

    else:
        print("Error: Logic block start not found")
        # Proceed anyway?
    
    with open(kuma_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Done")

except Exception as e:
    print(f"Exception: {e}")
    exit(1)
