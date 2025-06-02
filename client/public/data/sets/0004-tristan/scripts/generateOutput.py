import subprocess

# Run first script
subprocess.run(["python", "generateCalendarDates.py"], check=True)

# Run second script
subprocess.run(["python", "generateTransactionsData.py"], check=True)

print("Both scripts executed successfully.")