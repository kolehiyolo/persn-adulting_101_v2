# File: data/generateTransactionsData.py

import csv
import os
from datetime import datetime, timedelta
import calendar

# === HELPERS ===

def parse_parameters(param_str):
    return [p.strip() for p in param_str.strip('"').split(',')]

def standardize_date(date_str):
    for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%Y/%m/%d"):
        try:
            return datetime.strptime(date_str.strip(), fmt)
        except ValueError:
            continue
    raise ValueError(f"Unrecognized date format: {date_str}")

def iso_date(date_obj):
    return date_obj.strftime('%Y-%m-%dT00:00:00.000Z')

def get_nth_weekday(year, month, weekday, n):
    if n > 0:
        count = 0
        for day in range(1, calendar.monthrange(year, month)[1]+1):
            d = datetime(year, month, day)
            if d.weekday() == weekday:
                count += 1
                if count == n:
                    return d
    else:
        count = 0
        for day in range(calendar.monthrange(year, month)[1], 0, -1):
            d = datetime(year, month, day)
            if d.weekday() == weekday:
                count -= 1
                if count == n:
                    return d
    return None

def generate_transaction_dates(row):
    dates = []
    title = row["title"]
    regularity = row["regularity"].strip()
    parameters = parse_parameters(row["parameters"])
    start_date = standardize_date(row["start"])
    end_date = standardize_date(row["end"])
    current = start_date

    try:
        if regularity == "Annual":
            month = datetime.strptime(parameters[0], "%B").month
            day = int(parameters[1])
            for year in range(start_date.year, end_date.year + 1):
                try:
                    date = datetime(year, month, day)
                    if start_date <= date <= end_date:
                        dates.append(date)
                except:
                    continue

        elif regularity == "Monthly (Date)":
            day = int(parameters[0])
            while current <= end_date:
                try:
                    date = datetime(current.year, current.month, day)
                    if start_date <= date <= end_date:
                        dates.append(date)
                except:
                    pass
                current = current.replace(day=1)
                current += timedelta(days=32)
                current = current.replace(day=1)

        elif regularity == "Monthly (Week+Day)":
            n = int(parameters[0])
            weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].index(parameters[1].lower())
            while current <= end_date:
                date = get_nth_weekday(current.year, current.month, weekday, n)
                if date and start_date <= date <= end_date:
                    dates.append(date)
                current = current.replace(day=1)
                current += timedelta(days=32)
                current = current.replace(day=1)

        elif regularity == "Weekly":
            weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].index(parameters[0].lower())
            while current <= end_date:
                if current.weekday() == weekday:
                    dates.append(current)
                current += timedelta(days=1)

    except Exception as e:
        print(f"[Error] {title}: {e}")
    return dates


# === MAIN PROCESS FOR EACH SET ===

def process_set(set_path):
    input_recurring = os.path.join(set_path, "input/transactions-recurring.csv")
    input_onetime = os.path.join(set_path, "input/transactions-one_time.csv")
    output_middle = os.path.join(set_path, "middle/transactions-recurring_all.csv")
    output_final = os.path.join(set_path, "output/transactions-all.csv")

    if not os.path.exists(input_recurring) or not os.path.exists(input_onetime):
        print(f"[Skipped] Missing input files in {set_path}")
        return

    output_rows = []

    # Process recurring transactions
    with open(input_recurring, newline='', encoding="utf-8") as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            dates = generate_transaction_dates(row)
            for date in dates:
                output_rows.append({
                    "title": row["title"],
                    "type": row["type"],
                    "category": row["category"],
                    "tags": row["tags"],
                    "amount": f"{float(row['amount']):.2f}",
                    "date": iso_date(date)
                })

    os.makedirs(os.path.dirname(output_middle), exist_ok=True)
    with open(output_middle, "w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "type", "category", "tags", "amount", "date"])
        writer.writeheader()
        writer.writerows(output_rows)

    # Merge with one-time transactions
    with open(input_onetime, newline='', encoding="utf-8") as f1, open(output_middle, newline='', encoding="utf-8") as f2:
        reader1 = csv.DictReader(f1)
        reader2 = csv.DictReader(f2)
        rows1 = list(reader1)
        rows2 = list(reader2)
        all_fieldnames = list(set(reader1.fieldnames + reader2.fieldnames))

    os.makedirs(os.path.dirname(output_final), exist_ok=True)
    with open(output_final, "w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=all_fieldnames)
        writer.writeheader()
        for row in rows1 + rows2:
            normalized = {field: row.get(field, "") for field in all_fieldnames}
            writer.writerow(normalized)

    print(f"[Done] Processed {set_path}")


# === LOOP THROUGH ALL SETS ===

if __name__ == "__main__":
    sets_dir = os.path.join(os.path.dirname(__file__), "sets")
    set_folders = [os.path.join(sets_dir, name) for name in os.listdir(sets_dir) if os.path.isdir(os.path.join(sets_dir, name))]

    for folder in set_folders:
        process_set(folder)

    print("[Success] All sets processed.")
