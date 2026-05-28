ProPredict NCR — Delhi NCR Property Price Predictor
A full-stack web app that predicts property prices across Delhi, Gurgaon, Noida and the entire NCR region using an AI-powered pricing model.
MERN Stack
Demo
Frontend: https://your-app.vercel.app
Backend API: https://your-api.onrender.com/api/health
Property Structure
property-predictor/
├── backend/
│   ├── server.js              # Express entry point
│   ├── .env.example           # Environment variables template
│   ├── routes/
│   │   ├── predict.js         # POST /api/predict
│   │   └── history.js         # GET & DELETE /api/history
│   ├── models/
│   │   └── Prediction.js      # Mongoose schema
│   └── ml/
│       └── predictor.js       # Delhi NCR pricing engine
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js             # Router + Navbar + Footer
        ├── App.css            # Global styles 
        ├── pages/
        │   └── Home.jsx       # Main page layout
        ├── components/
        │   ├── PredictForm.jsx  # Input form with autocomplete
        │   ├── ResultCard.jsx   # Predicted price display
        │   └── History.jsx      # Past predictions table
        └── utils/
            ├── api.js           # Axios instance
            └── helpers.js       # formatINR, location list
