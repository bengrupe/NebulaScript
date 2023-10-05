enum TokenType {
  // Primitive Data Types
  INTEGER = "INTEGER",
  FLOAT = "FLOAT",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",

  // Special Data Types
  NULL = "NULL",
  UNDEFINED = "UNDEFINED",

  // Variables
  LOCAL_VARIABLE = "LOCAL_VARIABLE",
  GLOBAL_VARIABLE = "GLOBAL_VARIABLE",
  MUT_KEYWORD = "MUT_KEYWORD",

  // Functions and Modules
  FUNCTION_KEYWORD = "FUNCTION_KEYWORD",
  MODULE_KEYWORD = "MODULE_KEYWORD",

  // Control Structures and Loops
  IF = "IF",
  ELSE = "ELSE",
  FOR = "FOR",
  WHILE = "WHILE",

  // Error Handling
  THROW = "THROW",
  TRY = "TRY",
  CATCH = "CATCH",

  // Standard Library
  STANDARD_LIBRARY_FUNCTION_CALL = "STANDARD_LIBRARY_FUNCTION_CALL",

  // Symbols and Operators
  EQUAL = "EQUAL",
  PLUS = "PLUS",
  MINUS = "MINUS",
  MULTIPLY = "MULTIPLY",
  DIVIDE = "DIVIDE",
  MODULO = "MODULO",
  NOT = "NOT",
  AND = "AND",
  OR = "OR",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  EQUAL_EQUAL = "EQUAL_EQUAL",
  NOT_EQUAL = "NOT_EQUAL",

  // Symbols
  OPEN_CURLY_BRACE = "OPEN_CURLY_BRACE",
  CLOSE_CURLY_BRACE = "CLOSE_CURLY_BRACE",
  OPEN_NORMAL_PARENTHESIS = "OPEN_NORMAL_PARENTHESIS",
  CLOSE_NORMAL_PARENTHESIS = "CLOSE_NORMAL_PARENTHESIS",
  OPEN_SQUARE_BRACKET = "OPEN_SQUARE_BRACKET",
  CLOSE_SQUARE_BRACKET = "CLOSE_SQUARE_BRACKET",
  SEMICOLON = "SEMICOLON",
  COMMA = "COMMA",

  // Special Tokens
  DOT = "DOT", // Dot (.) symbol
  EOF = "EOF",

  // Identifiers
  IDENTIFIER = "IDENTIFIER", // Token type for function and module name invoke and identifiers in the source code

  // Comments
  COMMENT = "COMMENT", // Token type for comments in the source code
}

class Token {
  constructor(public type: TokenType, public value: string) {}
}

class Lexer {
  private input: string;
  private position: number = 0;

  constructor(input: string) {
    this.input = input;
  }
  private peekNextChar(): string {
    if (this.position + 1 < this.input.length) {
      return this.input[this.position + 1];
    }
    return "";
  }

  private isEOF(): boolean {
    return this.position >= this.input.length;
  }

  private getCurrentChar(): string {
    return this.input[this.position];
  }

  private advance(): void {
    this.position++;
  }

  private skipWhitespace(): void {
    while (!this.isEOF() && /\s/.test(this.getCurrentChar())) {
      this.advance();
    }
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isAlpha(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }
  private readVariableName(): string {
    let variableName = "";
    while (
      !this.isEOF() &&
      (this.isAlphaNumeric(this.getCurrentChar()) ||
        this.getCurrentChar() === "_")
    ) {
      variableName += this.getCurrentChar();
      this.advance();
    }
    return variableName;
  }

  private isAlphaNumeric(char: string): boolean {
    return /[a-zA-Z0-9_]/.test(char);
  }

  private readNumber(): Token {
    let number = "";
    while (
      !this.isEOF() &&
      (this.isDigit(this.getCurrentChar()) || this.getCurrentChar() === ".")
    ) {
      number += this.getCurrentChar();
      this.advance();
    }

    if (number.includes(".")) {
      return new Token(TokenType.FLOAT, number);
    } else {
      return new Token(TokenType.INTEGER, number);
    }
  }

  private readKeyword(): Token {
    let keyword = "";
    while (!this.isEOF() && this.isAlpha(this.getCurrentChar())) {
      keyword += this.getCurrentChar();
      this.advance();
    }

    switch (keyword) {
      case "function":
        return new Token(TokenType.FUNCTION_KEYWORD, keyword);
      case "module":
        return new Token(TokenType.MODULE_KEYWORD, keyword);
      case "mut":
        return new Token(TokenType.MUT_KEYWORD, keyword);
      case "if":
        return new Token(TokenType.IF, keyword);
      case "else":
        return new Token(TokenType.ELSE, keyword);
      case "for":
        return new Token(TokenType.FOR, keyword);
      case "while":
        return new Token(TokenType.WHILE, keyword);
      case "throw":
        return new Token(TokenType.THROW, keyword);
      case "try":
        return new Token(TokenType.TRY, keyword);
      case "catch":
        return new Token(TokenType.CATCH, keyword);
      case "null":
        return new Token(TokenType.NULL, keyword);
      case "undefined":
        return new Token(TokenType.UNDEFINED, keyword);
      case "true":
      case "false":
        return new Token(TokenType.BOOLEAN, keyword);
      default:
        // Check if the keyword is a valid variable name (not a function name)
        if (this.isAlphaNumeric(keyword.charAt(0))) {
          if (keyword.startsWith("stdlib")) {
            return new Token(TokenType.STANDARD_LIBRARY_FUNCTION_CALL, keyword);
          } else {
            return new Token(TokenType.IDENTIFIER, keyword);
          }
        } else {
          // Handle invalid keywords or characters here (throw an error, etc.)
          throw new Error(`Invalid keyword: ${keyword}`);
        }
    }
  }

  private readString(): Token {
    let str = "";
    this.advance(); // skip the opening quote
    while (!this.isEOF() && this.getCurrentChar() !== '"') {
      str += this.getCurrentChar();
      this.advance();
    }
    this.advance(); // skip the closing quote
    return new Token(TokenType.STRING, str);
  }

  private readOperator(): Token {
    const char = this.getCurrentChar();
    switch (char) {
      case "+":
        this.advance();
        return new Token(TokenType.PLUS, "+");
      case "-":
        this.advance();
        return new Token(TokenType.MINUS, "-");
      case "*":
        this.advance();
        return new Token(TokenType.MULTIPLY, "*");
      case "/":
        this.advance();
        return new Token(TokenType.DIVIDE, "/");
      case "%":
        this.advance();
        return new Token(TokenType.MODULO, "%");
      case "!":
        this.advance();
        return new Token(TokenType.NOT, "!");
      case "&":
        this.advance();
        return new Token(TokenType.AND, "&");
      case "|":
        this.advance();
        return new Token(TokenType.OR, "|");
      case "<":
        this.advance();
        if (this.getCurrentChar() === "=") {
          this.advance();
          return new Token(TokenType.LESS_THAN_OR_EQUAL, "<=");
        }
        return new Token(TokenType.LESS_THAN, "<");
      case ">":
        this.advance();
        if (this.getCurrentChar() === "=") {
          this.advance();
          return new Token(TokenType.GREATER_THAN_OR_EQUAL, ">=");
        }
        return new Token(TokenType.GREATER_THAN, ">");
      case "=":
        this.advance();
        if (this.getCurrentChar() === "=") {
          this.advance();
          return new Token(TokenType.EQUAL_EQUAL, "==");
        }
        return new Token(TokenType.EQUAL, "=");
      case "!":
        this.advance();
        if (this.getCurrentChar() === "=") {
          this.advance();
          return new Token(TokenType.NOT_EQUAL, "!=");
        }
        throw new Error(`Invalid character: ${char}`);
      default:
        throw new Error(`Invalid character: ${char}`);
    }
  }

  public getNextToken(): Token {
    this.skipWhitespace();

    if (this.isEOF()) {
      return new Token(TokenType.EOF, "EndOfFile");
    }

    const char = this.getCurrentChar();

    switch (char) {
      case "{":
        this.advance();
        return new Token(TokenType.OPEN_CURLY_BRACE, "{");
      case "}":
        this.advance();
        return new Token(TokenType.CLOSE_CURLY_BRACE, "}");
      case "(":
        this.advance();
        return new Token(TokenType.OPEN_NORMAL_PARENTHESIS, "(");
      case ")":
        this.advance();
        return new Token(TokenType.CLOSE_NORMAL_PARENTHESIS, ")");
      case "[":
        this.advance();
        return new Token(TokenType.OPEN_SQUARE_BRACKET, "[");
      case "]":
        this.advance();
        return new Token(TokenType.CLOSE_SQUARE_BRACKET, "]");
      case ";":
        this.advance();
        return new Token(TokenType.SEMICOLON, ";");
      case ",":
        this.advance();
        return new Token(TokenType.COMMA, ",");
      case '"':
        return this.readString();
      case "@":
        if (this.peekNextChar() === "@") {
          this.advance(); // Consume the first '@' symbol
          this.advance(); // Consume the second '@' symbol
          return new Token(TokenType.GLOBAL_VARIABLE, this.readVariableName());
        } else {
          this.advance(); // Consume the '@' symbol
          return new Token(TokenType.LOCAL_VARIABLE, this.readVariableName());
        }
      case ".":
        if (this.isDigit(this.peekNextChar())) {
          this.advance();
          return this.readNumber();
        } else {
          this.advance();
          return new Token(TokenType.DOT, ".");
        }

      default:
        if (char === "." && this.isDigit(this.peekNextChar())) {
          return this.readNumber();
        } else if (this.isDigit(char)) {
          return this.readNumber();
        } else if (char === ".") {
          return this.readKeyword();
        } else if (this.isAlpha(char)) {
          return this.readKeyword();
        } else {
          return this.readOperator();
        }
    }
  }
}

// Example usage:
const inputCode = `
    @@globalvartest = "this is global var"
    function calculateSum(@a, @b) {
      if (@a > @b) {
        return @a + @b;
      }
      return @a - @b;
    }
    calculateSum(1,4)
    @arr = [1,2.2]
    stdlib.array.pop(arr)
    mut @mutableVar = 42;
  `;

const lexer = new Lexer(inputCode);
let token = lexer.getNextToken();
while (token.type !== TokenType.EOF) {
  console.log(`${token.type}: ${token.value}`);
  token = lexer.getNextToken();
}
//log eof token
if (token.type === TokenType.EOF) {
  console.log(`${token.type}: ${token.value}`);
}
