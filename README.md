**Follow these steps to **run and test Vigilant AI locally on your machine.**


### **1. Clone the Repository**
git clone https://github.com/your-username/vigilant-ai.git

cd vigilant-ai


### **2. Install Dependencies**
npm install


### **3. Set Environment Variables**

Create a `.env` file in the root directory with the following:
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
REDIS_URL=your_redis_url_here

**Note:**

* Replace `your_openai_api_key_here` with your actual OpenAI API key.
* Replace `your_redis_url_here` with your Redis connection URL (e.g. Upstash or local Redis).


### **4. Start Redis**

If using local Redis, ensure it is running:
docker run -p 6379:6379 redis

Or use **Upstash Redis** with your provided URL.


### **5. Run the Application**
nodemon server.js

You should see logs like:
Connected to Upstash Redis
Vigilant AI Gateway running on port 3000


### **6. Testing the Application (Using Postman or curl)**

**Send POST requests to the gateway endpoint:**

* **URL:** `http://localhost:3000/gateway`
* **Method:** POST
* **Headers:** `Content-Type: application/json`
* **Body:** JSON payload


#### **Example Safe Payload**
{
  "name": "Ninad",
  "action": "view profile"
}


**Expected Result:** Request is forwarded to backend and returns success.


#### **Example Suspicious Payload (SQL Injection)**
{
  "username": "admin'; DROP TABLE users; --",
  "password": "password123"
}

**Expected Result:** Request is blocked with classification and reason.


### **7. Note**

This is a **local demo project** to showcase **LLM-powered API security analysis**.
No production deployment setup is included.


### **8. Future Scope**

* Asynchronous analysis pipeline
* Frontend dashboard
* Authentication and rate limiting
* Multiple model support
