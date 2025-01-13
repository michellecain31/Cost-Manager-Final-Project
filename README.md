# 🌟 Cost Manager RESTful Web Services 🌟
Welcome to the Cost Manager RESTful Web Service! This app allows users to track their daily costs, generate reports, and manage their spending effectively. Designed to help you budget better, it provides seamless cost tracking and reporting.

# 📊 Database
Database Name: costmanager
Database Type: MongoDB (hosted on MongoDB Atlas)
Implementation: Follows the Computed Pattern for efficient aggregation and reporting.
Collections:
users:

Properties: id, first_name, last_name, birthday, marital_status
Default User: Automatically created for testing.
id: 123123
first_name: John
last_name: Doe
birthday: 1990-01-01
marital_status: Single
costs:

Properties: user_id, year, month, day, description, sum, category
Categories: food, health, housing, sport, education, transportation, other

# 🛠️ Application
The application is built using Express.js and Mongoose and serves as a backend for cost management. Below are the main routes:

1. /api/addcost (POST)
Purpose: Add a new cost item for a user.
Required Parameters: user_id, description, category, sum
Optional Parameters: year, month, day (defaults to the current date if not provided)
Response: Returns the added cost or an error if required fields are missing.
Example Request:

```
curl -X POST http://localhost:3000/api/addcost \
-H "Content-Type: application/json" \
-d '{
  "user_id": "123123",
  "description": "Groceries",
  "category": "food",
  "sum": 100
}'
```
2. /api/report (GET)
Purpose: Retrieve a monthly report of costs for a specific user.
Required Query Parameters: user_id, year, month
Response: A JSON document containing the user's costs, grouped by category.
Example Request:

```
http://localhost:3000/api/report?user_id=123123&year=2025&month=1
```
3. /api/users/:id (GET)
Purpose: Retrieve user details, including the total costs.
Path Parameter: id (user ID)
Response: JSON containing the user's details (first_name, last_name, id, and total).
Example Request:

```
http://localhost:3000/api/users/123123
```
4. /api/about (GET)
Purpose: Provides information about the developers.
Response: JSON containing team member details.
Example Response:

```
[
    {
        "firstname": "Michelle",
        "lastname": "Cain",
        "id": 318005170,
        "email": "michellecainn@gmail.com"
    },
    {
        "firstname": "Segev",
        "lastname": "Cohen",
        "id": 207296765,
        "email": "segevcohen98@gmail.com"
    }
]
```

# 🎥 Demo
A short video showcasing the functionality of the application is available here (replace # with your unlisted YouTube link).

# 👫 Developers
Michelle Cain

📧 Email: michellecainn@gmail.com
🆔 ID: 318005170
Segev Cohen

📧 Email: segevcohen98@gmail.com
🆔 ID: 207296765
