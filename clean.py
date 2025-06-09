import json
import re

def clean_fortunes(input_file, output_file='fortunes.json'):
    fortunes = set()  # Use a set to automatically deduplicate

    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue  # Skip blank lines

            # Remove leading number and dot using regex
            cleaned = re.sub(r'^\d+\.\s*', '', line)
            if cleaned:
                fortunes.add(cleaned)

    # Convert set to sorted list (optional: sort alphabetically)
    sorted_fortunes = sorted(fortunes)

    # Save to JSON file
    with open(output_file, 'w', encoding='utf-8') as out_f:
        json.dump(sorted_fortunes, out_f, indent=2, ensure_ascii=False)

    print(f"Saved {len(sorted_fortunes)} unique fortunes to {output_file}")

# Example usage
if __name__ == '__main__':
    clean_fortunes('fortunes.txt')
