# NebulaScript 0.1 Specification

**NebulaScript** (`.nsc`) is a versatile programming language designed for modular application development, combining the simplicity of Lua, the flexibility of JavaScript, and the structure of C-like languages. This specification outlines the syntax, features, and best practices of NebulaScript version 0.1, emphasizing modular programming paradigms.

## 1. **Data Types**

NebulaScript supports various data types:

### 1.1 **Primitive Data Types:**

- **Integer:** Whole numbers without decimal points. Example: `42`
- **Float:** Numbers with decimal points. Example: `3.14`
- **String:** Textual data. Example: `"Hello, World!"`
- **Boolean:** Represents true or false values. Example: `true`

### 1.2 **Composite Data Types:**

- **Array:** Ordered collection of values. Example: `[1, 2, 3, 4]`
- **Object:** Unordered collection of key-value pairs. Example: `{ "name": "John", "age": 30 }`

### 1.3 **Special Data Types:**

- **Null:** Represents the absence of any value. Example: `null`
- **Undefined:** Represents a variable that has been declared but not assigned a value. Example: `undefined`

NebulaScript employs dynamic typing, allowing variables to change types during runtime.

## 2. **Variables**

NebulaScript variables are dynamic and can store values of different types:

- To define a local variable: `@variableName = 10;`
- To define a global variable: `@@globalVariable = "Hello";`

## 3. **Functions**

Functions are defined using the `function` keyword and can accept parameters of any data type. They can also return values of any type:

```c
function calculateSum(@a, @b) {
    return @a + @b;
}
```

## 4. **Modules**

Modules encapsulate data and functions, promoting organized code structure. Modules can be defined within the same script file:

```c
// Define the first module
module mathOperations {
    function add(@a, @b) {
        return @a + @b;
    }
}

// Define the second module
module stringOperations {
    function concatenate(@str1, @str2) {
        return @str1 + @str2;
    }
}

// Now you can use functions from both modules
@result1 = mathOperations.add(5, 10); // Result: 15
@result2 = stringOperations.concatenate("Hello, ", "World!"); // Result: "Hello, World!"
```

### Best Practices for Modules:

- **Keep modules focused:** Each module should have a clear, single responsibility.
- **Use meaningful names:** Module and function names should be descriptive and easy to understand.
- **Avoid global variables:** Minimize the usage of global variables within modules.

## 5. **Control Structures and Loops**

NebulaScript supports traditional control structures and loops, applicable to all data types:

```c
if (condition) {
    // code here
} else {
    // code here
}

for (@i = 0; @i < 10; @i++) {
    // code here
}

while (condition) {
    // code here
}
```

## 6. **Error Handling**

Structured error handling facilitates issue identification and resolution in NebulaScript code:

```c
try {
    // code that might throw an error
} catch (@error) {
    // handle the error
}
```

## 7. **Standard Library**

NebulaScript comes with a simple standard library offering various built-in functions and utilities. Refer to the official NebulaScript documentation for an exhaustive list of standard library functions and their usage.

---
