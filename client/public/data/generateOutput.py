import subprocess

# Run first script
subprocess.run(["python", "scripts/generateCalendarDates.py"], check=True)

# Run second script
subprocess.run(["python", "scripts/generateTransactionsData.py"], check=True)

print("Both scripts executed successfully.")