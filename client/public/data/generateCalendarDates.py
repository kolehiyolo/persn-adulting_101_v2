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
        "calendar_month": calendar_month_iso,
        "date_is_not_trailing_or_leading": (to_iso_string(d)[:7] == calendar_month_iso[:7])
      })

  return result

def export_calendar_data_to_csv(file_path, calendar_data):
  # Define the CSV column headers
  fieldnames = [
    "calendar_month",
    "date",
    "date_is_not_trailing_or_leading"
  ]

  # Write to CSV (overwrite mode)
  with open(file_path, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for entry in calendar_data:
      row = {
        "calendar_month": entry["calendar_month"],
        "date": entry["date"],
        "date_is_not_trailing_or_leading": (entry["date"][:7] == entry["calendar_month"][:7])
      }
      writer.writerow(row)

# * RUNNING
min_date = date(2000, 1, 1)
max_date = date(2100, 12, 31)
file_path = 'calendar-dates.csv'

calendar_months = generate_calendar_months(min_date, max_date)
calendar_dates = get_calendar_dates_per_calendar_month(calendar_months)

pprint(calendar_dates)

export_calendar_data_to_csv(file_path, calendar_dates)