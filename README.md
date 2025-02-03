# hng_stage_1 - Number Classification API
An API that takes a number and returns intresting mathematical properties about it, along with a fun fact.

## Programming Stack 
NodeJs, ExpressJs

## Setup instructions
1. Clone the repo
   ```bash
   git clone https://github.com/Afeh/hng_stage_1
   ```
2. Install node dependencies
   ```bash
   npm i
   ```
3. Run the server
   ```bash
   node index.js
   ```

## API documentation

### Endpoint URL
```bash
https://hng-stage-1-7mbv.vercel.app/api/classify-number
```

#### Request Format
```
GET https://hng-stage-1-7mbv.vercel.app/api/classify-number?number=371
```

### Response Format
- Success Response (200 OK)
```
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,  // sum of its digits
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
}
```
- Faliure Response (400 Bad Request)
```
{
    "number": "alphabet",
    "error": true
}
```

