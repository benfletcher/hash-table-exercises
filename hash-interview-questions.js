// Write an algorithm to check whether any permutation of a string is a palindrome (a string which reads the same forwards and backwards). For example, "madam", "amadm" and "cllci" should all return true, whereas "caabl" and "aaxxis" should return false.

//count letter occurences
//look for more than 1 odd-numbered occurence

let palindromeTest = (word) => {
  let letters = word.split('');
  let histogram = {};
  letters.forEach(letter => {
    if (letter in histogram) {
      histogram[letter]++;
    }
    else {
      histogram[letter] = 1;
    }
  });
  // console.log(histogram);
  let odds = 0;
  for (letter in histogram) {
    if (histogram[letter] % 2 !== 0) {
      odds++;
    }
    if (odds > 1) {
      console.log('It is NOT a palindrome!')
      return false;
    }
  }
  console.log('It IS a palindrome!')
  return true;
}


// palindromeTest('madaminedenimadam');

// Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].

let anagrams = (words) => {
  let histogram = {};   // could also use ES6 `new Map()`
  words.map(word =>
    word.split("")
    .sort()
    .join("")
  )
  .forEach((word, i) => {
    if (word in histogram) {
      histogram[word].push(words[i]);
    } else {
      histogram[word] = [words[i]];
    }
  });

  let output = [];
  for (let key in histogram) {
    output.push(histogram[key]);
  }

  console.log(output);
  return output;
};

let testWords = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

anagrams(testWords);
// Write a hash map implementation which uses separate chaining.
