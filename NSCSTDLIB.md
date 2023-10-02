# NSCStdLib 0.1 Documentation

**NSCStdLib** is the standard library for NebulaScript (`.nsc`). It provides a collection of essential functions and utilities available globally within NebulaScript applications. This documentation outlines the available functions and their usage in the NSCStdLib version 0.1.

## 1. **Math Functions**

### 1.1 **`nscstdlib.math.add(a, b)`**

Adds two numbers and returns the result.

```c
@result = nscstdlib.math.add(3, 5); // Result: 8
```

### 1.2 **`nscstdlib.math.subtract(a, b)`**

Subtracts the second number from the first number and returns the result.

```c
@result = nscstdlib.math.subtract(10, 3); // Result: 7
```

### 1.3 **`nscstdlib.math.multiply(a, b)`**

Multiplies two numbers and returns the result.

```c
@result = nscstdlib.math.multiply(4, 6); // Result: 24
```

### 1.4 **`nscstdlib.math.divide(a, b)`**

Divides the first number by the second number and returns the result.

```c
@result = nscstdlib.math.divide(20, 5); // Result: 4
```

## 2. **String Functions**

### 2.1 **`nscstdlib.string.length(str)`**

Returns the length of the input string.

```c
@length = nscstdlib.string.length("Hello, World!"); // Result: 13
```

### 2.2 **`nscstdlib.string.concat(str1, str2)`**

Concatenates two strings and returns the resulting string.

```c
@result = nscstdlib.string.concat("Hello, ", "World!"); // Result: "Hello, World!"
```

## 3. **Array Functions**

### 3.1 **`nscstdlib.array.push(arr, element)`**

Adds an element to the end of an array and returns the modified array.

```c
@arr = [1, 2, 3];
@arr = nscstdlib.array.push(@arr, 4); // Result: [1, 2, 3, 4]
```

### 3.2 **`nscstdlib.array.pop(arr)`**

Removes the last element from an array and returns the modified array.

```c
@arr = [1, 2, 3, 4];
@arr = nscstdlib.array.pop(@arr); // Result: [1, 2, 3]
```

## 4. **Utility Functions**

### 4.1 **`nscstdlib.util.print(message)`**

Prints a message to the console.

```c
nscstdlib.util.print("Hello, World!"); // Output: Hello, World!
```

### 4.2 **`nscstdlib.util.sleep(milliseconds)`**

Pauses the script execution for the specified number of milliseconds.

```c
nscstdlib.util.sleep(2000); // Sleeps for 2 seconds
```

---

The `nscstdlib` provides these fundamental functions globally to assist developers in common programming tasks within NebulaScript applications. Developers can use these functions without the need for any import statements. Refer to the official NebulaScript documentation for additional details on each function and explore more advanced features offered by the standard library.
