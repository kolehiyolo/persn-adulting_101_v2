import os
import subprocess

USERS_DIR = os.path.join(os.path.dirname(__file__), "users")

for user_name in os.listdir(USERS_DIR):
  user_path = os.path.join(USERS_DIR, user_name)

  if os.path.isdir(user_path):
    scripts_path = os.path.join(user_path, "scripts")

    # print(f"\n🔄 Running scripts for user: {user_name}")

    # These are filenames, not full paths anymore
    calendar_script = "generateCalendarDates.py"
    transactions_script = "generateTransactionsData.py"

    # Run calendar script in its own directory
    subprocess.run(["python", calendar_script], cwd=scripts_path, check=True)

    # Run transactions script in its own directory
    subprocess.run(["python", transactions_script], cwd=scripts_path, check=True)