# Not Boring Movies Visualizer

This project is an interactive visualizer for the LeetCode SQL problem **609. Not Boring Movies**. It allows users to input a table of movies and step through the solution using either SQL queries or equivalent JavaScript code, making it easier to understand how the filtering and sorting operations work.

## Features
- Visualizes each step of the SQL and JavaScript solution for the Not Boring Movies problem
- Highlights rows affected by each operation
- Lets you load your own data and see how the logic applies
- Step-by-step breakdown for learning and teaching

## LeetCode Problem Statement

### 609. Not Boring Movies

Table: `Cinema`

| Column Name  | Type    |
|--------------|---------|
| id           | int     |
| movie        | varchar |
| description  | varchar |
| rating       | float   |

id is the primary key (column with unique values) for this table.
Each row contains information about the name of a movie, its description, and its rating.

A movie is **not boring** if its description is **not** "boring" (case-insensitive) and its id is an **odd number**.

Write an SQL query to report the movies with odd-numbered IDs and whose description is not "boring". Return the result table ordered by rating in **descending order**.

The query result format is in the following example:

```
Cinema table:
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 1  | War        | great 3D    | 8.9    |
| 2  | Science    | fiction     | 8.5    |
| 3  | irish      | boring      | 6.2    |
| 4  | Ice song   | Fantacy     | 8.6    |
| 5  | House card | Interesting | 9.1    |
+----+------------+-------------+--------+

Result table:
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 5  | House card | Interesting | 9.1    |
| 1  | War        | great 3D    | 8.9    |
+----+------------+-------------+--------+
```

## How to Run

1. **Clone or Download the Repository**
2. **Open `index.html` in your web browser**
   - No server or build step is required; this is a pure HTML/JS app.
3. **Usage**:
   - Enter or edit the movie table in the input area.
   - Click **Load Table** to load your data.
   - Select either **SQL Query** or **JavaScript Code** as the approach.
   - Click **Visualize Steps** to see each step of the solution.
   - Use **Next Step** to proceed through the logic and see the final result.

## Project Structure
- `index.html` — Main HTML file and UI
- `script.js` — Visualization logic and step breakdown
- `style.css` — (If present) Styling for the app

---

This tool is designed for educational purposes to help users understand how SQL queries and equivalent JavaScript logic solve the Not Boring Movies problem step by step.