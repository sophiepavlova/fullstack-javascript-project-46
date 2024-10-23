# Project: Difference Calculator

### Hexlet Tests and Linter Status  
[![Actions Status](https://github.com/sophiepavlova/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/sophiepavlova/fullstack-javascript-project-46/actions)  
[![Test Coverage](https://api.codeclimate.com/v1/badges/a1afa0c48900056d6cff/test_coverage)](https://codeclimate.com/github/sophiepavlova/fullstack-javascript-project-46/test_coverage)

---

## 📋 Description

The **Difference Calculator** is a CLI utility that compares and prints the difference between two data structures. It supports multiple input formats and provides output in various formats for flexibility.

### **Features**:
- **Supported Input Formats**: YAML, JSON  
- **Output Formats**:  
  - Stylish (default)  
  - Plain text  
  - JSON  

---

## 🛠️ Minimum Requirements

- **Node.js**: version 18.18.0 or higher  
- **npm**: version 9.8.0 or higher  

---

## 🚀 Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sophiepavlova/fullstack-javascript-project-46.git
   cd fullstack-javascript-project-46
   ```

2. **Install the dependencies globally**:  
   Make sure you have Node.js and npm installed. Then run:  
   ```bash
   npm install -g
   ```

3. **Verify the installation**:  
   Use the following command to confirm that the tool is installed:  
   ```bash
   gendiff -V
   ```

---

## 📖 Usage

After installation, you can compare two files (YAML or JSON) directly from the terminal.

### **Basic Command**:
```bash
gendiff --format stylish file1.yml file2.yml
```

### **Display Help**:
```bash
gendiff -h
```

### **Command Overview**:
```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  specify the output format (default: stylish)
  -h, --help           output usage information
```

### **Available Output Formats**:
- **Stylish**: Well-formatted hierarchical view (default)  
- **Plain**: Simple text format with key changes  
- **JSON**: Output differences in JSON format  

---

## 🎥 Demos of the Project

Check out these demos of the tool in action on Asciinema:

1. [Basic Comparison, json input](https://asciinema.org/a/xsw9RNZwe5K1WXABJbbRrtJoi)  
2. [Basic Comparison, yml input](https://asciinema.org/a/XjGhcGgCJwRONdnxz1nBUjXlb)  
3. [Using the Stylish Format](https://asciinema.org/a/rcwrzgjeiIgCCBMzQwJVY9Dnr)  
4. [Using the Plain Format](https://asciinema.org/a/e1lxg9zPijC2WZ6gOCE8eXXF9)  
5. [Using All Three Formats](https://asciinema.org/a/p4tCLRmWYUZzaBbmNa0fbskuS)

---

## 💡 Example Usage

Given two files:

**file1.yml**:
```yaml
common:
  setting1: Value 1
  setting3: true
```

**file2.yml**:
```yaml
common:
  follow: false
  setting1: Value 1
  setting3: null
```

### **Run**:
```bash
gendiff --format plain file1.yml file2.yml
```

### **Output**:
```
Property 'common.follow' was added with value: false
Property 'common.setting3' was updated. From true to null
```