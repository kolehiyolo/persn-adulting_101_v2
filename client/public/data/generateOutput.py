import os
import subprocess

SETS_DIR = os.path.join(os.path.dirname(__file__), "sets")

for set_name in os.listdir(SETS_DIR):
  set_path = os.path.join(SETS_DIR, set_name)

  if os.path.isdir(set_path):
    scripts_path = os.path.join(set_path, "scripts")

    # print(f"\n🔄 Running scripts for set: {set_name}")

    # These are filenames, not full paths anymore
    calendar_script = "generateCalendarDates.py"
    transactions_script = "generateTransactionsData.py"

    # Run calendar script in its own directory
    subprocess.run(["python", calendar_script], cwd=scripts_path, check=True)

    # Run transactions script in its own directory
    subprocess.run(["python", transactions_script], cwd=scripts_path, check=True)