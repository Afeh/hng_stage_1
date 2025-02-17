import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/classify-number", async (req, res) => {
	try {
		const number = req.query.number;

		if (isNaN(number) || !Number.isInteger(parseFloat(number))) {
			return res.status(400).json({
				number: number,
				error: true,
			});
		}

		const num = parseInt(number);

		const properties = [];

		const isPrimeNum = isPrime(num);
		const isPerfectNum = isPerfectNumber(num);
		const digitSum = sumDigits(num);

		if (checkArmstrongNumber(num)) {
			properties.push("armstrong");
		}

		if (isEven(num)) {
			properties.push("even");
		}

		if (isOdd(num)) {
			properties.push("odd");
		}

		// Fetch fun fact from Numbers API
		const response = await axios.get(`http://numbersapi.com/${num}/math`);

		return res.status(200).json({
			number: num,
			is_prime: isPrimeNum,
			is_perfect: isPerfectNum,
			properties: properties,
			digit_sum: digitSum,
			fun_fact: response.data,
		});
	} catch (error) {
		console.error("Failed to make request:", error.message);

		return res.status(500).json({
			error: true,
			message: "Internal Server Error",
		});
	}
});


app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

function isEven(n) {
	return n % 2 === 0;
}

function isOdd(n) {
	return n % 2 !== 0;
}

function isPrime(n) {
	if (n < 2) return false;

	for (let i = 2; i <= Math.sqrt(n); i++) {
		if (n % i === 0) return false;
	}
	return true;
}

function isPerfectNumber(num) {
	if (num <= 1) {
		return false;
	}

	let sum = 1;
	for (let i = 2; i <= Math.sqrt(num); i++) {
		if (num % i === 0) {
			sum += i;
			if (i !== num / i) {
				sum += num / i;
			}
		}
	}

	return sum === num;
}

function checkArmstrongNumber(n) {
	const numStr = Math.abs(n).toString();
	const numDigits = numStr.length;

	let sum = 0;

	for (let digit of numStr) {
		sum += Math.pow(parseInt(digit), numDigits);
	}

	return sum === Math.abs(n);
}

function sumDigits(number) {
	const numStr = Math.abs(number).toString();

	let sum = 0;

	for (let digit of numStr) {
		sum += parseInt(digit);
	}

	return sum;
}