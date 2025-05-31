import csv
from datetime import datetime, timedelta
from collections import defaultdict

# === INPUT CONFIG ===
MIN_DATE = "2025-01-01"
MAX_DATE = "2025-12-31"
TRANSACTIONS_FILE = "output/transactions-all.csv"
OUTPUT_FILE = "output/calendar-dates-data.csv"

# === Helper Functions ===
def parse_date(date_str):
    return datetime.fromisoformat(date_str)

def to_iso(date_obj):
    return date_obj.strftime("%Y-%m-%dT00:00:00.000Z")

def get_month_start_dates(min_date, max_date):
    current = datetime(min_date.year, min_date.month, 1)
    end = datetime(max_date.year, max_date.month, 1)
    while current <= end:
        yield current
        if current.month == 12:
            current = current.replace(year=current.year + 1, month=1)
        else:
            current = current.replace(month=current.month + 1)

def get_calendar_bounds_for_month(month_start):
    next_month = month_start.replace(day=28) + timedelta(days=4)
    month_end = next_month.replace(day=1) - timedelta(days=1)
    leading_start = month_start - timedelta(days=(month_start.weekday() + 1) % 7)
    trailing_end = month_end + timedelta(days=(6 - month_end.weekday()) % 7)
    return leading_start.date(), trailing_end.date(), month_start.date(), month_end.date()

# === Load Transactions ===
transactions_by_date = defaultdict(list)

with open(TRANSACTIONS_FILE, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        trans_date = parse_date(row["date"]).date()
        trans_type = row["type"].lower()
        amount = float(row["amount"])
        transactions_by_date[trans_date].append((trans_type, amount))

# === Prepare Calendar Data ===
start_date = parse_date(MIN_DATE).date()
end_date = parse_date(MAX_DATE).date()

calendar_data = []
total_running = 0

for month_start in get_month_start_dates(start_date, end_date):
    leading_start, trailing_end, month_real_start, month_real_end = get_calendar_bounds_for_month(month_start)

    current = leading_start
    while current <= trailing_end:
        daily_transactions = transactions_by_date.get(current, [])
        date_positive = sum(a for t, a in daily_transactions if t == "income")
        date_negative = sum(a for t, a in daily_transactions if t == "expense")
        date_change = date_positive - date_negative
        total_running += date_change

        calendar_data.append({
            "calendar_month": to_iso(month_start),
            "date": to_iso(datetime.combine(current, datetime.min.time())),
            "date_is_not_trailing_or_leading": month_real_start <= current <= month_real_end,
            "date_positive": round(date_positive, 2),
            "date_negative": round(date_negative, 2),
            "date_change": round(date_change, 2),
            "date_total_running": round(total_running, 2)
        })

        current += timedelta(days=1)

# === Write to CSV ===
with open(OUTPUT_FILE, "w", newline='', encoding="utf-8") as f:
    fieldnames = [
        "calendar_month", "date", "date_is_not_trailing_or_leading",
        "date_positive", "date_negative", "date_change", "date_total_running"
    ]
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(calendar_data)

print(f"Generated {OUTPUT_FILE} with {len(calendar_data)} rows.")
