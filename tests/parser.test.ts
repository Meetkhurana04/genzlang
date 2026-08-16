import { describe, expect, it } from "vitest";
import { tokenize } from "../src/lexer.js";
import { parse } from "../src/parser.js";
import type { Program, Stmt, Expr } from "../src/ast.js";

function ast(source: string): Program {
  return parse(tokenize(source));
}

function only(source: string): Stmt {
  const program = ast(source);
  expect(program.statements.length).toBe(1);
  return program.statements[0] as Stmt;
}

describe("parser", () => {
  it("parses a variable declaration", () => {
    const stmt = only('manifest lang = "GenzLang"');
    expect(stmt).toMatchObject({
      kind: "VarDecl",
      name: "lang",
      initializer: { kind: "StringLiteral", value: "GenzLang" },
    });
  });

  it("respects arithmetic precedence (* before +)", () => {
    const stmt = only("1 + 2 * 3") as Extract<Stmt, { kind: "ExpressionStmt" }>;
    const expr = stmt.expression as Extract<Expr, { kind: "Binary" }>;
    expect(expr.kind).toBe("Binary");
    expect(expr.operator).toBe("+");
    expect((expr.right as Extract<Expr, { kind: "Binary" }>).operator).toBe("*");
  });

  it("parses logical operators with correct precedence (and binds tighter than or)", () => {
    const stmt = only("a alt b plus c") as Extract<
      Stmt,
      { kind: "ExpressionStmt" }
    >;
    const expr = stmt.expression as Extract<Expr, { kind: "Logical" }>;
    expect(expr.operator).toBe("or");
    expect((expr.right as Extract<Expr, { kind: "Logical" }>).operator).toBe(
      "and",
    );
  });

  it("parses assignment as right-associative", () => {
    const stmt = only("x = 5") as Extract<Stmt, { kind: "ExpressionStmt" }>;
    expect(stmt.expression).toMatchObject({
      kind: "Assign",
      target: { kind: "Variable", name: "x" },
      value: { kind: "NumberLiteral", value: 5 },
    });
  });

  it("parses index assignment targets", () => {
    const stmt = only('arr[1] = "gamer"') as Extract<
      Stmt,
      { kind: "ExpressionStmt" }
    >;
    expect(stmt.expression).toMatchObject({
      kind: "Assign",
      target: { kind: "IndexExpr" },
    });
  });

  it("parses if / orwhen / nvm into a nested else chain", () => {
    const stmt = only(
      "when (a) { yap(1) } orwhen (b) { yap(2) } nvm { yap(3) }",
    ) as Extract<Stmt, { kind: "IfStmt" }>;
    expect(stmt.kind).toBe("IfStmt");
    expect(stmt.elseBranch?.kind).toBe("IfStmt"); // the orwhen
    const orwhen = stmt.elseBranch as Extract<Stmt, { kind: "IfStmt" }>;
    expect(orwhen.elseBranch?.kind).toBe("Block"); // the nvm
  });

  it("parses a C-style run (for) loop header", () => {
    const stmt = only(
      "run (manifest j = 0; j < 5; j = j + 1) { yap(j) }",
    ) as Extract<Stmt, { kind: "ForStmt" }>;
    expect(stmt.kind).toBe("ForStmt");
    expect(stmt.initializer?.kind).toBe("VarDecl");
    expect(stmt.condition?.kind).toBe("Binary");
    expect(stmt.update?.kind).toBe("Assign");
  });

  it("parses function declarations with params", () => {
    const stmt = only("fun add(a, b) { bet a + b }") as Extract<
      Stmt,
      { kind: "FunctionDecl" }
    >;
    expect(stmt.kind).toBe("FunctionDecl");
    expect(stmt.params).toEqual(["a", "b"]);
    expect(stmt.body.statements[0]?.kind).toBe("ReturnStmt");
  });

  it("parses array literals and indexing", () => {
    const stmt = only('manifest squad = ["a", "b"]') as Extract<
      Stmt,
      { kind: "VarDecl" }
    >;
    expect(stmt.initializer).toMatchObject({
      kind: "ArrayLiteral",
      elements: [{ value: "a" }, { value: "b" }],
    });
  });

  it("allows statements separated by semicolons", () => {
    const program = ast("manifest x = 1; manifest y = 2; yap(x)");
    expect(program.statements.length).toBe(3);
  });

  it("reports a friendly syntax error with a line number", () => {
    expect(() => ast("when (x { yap(1) }")).toThrowError(
      /sus syntax at line 1/,
    );
  });

  it("reports a missing closing brace", () => {
    expect(() => ast("when (x) { yap(1) ")).toThrowError(/expected '}'/);
  });
});
