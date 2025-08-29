const express = require('express');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3000;
 
app.use(express.json());  
app.use(cors());


app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid request format. 'data' field with array is required."
      });
    }

    
    const numbers = [];
    const alphabets = [];
    const specialChars = [];
    
    
    data.forEach(item => {
      const str = String(item);
      
      if (!isNaN(str) && str.trim() !== '') {
        numbers.push(Number(str));
      } 
     
      else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
      }
      
      else {
        specialChars.push(str);
      }
    });
    
    
    const evenNumbers = numbers.filter(num => num % 2 === 0).map(num => num.toString());
    const oddNumbers = numbers.filter(num => num % 2 !== 0).map(num => num.toString());
    
   
    const sum = numbers.reduce((acc, num) => acc + num, 0).toString();
    
    
    let concatString = '';
    const allAlphabets = data
      .filter(item => /^[a-zA-Z]+$/.test(String(item)))
      .map(item => String(item));
    
    
    const reversedAlphabets = allAlphabets.join('').split('').reverse();
    reversedAlphabets.forEach((char, index) => {
      concatString += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    });
    
    
    const response = {
      is_success: true,
      user_id: "abhemanthvarma_03032005", 
      email: "abhemanth.varma2022@vitstudent.ac.in",
      roll_number: "22BCT0044", 
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum,
      concat_string: concatString
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});


app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});