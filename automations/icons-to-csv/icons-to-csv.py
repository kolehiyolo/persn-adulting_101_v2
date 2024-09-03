import os
import csv
from datetime import datetime, timedelta

def generate_csv_for_icons(folder_path, output_csv_path):
    # Get the current date and time
    now = datetime.now()
    
    # List to store data rows
    data_rows = []

    # Process each file in the folder
    for index, filename in enumerate(os.listdir(folder_path)):
        if filename.endswith(".svg"):
            staggered_time = now + timedelta(milliseconds=index)  # Add milliseconds based on index
            date_str = staggered_time.strftime("%Y%m%d")
            time_str = staggered_time.strftime("%H%M%S%f")[:-3]  # Remove the last three digits
            
            name = filename[:-4]  # Remove the '.svg' extension
            src = os.path.join(folder_path, filename)  # Construct the source path
            id = date_str + time_str

            # Create a row for the CSV
            row = {
                'ID': id,
                'DATE': date_str,
                'TIME': time_str,
                'NAME': name,
                'SRC': src,
                'TYPE': '',  # Leave blank for now
                'GROUP': ''  # Leave blank for now
            }
            data_rows.append(row)

    # Write data to CSV
    with open(output_csv_path, 'w', newline='') as csvfile:
        fieldnames = ['ID', 'DATE', 'TIME', 'NAME', 'SRC', 'TYPE', 'GROUP']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for row in data_rows:
            writer.writerow(row)

    print("CSV file has been created successfully with unique IDs.")

# Usage
folder_path = './input/icons'  # Replace with the actual path to your icons folder
output_csv_path = './output/icons.csv'  # Output CSV file name
generate_csv_for_icons(folder_path, output_csv_path)
