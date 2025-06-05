from datetime import date, timedelta, datetime
from pprint import pprint
import csv

from datetime import datetime

def generate_calendar_month_w_dates_w_data(calendar_dates, transactions):
  def parse_iso_date(iso_str):
    return datetime.fromisoformat(iso_str.replace("Z", "+00:00")).date()
  
  # Step 1: Preprocess transactions
  parsed_transactions = [
    {
      "date": parse_iso_date(txn["date"]),
      "amount": txn["amount"],
      "type": txn["type"].lower()
    }
    for txn in transactions
  ]
  parsed_transactions.sort(key=lambda x: x["date"])

  if not parsed_transactions:
    first_txn_date = last_txn_date = None
  else:
    first_txn_date = parsed_transactions[0]["date"]
    last_txn_date = parsed_transactions[-1]["date"]

  # Step 2: Group transactions by date
  from collections import defaultdict

  transactions_by_date = defaultdict(list)
  for txn in parsed_transactions:
    transactions_by_date[txn["date"]].append(txn)

  result = []
  running_total = 0
  processed_dates = set()
  date_to_running_total = {}

  for date_obj in calendar_dates:
    date_str = date_obj["date"]
    calendar_month = date_obj["calendar_month"]
    date = parse_iso_date(date_str)

    # Case 1: Before any transaction
    if first_txn_date and date < first_txn_date:
      result.append({
        "calendar_month": calendar_month,
        "date": date_str,
        "date_is_not_trailing_or_leading": date_obj["date_is_not_trailing_or_leading"],
        "date_positive": 0,
        "date_negative": 0,
        "date_change": 0,
        "date_total_running": 0
      })
      continue

    # Case 2: After last transaction — continue last running total
    if last_txn_date and date > last_txn_date:
      result.append({
        "calendar_month": calendar_month,
        "date": date_str,
        "date_is_not_trailing_or_leading": date_obj["date_is_not_trailing_or_leading"],
        "date_positive": 0,
        "date_negative": 0,
        "date_change": 0,
        "date_total_running": running_total
      })
      continue

    # Case 3: Within transaction range
    if date in date_to_running_total:
      date_positive = sum(txn["amount"] for txn in transactions_by_date.get(date, []) if txn["type"] == "income")
      date_negative = sum(txn["amount"] for txn in transactions_by_date.get(date, []) if txn["type"] == "expense")
      date_change = date_positive - date_negative
      calendar_date_data = {
        "calendar_month": calendar_month,
        "date": date_str,
        "date_is_not_trailing_or_leading": date_obj["date_is_not_trailing_or_leading"],
        "date_positive": date_positive,
        "date_negative": date_negative,
        "date_change": date_change,
        "date_total_running": date_to_running_total[date]
      }
    else:
      date_transactions = transactions_by_date.get(date, [])
      date_positive = sum(txn["amount"] for txn in date_transactions if txn["type"] == "income")
      date_negative = sum(txn["amount"] for txn in date_transactions if txn["type"] == "expense")
      date_change = date_positive - date_negative
      running_total += date_change
      processed_dates.add(date)
      date_to_running_total[date] = running_total
      calendar_date_data = {
        "calendar_month": calendar_month,
        "date": date_str,
        "date_is_not_trailing_or_leading": date_obj["date_is_not_trailing_or_leading"],
        "date_positive": date_positive,
        "date_negative": date_negative,
        "date_change": date_change,
        "date_total_running": running_total
      }

    result.append(calendar_date_data)

  return result


def load_transactions_from_csv(csv_file_path):
  transactions = []
  
  with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    for row in reader:
      transaction = {
        "date": row["date"],  # keep as ISO string
        "amount": float(row["amount"]),
        "type": row["type"].strip().lower()  # normalize for consistency
      }
      transactions.append(transaction)

  return transactions

def export_calendar_data_to_csv(file_path, calendar_data):
  # Define the CSV column headers
  fieldnames = [
    "calendar_month",
    "date",
    "date_is_not_trailing_or_leading",
    "date_positive",
    "date_negative",
    "date_change",
    "date_total_running"
  ]

  # Write to CSV (overwrite mode)
  with open(file_path, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for entry in calendar_data:
      row = {
        "calendar_month": entry["calendar_month"],
        "date": entry["date"],
        "date_is_not_trailing_or_leading": entry["date_is_not_trailing_or_leading"],
        "date_positive": entry["date_positive"],
        "date_negative": entry["date_negative"],
        "date_change": entry["date_change"],
        "date_total_running": entry["date_total_running"]
      }
      writer.writerow(row)

def load_calendar_dates(path_calendar_dates):
  calendar_dates = []

  with open(path_calendar_dates, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
      calendar_dates.append({
        "calendar_month": row["calendar_month"],  # ISO string is okay
        "date": row["date"],                      # ISO string is okay
        "date_is_not_trailing_or_leading": row["date_is_not_trailing_or_leading"].strip().lower() == "true"
      })

  return calendar_dates

# * RUNNING
path_output = '../output/calendar-dates-w-transactions.csv'
path_transactions = '../output/transactions-all.csv'
path_calendar_dates = '../../../calendar-dates.csv'

calendar_dates = load_calendar_dates(path_calendar_dates)
transactions = load_transactions_from_csv(path_transactions)
calendar_dates_data = generate_calendar_month_w_dates_w_data(calendar_dates,transactions)

pprint(calendar_dates_data)

export_calendar_data_to_csv(path_output, calendar_dates_data)