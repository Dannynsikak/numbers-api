# Number Classifier API

This is a simple API built with Hono and Deno that classifies a number based on various properties such as prime, perfect, Armstrong, and even/odd. It also fetches a fun fact about the number from [Numbers API](http://numbersapi.com/#42).

# Features

Classifies a number as:

Prime: A number greater than 1 that has no divisors other than 1 and itself.

Perfect: A number whose divisors sum up to itself.

Armstrong: A number where the sum of its digits raised to the power of their count equals the number itself.

Even/Odd: Determines whether the number is even or odd.

Computes the digit sum of the given number.

Fetches a fun fact about the number from Numbers API.

Implements CORS to allow cross-origin requests.

# Technologies Used

Deno (Runtime)

Hono (Minimalist Web Framework)

TypeScript

Fetch API (For retrieving number facts)

# Getting Started

Prerequisites

Ensure you have Deno installed on your system or you can install Deno from their website [Deno](https://deno.com/)

you can also run this command to install deno on MacOS/Linux

    curl -fsSl https://deno.land/install.sh | sh

Verify installation

    $ deno --version

Installation

Clone the repository and navigate into the project directory:

git clone https://github.com/Dannynsikak/numbers-api.git

    cd numbers-api

Running the Server

Start the server using the following command:

deno run --allow-net main.ts

API Endpoint

Classify a Number

Endpoint: GET /api/classify-number

Query Parameter: number (Required)

Example Request:

    http://127.0.0.1:5555/api/classify-number?number=371

Example Response:

    {
    "Number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["amrstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number."
    }

CORS Configuration

This API allows cross-origin requests by enabling CORS with the following configuration:

    app.use("_", cors({
    origin: "_", // Allow all origins
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET"],
    }));
