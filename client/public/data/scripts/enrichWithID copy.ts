// ==============================
// 🧱 enrichWithIDs.ts
// Stage 1: Reads input CSVs without IDs,
// adds generated IDs, and outputs enriched CSVs.
// ==============================

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { Id } from './utils/id';
import {
  AccountWithoutID,
  CategoryWithoutID,
  RecurringTransactionWithoutID,
  OneTimeTransactionWithoutID,
  Account,
  Category,
  RecurringTransaction,
  OneTimeTransaction,
} from './utils/types';
 
// === CONFIG ===
const inputDir = path.resolve(__dirname, '../input');
const outputDir = path.resolve(__dirname, '../output');

const files = {
  accounts: {
    input: path.join(inputDir, 'accountsWithoutID.csv'),
    output: path.join(outputDir, 'accounts.csv'),
    prefix: 'acct',
  },
  categories: {
    input: path.join(inputDir, 'categoriesWithoutID.csv'),
    output: path.join(outputDir, 'categories.csv'),
    prefix: 'cat',
  },
  recurring: {
    input: path.join(inputDir, 'transactionsRecurringWithoutID.csv'),
    output: path.join(outputDir, 'transactionsRecurring.csv'),
    prefix: 'rtxn',
  },
  oneTime: {
    input: path.join(inputDir, 'transactionsOneTimeWithoutID.csv'),
    output: path.join(outputDir, 'transactionsOneTime.csv'),
    prefix: 'txn',
  },
};

// === HELPERS ===

function readCSV<T>(filePath: string): T[] {
  if (!fs.existsSync(filePath)) {
    console.warn(`[⚠️] File not found: ${filePath}`);
    return [];
  }

  const csvData = fs.readFileSync(filePath, 'utf-8');
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}

function writeCSV(filePath: string, data: object[]): void {
  const csv = stringify(data, { header: true });
  fs.writeFileSync(filePath, csv, 'utf-8');
  console.log(`[✅] Wrote ${data.length} rows → ${path.basename(filePath)}`);
}

// === MAIN PROCESSORS ===

function enrichAccounts(input: AccountWithoutID[]): Account[] {
  return input.map((a) => ({
    id: Id.account(),
    ...a,
  }));
}

function enrichCategories(input: CategoryWithoutID[]): Category[] {
  return input.map((c) => ({
    id: Id.category(),
    ...c,
  }));
}

function enrichRecurringTxns(
  input: RecurringTransactionWithoutID[]
): RecurringTransaction[] {
  return input.map((t) => ({
    id: Id.recurringTransaction(),
    ...t,
  }));
}

function enrichOneTimeTxns(
  input: OneTimeTransactionWithoutID[]
): OneTimeTransaction[] {
  return input.map((t) => ({
    id: Id.oneTimeTransaction(),
    ...t,
  }));
}

// === RUN PIPELINE ===

function ensureDirExists(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function runEnrichPipeline() {
  ensureDirExists(outputDir);

  const accounts = enrichAccounts(readCSV<AccountWithoutID>(files.accounts.input));
  const categories = enrichCategories(readCSV<CategoryWithoutID>(files.categories.input));
  const recurring = enrichRecurringTxns(readCSV<RecurringTransactionWithoutID>(files.recurring.input));
  const oneTime = enrichOneTimeTxns(readCSV<OneTimeTransactionWithoutID>(files.oneTime.input));

  writeCSV(files.accounts.output, accounts);
  writeCSV(files.categories.output, categories);
  writeCSV(files.recurring.output, recurring);
  writeCSV(files.oneTime.output, oneTime);

  console.log('\n✨ [Done] Stage 1 completed: IDs added to all datasets.');
}

// Run directly (CLI mode)
if (require.main === module) {
  runEnrichPipeline();
}
