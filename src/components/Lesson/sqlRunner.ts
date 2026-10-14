import type { QueryExecResult, SqlJsStatic } from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

export interface ResultSet {
  columns: string[];
  rows: unknown[][];
}

export interface SqlRun {
  result: ResultSet | null;
  changes: number;
  error: string | null;
  tables: Array<{ name: string; columns: string[] }>;
  checks: boolean[];
}

let engine: Promise<SqlJsStatic> | undefined;

export function loadSql(locate: (file: string) => string = () => wasmUrl) {
  engine ||= import('sql.js').then((module) => {
    const init = (module as unknown as { default: typeof module }).default || module;
    return (init as unknown as (config: object) => Promise<SqlJsStatic>)({ locateFile: locate });
  });
  return engine;
}

const toSet = (set: QueryExecResult): ResultSet => ({ columns: set.columns, rows: set.values });

export function explainSqlError(message: string): string {
  const table = message.match(/no such table: (\S+)/);
  if (table)
    return `Não existe tabela chamada "${table[1]}". Confira o nome em "Tabelas disponíveis".`;
  const column = message.match(/no such column: (\S+)/);
  if (column)
    return `Não existe coluna chamada "${column[1]}". Confira o nome e se ela pertence à tabela da consulta.`;
  const near = message.match(/near "([^"]*)": syntax error/);
  if (near)
    return `Erro de escrita perto de "${near[1]}". Confira vírgulas, aspas e a ordem das cláusulas (SELECT, FROM, WHERE, GROUP BY, ORDER BY).`;
  if (/incomplete input/.test(message))
    return 'O comando terminou antes da hora. Falta fechar um parêntese ou uma aspa?';
  if (/UNIQUE constraint failed/.test(message))
    return `Esse valor já existe numa coluna que não aceita repetidos (${message}).`;
  if (/NOT NULL constraint failed/.test(message))
    return `Uma coluna obrigatória ficou sem valor (${message}).`;
  if (/FOREIGN KEY constraint failed/.test(message))
    return 'A linha aponta para um registro que não existe em outra tabela (chave estrangeira).';
  if (/ambiguous column name: (\S+)/.test(message))
    return `A coluna existe em mais de uma tabela da consulta. Diga de qual: tabela.coluna (${message}).`;
  return message;
}

export function runSql(SQL: SqlJsStatic, setup: string, query: string, tests: string[]): SqlRun {
  const db = new SQL.Database();
  try {
    db.exec('PRAGMA foreign_keys = ON;');
    db.exec(setup);
    const tables = (
      db.exec(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
      )[0]?.values || []
    ).map(([name]) => ({
      name: String(name),
      columns: (
        db.exec(`PRAGMA table_info("${String(name).replace(/"/g, '""')}")`)[0]?.values || []
      ).map((column) => String(column[1])),
    }));
    let result: ResultSet | null = null;
    let error: string | null = null;
    let changes = 0;
    try {
      const sets = query.trim() ? db.exec(query) : [];
      result = sets.length ? toSet(sets[sets.length - 1]) : null;
      changes = db.getRowsModified();
    } catch (failure) {
      error = explainSqlError(failure instanceof Error ? failure.message : String(failure));
    }
    const run = (sql: string) => {
      const sets = db.exec(sql);
      return sets.length ? toSet(sets[sets.length - 1]) : null;
    };
    const checks = tests.map((test) => {
      if (error) return false;
      try {
        // Checks are written by lesson authors, never by learners.
        // eslint-disable-next-line no-new-func
        return !!new Function('result', 'run', 'query', test)(result, run, query);
      } catch {
        return false;
      }
    });
    return { result, changes, error, tables, checks };
  } finally {
    db.close();
  }
}
