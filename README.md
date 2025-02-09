# 🌟 Cost Manager RESTful Web Services 🌟 #
Welcome to the Cost Manager RESTful Web Service! This application helps users track their daily costs, generate reports, and manage their spending efficiently. Designed for effective budgeting, it provides seamless cost tracking and reporting.

## 📊 Database
Database Name:
```
costmanager
```
Database Type:
MongoDB (hosted on MongoDB Atlas)

Implements Computed Pattern for efficient aggregation and reporting.

Collections:

1️⃣ users (Default User Exists)
| Property        | Type   | Example        |
|----------------|--------|----------------|
| id            | String | "123123"       |
| first_name    | String | "Mosh"         |
| last_name     | String | "Israeli"      |
| birthday      | Date   | "1990-01-10"   |
| marital_status | String | "Single"       |

🚀 Default User Present in Database:

```
{
  "id": "123123",
  "first_name": "Mosh",
  "last_name": "Israeli",
  "birthday": "1990-01-10",
  "marital_status": "Single"
}
```
2️⃣ costs (Initially Empty)

Costs will be added only when a user submits a new expense.
## 🛠️ Application
The application is built using Express.js and Mongoose as a backend for cost management.

## 🚀 API Endpoints

1️⃣ /api/add (POST)

📌 Purpose: Add a new cost item for a user.

🔹 Required Parameters: userid, description, category, sum

🔹 Optional Parameters: year, month, day (defaults to current date if not provided)

🔹 Response: Returns the added cost or an error if required fields are missing.

✅ Example Request (cURL):

```
curl -X POST https://cost-manager-final-project.onrender.com/api/add \
     -H "Content-Type: application/json" \
     -d '{
           "userid": "123123",
           "description": "Groceries",
           "category": "food",
           "sum": 100
         }'
```
2️⃣ /api/report (GET)

📌 Purpose: Retrieve a monthly report of costs for a specific user.

🔹 Required Query Parameters: id, year, month

🔹 Response: A JSON document containing the user's costs, grouped by category.

✅ Example Request (cURL):

```
curl -X GET "https://cost-manager-final-project.onrender.com/api/report?id=123123&year=2025&month=1"
✅ Example Response:

```
```
{
  "userid": "123123",
  "year": 2025,
  "month": 1,
  "costs": [
    {"food": [{"sum": 100, "description": "Groceries", "day": 10}]},
    {"health": []},
    {"housing": []},
    {"sport": []},
    {"education": []}
  ]
}
```
3️⃣ /api/users/:id (GET)

📌 Purpose: Retrieve user details, including total costs.

🔹 Path Parameter: id (User ID)

🔹 Response: JSON containing the user's details (first_name, last_name, id, total).

✅ Example Request (Browser or cURL):
```
curl -X GET "https://cost-manager-final-project.onrender.com/api/users/123123"
```
✅ Example Response:

```
{
  "first_name": "Mosh",
  "last_name": "Israeli",
  "id": "123123",
  "total": 100
}
```
4️⃣ /api/about (GET)

📌 Purpose: Provides information about the developers.

🔹 Response: JSON containing team member details (Only firstname and lastname as required).

✅ Example Request:

```
curl -X GET "https://cost-manager-final-project.onrender.com/api/about"
```
✅ Example Response:
```
[
    {
        "firstname": "Michelle",
        "lastname": "Cain"
    },
    {
        "firstname": "Segev",
        "lastname": "Cohen"
    }
]
```
## 🎥 Demo Video

🎬 Watch the live demo of this project:
👉 https://youtu.be/ybDQi9jCWb0

## 👫 Developers
Michelle Cain
📧 Email: michellecainn@gmail.com
🆔 ID: 318005170

Segev Cohen
📧 Email: segevcohen98@gmail.com
🆔 ID: 207296765

## 🚀 Deployment
🌍 Live API URL: https://cost-manager-final-project.onrender.com
🛠 Hosted on: Render
💾 Database: MongoDB Atlas
