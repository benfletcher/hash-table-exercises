# Hash Tables

1. Initialize hash map
  - Sets initial capacity
  - Tracks these properties:
    - length (count)
    - slots (array) *
    - capacity (count) *
    - deleted (count) *
  - * these properties are 'private' (start with underscore)

2. Additional initialization
  - Set max load ratio to 0.9
  - set size ratio to 3

3. `get()` function
  - Takes `key`
  - Returns `value`
  - Calls find() and passes the `key`
  - Find returns index to get the `value`

4. `set()` function
  - Takes `key`, `value`
  - No return value
  - Check capacity to see if we need to resize
  - Calls find() and passes the `key`
  - Find returns index, which is used to put `value` in the slots array
    - We set the new key and value (and deleted: false) to the slot at that index
  - Increment the length

5. `remove()` function
  - Takes `key`
  - No return value
    - (maybe return false / throw an error if key not found)?
  - Calls find()
  - Changes the deleted flag to true
  - Decrements the length
  - Increments the deleted

6. `find()` function
  - this a private method
  - Takes `key`
  - Returns `index`
  - Hashes the `key`
  - Modulo hash against the capacity
  - For each index check if it's undefined or if it equals our `key`, and is not deleted, return index

7. `resize()`
  - private
  - Takes `size` (new size)
  - No return value
  - Copies the old slots, if they're not undefined or deleted, into a new, larger HashMap
    - Resets length, deleted, and the slots array 
