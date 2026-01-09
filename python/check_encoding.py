
try:
    with open('c:/2年秋学期/Data/antigravity/csv/bear_killed_count.csv', 'r', encoding='utf-8') as f:
        print("UTF-8 Header:", f.readline().strip())
        print("UTF-8 Content sample:", f.readline().strip())
    print("UTF-8 Success")
except Exception as e:
    print("UTF-8 Failed:", e)

print("-" * 20)

try:
    with open('c:/2年秋学期/Data/antigravity/csv/bear_killed_count.csv', 'r', encoding='shift_jis') as f:
        print("Shift-JIS Header:", f.readline().strip())
        print("Shift-JIS Content sample:", f.readline().strip())
    print("Shift-JIS Success")
except Exception as e:
    print("Shift-JIS Failed:", e)
