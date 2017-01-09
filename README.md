# Hash Tables

1. Initialize hash map
  - Sets initial capacity
  - Tracks these properties:
    - length (count)
    - slots (array) *
    - capacity (count) *
    - deleted (count) *
  - (*) these properties are 'private' (start with underscore)

2. Additional initialization
  - Set max load ratio to 0.9
  - set size ratio to 3

3. `get()` function
  - Takes `key`
  - Returns `value`

4. `set()` function
  - Takes `key`, `value`
  - No return value

5. `remove()` function
  - Takes `key`
  - No return value
    - (maybe return false / throw an error if key not found)?

6. `find()` function
  - this a private method
  - Takes `key`
  - Returns `index`

7. `resize()`
  - private
  - Takes `size` (new size)
  - No return value
