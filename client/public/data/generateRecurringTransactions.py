# File: data/generateRecurringTransactions.py

import csv
from datetime import datetime, timedelta
import calendar
import os

# === CONFIG ===
INPUT_FILE = "transactionsRecurring.csv"
OUTPUT_FILE = "transactionsRecurringOutput.csv"

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
    title = row["title"]
    regularity = row["regularity"].strip()
    parameters = parse_parameters(row["parameters"])
    start_date = standardize_date(row["start"])
    end_date = standardize_date(row["end"])
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
      title = row["title"]
      trans_type = row["type"]
      category = row["category"]
      tags = row["tags"]
      amount = float(row["amount"])
      transaction_dates = generate_transaction_dates(row)

      for date in transaction_dates:
        output_rows.append({
          "title": title,
          "type": trans_type,
          "category": category,
          "tags": tags,
          "amount": f"{amount:.2f}",
          "date": iso_date(date)
        })

  with open(OUTPUT_FILE, mode="w", newline='', encoding="utf-8") as outfile:
    fieldnames = ["title", "type", "category", "tags", "amount", "date"]
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(output_rows)

  print(f"[Success] Wrote {len(output_rows)} transactions to {OUTPUT_FILE}")

  # Paths to input and output files
  file1 = 'transactionsOneTime.csv'
  file2 = OUTPUT_FILE
  output = 'transactionsAll.csv'

  # Read both CSVs
  with open(file1, 'r', newline='', encoding='utf-8') as f1, \
    open(file2, 'r', newline='', encoding='utf-8') as f2:
    
    reader1 = csv.DictReader(f1)
    reader2 = csv.DictReader(f2)

    # Combine all unique headers
    all_fieldnames = list(set(reader1.fieldnames + reader2.fieldnames))

    # Read all rows from both files
    rows1 = list(reader1)
    rows2 = list(reader2)

  # Write the merged CSV
  with open(output, 'w', newline='', encoding='utf-8') as out_file:
    writer = csv.DictWriter(out_file, fieldnames=all_fieldnames)
    writer.writeheader()

    for row in rows1 + rows2:
      # Ensure missing keys are filled with empty strings
      normalized_row = {field: row.get(field, '') for field in all_fieldnames}
      writer.writerow(normalized_row)

  print(f"Merged CSV written to {output}")