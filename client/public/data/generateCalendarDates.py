import os
import csv
from datetime import datetime, timedelta
from collections import defaultdict

SETS_DIR = "./sets"

def read_transactions(file_path):
    transactions = []
    with open(file_path, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            transactions.append({
                "date": datetime.fromisoformat(row["date"]),
                "amount": float(row["amount"]),
                "type": row["type"].lower()
            })
    return transactions

def get_date_range(transactions):
    dates = [t["date"] for t in transactions]
    return min(dates), max(dates)

def generate_calendar_blocks(start_date, end_date):
    current = start_date.replace(day=1)
    blocks = []

    while current <= end_date:
        first_day_of_month = current
        start_of_calendar = first_day_of_month - timedelta(days=first_day_of_month.weekday() + 1 if first_day_of_month.weekday() < 6 else 0)
        block_dates = [start_of_calendar + timedelta(days=i) for i in range(42)]
        blocks.append((start_of_calendar, block_dates))
        current = (first_day_of_month.replace(day=28) + timedelta(days=4)).replace(day=1)
    
    return blocks

def summarize_dates(block_dates, transactions):
    result = []
    running_total = 0
    transactions_by_date = defaultdict(list)
    
    for t in transactions:
        t_date = t["date"].date()
        transactions_by_date[t_date].append(t)

    for date in block_dates:
        date_only = date.date()
        date_txns = transactions_by_date.get(date_only, [])

        date_positive = sum(t["amount"] for t in date_txns if t["type"] == "income")
        date_negative = sum(t["amount"] for t in date_txns if t["type"] == "expense")
        date_change = date_positive - date_negative
        running_total += date_change

        result.append({
            "date": date.isoformat(),
            "date_positive": round(date_positive, 2),
            "date_negative": round(date_negative, 2),
            "date_change": round(date_change, 2),
            "date_total_running": round(running_total, 2),
        })
    
    return result

def write_calendar_csv(output_path, all_calendar_data):
    headers = ["date", "calendar_month", "date_positive", "date_negative", "date_change", "date_total_running"]
    with open(output_path, "w", newline='', encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        for row in all_calendar_data:
            writer.writerow(row)

def generate_calendar_dates_data_for_folder(folder_path):
    txns_path = os.path.join(folder_path, "transactions-all.csv")
    output_path = os.path.join(folder_path, "calendar-dates-data.csv")

    transactions = read_transactions(txns_path)
    # min_date, max_date = get_date_range(transactions)
    # Manually define your date range (inclusive)
    min_date = datetime.fromisoformat("2024-01-01")
    max_date = datetime.fromisoformat("2024-12-31")
    blocks = generate_calendar_blocks(min_date, max_date)

    all_rows = []
    for block_start, block_dates in blocks:
        block_data = summarize_dates(block_dates, transactions)
        for row in block_data:
            row["calendar_month"] = block_start.date().isoformat()
            all_rows.append(row)

    write_calendar_csv(output_path, all_rows)
    print(f"✅ Wrote calendar-dates-data.csv for {folder_path}")

def main():
    for folder in os.listdir(SETS_DIR):
        folder_path = os.path.join(SETS_DIR, folder)
        if os.path.isdir(folder_path):
            try:
                generate_calendar_dates_data_for_folder(folder_path)
            except Exception as e:
                print(f"❌ Error processing {folder_path}: {e}")

if __name__ == "__main__":
    main()
