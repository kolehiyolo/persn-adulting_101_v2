# File: data/generateRecurringTransactions.py

import csv
from datetime import datetime, timedelta
import calendar
import os

# === CONFIG ===
INPUT_FILE = "recurringTransactions.csv"
OUTPUT_FILE = "generatedTransactions.csv"

# === HELPERS ===

def parse_parameters(param_str):
    return [p.strip() for p in param_str.strip('"').split(',')]

def standardize_date(date_str):
    # Support multiple date formats
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
    else:  # Negative nth (last, second to last, etc.)
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
    title = row["Title"]
    regularity = row["Regularity"].strip()
    parameters = parse_parameters(row["Parameters"])
    start_date = standardize_date(row["Start"])
    end_date = standardize_date(row["End"])
    current = start_date

    try:
        if regularity == "Annual":
            month_str, day_str = parameters
            month = datetime.strptime(month_str.strip(), "%B").month
            day = int(day_str)
            for year in range(start_date.year, end_date.year + 1):
                try:
                    date = datetime(year, month, day)
                    if start_date <= date <= end_date:
                        dates.append(date)
                except ValueError:
                    print(f"[Warning] Skipping invalid date for {title}: {month_str} {day_str} in {year}")
        
        elif regularity == "Monthly (Date)":
            day = int(parameters[0])
            while current <= end_date:
                try:
                    date = datetime(current.year, current.month, day)
                    if start_date <= date <= end_date:
                        dates.append(date)
                except ValueError:
                    print(f"[Warning] Skipping invalid date {current.year}-{current.month}-{day} for {title}")
                # Move to next month
                if current.month == 12:
                    current = datetime(current.year + 1, 1, 1)
                else:
                    current = datetime(current.year, current.month + 1, 1)
        
        elif regularity == "Monthly (Week+Day)":
            n = int(parameters[0])
            weekday_name = parameters[1].strip().lower()
            weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].index(weekday_name.lower())

            while current <= end_date:
                try:
                    date = get_nth_weekday(current.year, current.month, weekday, n)
                    if date and start_date <= date <= end_date:
                        dates.append(date)
                except Exception as e:
                    print(f"[Warning] Failed to calculate date for {title}: {e}")
                # Move to next month
                if current.month == 12:
                    current = datetime(current.year + 1, 1, 1)
                else:
                    current = datetime(current.year, current.month + 1, 1)

        elif regularity == "Weekly":
            weekday_name = parameters[0].strip().lower()
            weekday = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].index(weekday_name.lower())

            current = start_date
            while current <= end_date:
                if current.weekday() == weekday:
                    dates.append(current)
                current += timedelta(days=1)
        else:
            print(f"[Warning] Unknown Regularity '{regularity}' for {title}")
    except Exception as e:
        print(f"[Error] Failed processing {title}: {e}")

    return dates

# === MAIN ===

if __name__ == "__main__":
    if not os.path.exists(INPUT_FILE):
        print(f"[Error] File not found: {INPUT_FILE}")
        exit(1)

    output_rows = []

    with open(INPUT_FILE, mode="r", newline='', encoding="utf-8") as infile:
        reader = csv.DictReader(infile)
        for row in reader:
            title = row["Title"]
            trans_type = row["Type"]
            category = row["Category"]
            amount = float(row["Amount"])
            transaction_dates = generate_transaction_dates(row)

            for date in transaction_dates:
                output_rows.append({
                    "Title": title,
                    "Type": trans_type,
                    "Category": category,
                    "Amount": f"{amount:.2f}",
                    "Date": iso_date(date)
                })

    with open(OUTPUT_FILE, mode="w", newline='', encoding="utf-8") as outfile:
        fieldnames = ["Title", "Type", "Category", "Amount", "Date"]
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(output_rows)

    print(f"[Success] Wrote {len(output_rows)} transactions to {OUTPUT_FILE}")
