from datetime import date, timedelta, datetime
from pprint import pprint
import csv

def generate_calendar_months(min_date, max_date):
  # Start from the first of the month *after* min_date if min_date is not the 1st
  if min_date.day > 1:
    if min_date.month == 12:
      current = date(min_date.year + 1, 1, 1)
    else:
      current = date(min_date.year, min_date.month + 1, 1)
  else:
    current = date(min_date.year, min_date.month, 1)

  calendar_months = []

  while current <= max_date:
    calendar_months.append(current)
    if current.month == 12:
      current = date(current.year + 1, 1, 1)
    else:
      current = date(current.year, current.month + 1, 1)

  return calendar_months
  
def get_calendar_dates(selected_date: date):
  year, month = selected_date.year, selected_date.month

  # First and last day of current month
  first_day_of_month = date(year, month, 1)
  if month == 12:
    last_day_of_month = date(year + 1, 1, 1) - timedelta(days=1)
  else:
    last_day_of_month = date(year, month + 1, 1) - timedelta(days=1)

  # Trailing dates (previous month)
  days_before = first_day_of_month.weekday() + 1 if first_day_of_month.weekday() != 6 else 0
  trailing_dates = [
    first_day_of_month - timedelta(days=i)
    for i in range(days_before, 0, -1)
  ]

  # Current month dates
  current_month_dates = [
    first_day_of_month + timedelta(days=i)
    for i in range((last_day_of_month - first_day_of_month).days + 1)
  ]

  # Leading dates (next month)
  total_days = len(trailing_dates) + len(current_month_dates)
  days_after = 42 - total_days
  leading_dates = [
    last_day_of_month + timedelta(days=i)
    for i in range(1, days_after + 1)
  ]

  # Combine all
  calendar_dates = trailing_dates + current_month_dates + leading_dates
  return calendar_dates


def get_calendar_dates_per_calendar_month(calendar_months):
  def to_iso_string(d: date) -> str:
    return datetime.combine(d, datetime.min.time()).isoformat(timespec='milliseconds') + "Z"

  result = []

  for month_start in calendar_months:
    calendar_dates = get_calendar_dates(month_start)
    calendar_month_iso = to_iso_string(month_start)
    for d in calendar_dates:
      result.append({
        "date": to_iso_string(d),
        "calendar_month": calendar_month_iso
      })

  return result

def generate_calendar_month_w_dates_w_data(calendar_dates, transactions):
  def parse_iso_date(iso_str):
    return datetime.fromisoformat(iso_str.replace("Z", "+00:00")).date()

  result = []

  for date_obj in calendar_dates:
    date_str = date_obj["date"]
    calendar_month = date_obj["calendar_month"]
    date = parse_iso_date(date_str)

    # Transactions that match this exact date
    date_transactions = [
      txn for txn in transactions
      if parse_iso_date(txn["date"]) == date
    ]

    date_positive = sum(
      txn["amount"] for txn in date_transactions
      if txn["type"].lower() == "income"
    )

    date_negative = sum(
      txn["amount"] for txn in date_transactions
      if txn["type"].lower() == "expense"
    )

    date_change = date_positive - date_negative

    # Running total up to *before* this date
    running_transactions = [
      txn for txn in transactions
      if parse_iso_date(txn["date"]) < date
    ]

    date_total_running = sum(
      txn["amount"] if txn["type"].lower() == "income" else -txn["amount"]
      for txn in running_transactions
    ) + date_change

    result.append({
      "calendar_month": calendar_month,
      "date": date_str,
      "date_positive": date_positive,
      "date_negative": date_negative,
      "date_change": date_change,
      "date_total_running": date_total_running
    })

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

import csv

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
        "date_is_not_trailing_or_leading": (entry["date"][:7] == entry["calendar_month"][:7]),
        "date_positive": entry["date_positive"],
        "date_negative": entry["date_negative"],
        "date_change": entry["date_change"],
        "date_total_running": entry["date_total_running"]
      }
      writer.writerow(row)


# * RUNNING
min_date = date(2025, 1, 1)
max_date = date(2025, 12, 1)
file_path = '../output/calendar-dates-data.csv'

calendar_months = generate_calendar_months(min_date, max_date)
calendar_dates = get_calendar_dates_per_calendar_month(calendar_months)
transactions = load_transactions_from_csv("../output/transactions-all.csv")
calendar_dates_data = generate_calendar_month_w_dates_w_data(calendar_dates,transactions)

pprint(calendar_dates_data)

export_calendar_data_to_csv(file_path, calendar_dates_data)